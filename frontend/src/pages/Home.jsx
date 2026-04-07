import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import sanPhamApi from '../api/sanPhamApi';
import ProductCard from '../components/ProductCard';
import banner1Bg from '../assets/nengundam1.png';
import banner2Bg from '../assets/nengundam2.png';
import banner3Bg from '../assets/nenlego.png';

const ITEMS_PER_PAGE = 24;

const categories = [
  { id: null, name: 'Tất cả sản phẩm' },
  { id: 1, name: 'Gundam' },
  { id: 2, name: 'Pokemon' },
  { id: 3, name: 'Mô Hình' },
  { id: 4, name: 'Lego' },
  { id: 5, name: 'Board Game' },
  { id: 6, name: 'Tin Tức - Hướng Dẫn' },
];

const banners = [
  {
    id: 1,
    title: 'ĐỒ CHƠI MỚI NHẤT 2026',
    subtitle: 'Giảm đến 50% cho đơn hàng đầu tiên',
    image: banner1Bg,
  },
  {
    id: 2,
    title: 'BỘ SƯU TẬP MÔ HÌNH',
    subtitle: 'Chính hãng - Giá tốt nhất thị trường',
    image: banner2Bg,
  },
  {
    id: 3,
    title: 'LEGO & LẮP RÁP',
    subtitle: 'Phát triển tư duy sáng tạo cho bé',
    image: banner3Bg,
  },
];

export default function Home() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('default');
  const [currentBanner, setCurrentBanner] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loaiParam = searchParams.get('loai');
  const searchKeyword = searchParams.get('search');
  const activeCategory = loaiParam ? parseInt(loaiParam) : null;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setLoading(true);
    setCurrentPage(1);

    const fetchProducts = async () => {
      try {
        let res;
        if (searchKeyword) {
          res = await sanPhamApi.search(searchKeyword);
        } else if (loaiParam) {
          res = await sanPhamApi.getByCategory(loaiParam);
        } else {
          res = await sanPhamApi.getAll();
        }
        setProducts(res.data || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [loaiParam, searchKeyword]);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.gia - b.gia;
      case 'price-desc': return b.gia - a.gia;
      case 'name-asc': return a.tensp.localeCompare(b.tensp);
      case 'name-desc': return b.tensp.localeCompare(a.tensp);
      default: return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const activeCategoryName = categories.find((c) => c.id === activeCategory)?.name || 'Tất cả sản phẩm';

  return (
    <div className="home">
      {/* Banner Slider */}
      <section className="banner-slider">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`banner-slide ${index === currentBanner ? 'active' : ''}`}
          >
            <img src={banner.image} alt={banner.title} className="banner-bg" />
            <div className="banner-overlay" />
            <div className="container banner-content">
              <div className="banner-text">
                <h1>{banner.title}</h1>
                <p>{banner.subtitle}</p>
                <Link to="/" className="btn btn-white">Mua ngay</Link>
              </div>
            </div>
          </div>
        ))}
        <button
          className="banner-arrow banner-arrow-left"
          onClick={() => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)}
        >
          ‹
        </button>
        <button
          className="banner-arrow banner-arrow-right"
          onClick={() => setCurrentBanner((prev) => (prev + 1) % banners.length)}
        >
          ›
        </button>
        <div className="banner-dots">
          {banners.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === currentBanner ? 'active' : ''}`}
              onClick={() => setCurrentBanner(i)}
            />
          ))}
        </div>
      </section>

      {/* Main content */}
      <div className="container home-main">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h2>📂 Danh mục</h2>
            <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>✕</button>
          </div>
          <ul className="category-list">
            {categories.map((cat) => (
              <li key={cat.id ?? 'all'}>
                <Link
                  to={cat.id ? `/?loai=${cat.id}` : '/'}
                  className={`category-item ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="cat-icon">{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Product area */}
        <main className="product-area">
          {/* Toolbar */}
          <div className="product-toolbar">
            <div className="toolbar-left">
              <button className="filter-toggle" onClick={() => setSidebarOpen(true)}>
                ☰ Danh mục
              </button>
              <h2 className="section-title">{activeCategoryName}</h2>
              {searchKeyword && (
                <span className="search-result-text">
                  Kết quả tìm kiếm cho: <strong>"{searchKeyword}"</strong>
                </span>
              )}
            </div>
            <div className="toolbar-right">
              <label>Sắp xếp: </label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="default">Mặc định</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
                <option value="name-asc">Tên A-Z</option>
                <option value="name-desc">Tên Z-A</option>
              </select>
              <span className="product-count">Hiển thị: <strong>{sortedProducts.length}</strong> sản phẩm</span>
            </div>
          </div>

          {/* Products grid */}
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Đang tải sản phẩm...</p>
            </div>
          ) : paginatedProducts.length > 0 ? (
            <>
              <div className="product-grid">
                {paginatedProducts.map((p) => (
                  <ProductCard key={p.masp} product={p} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="page-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    ‹
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      if (totalPages <= 7) return true;
                      if (page === 1 || page === totalPages) return true;
                      if (Math.abs(page - currentPage) <= 1) return true;
                      return false;
                    })
                    .map((page, idx, arr) => (
                      <span key={page}>
                        {idx > 0 && page - arr[idx - 1] > 1 && <span className="page-ellipsis">...</span>}
                        <button
                          className={`page-btn ${page === currentPage ? 'active' : ''}`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      </span>
                    ))}
                  <button
                    className="page-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    ›
                  </button>
                  <span className="page-info">
                    Trang {currentPage}/{totalPages} ({sortedProducts.length} sản phẩm)
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <span className="empty-icon">🔍</span>
              <h3>Không tìm thấy sản phẩm</h3>
              <p>Vui lòng thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác.</p>
              <Link to="/" className="btn btn-primary">Về trang chủ</Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
