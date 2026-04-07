import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import sanPhamApi from '../api/sanPhamApi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedMsg, setAddedMsg] = useState('');

  useEffect(() => {
    setLoading(true);
    sanPhamApi
      .getById(id)
      .then((res) => setProduct(res.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + 'đ';

  const handleAddToCart = async () => {
    if (!token) {
      setAddedMsg('Vui lòng đăng nhập để thêm vào giỏ hàng');
      return;
    }
    try {
      await addToCart(product.masp, quantity);
      setAddedMsg('Đã thêm vào giỏ hàng thành công!');
      setTimeout(() => setAddedMsg(''), 3000);
    } catch {
      setAddedMsg('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <div className="empty-state">
          <span className="empty-icon">😞</span>
          <h3>Không tìm thấy sản phẩm</h3>
          <Link to="/" className="btn btn-primary">Về trang chủ</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container product-detail-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">Trang chủ</Link>
        <span>/</span>
        {product.tenLoai && (
          <>
            <Link to={`/?loai=${product.maLoai}`}>{product.tenLoai}</Link>
            <span>/</span>
          </>
        )}
        <span className="current">{product.tensp}</span>
      </nav>

      <div className="product-detail">
        <div className="product-detail-img">
          <img
            src={product.hinhAnh || 'https://via.placeholder.com/500x500?text=No+Image'}
            alt={product.tensp}
          />
        </div>

        <div className="product-detail-info">
          <h1 className="product-detail-name">{product.tensp}</h1>

          {product.tenThuongHieu && (
            <div className="product-detail-brand">
              Thương hiệu: <strong>{product.tenThuongHieu}</strong>
            </div>
          )}

          {product.tenLoai && (
            <div className="product-detail-category">
              Danh mục: <Link to={`/?loai=${product.maLoai}`}>{product.tenLoai}</Link>
            </div>
          )}

          <div className="product-detail-price">{formatPrice(product.gia)}</div>

          <div className="product-detail-stock">
            {product.soLuongTon > 0 ? (
              <span className="in-stock">✅ Còn hàng ({product.soLuongTon} sản phẩm)</span>
            ) : (
              <span className="out-stock">❌ Hết hàng</span>
            )}
          </div>

          {product.moTa && (
            <div className="product-detail-desc">
              <h3>Mô tả sản phẩm</h3>
              <p>{product.moTa}</p>
            </div>
          )}

          {product.soLuongTon > 0 && (
            <div className="product-detail-actions">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <input
                  type="number"
                  min="1"
                  max={product.soLuongTon}
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    setQuantity(Math.min(Math.max(1, val), product.soLuongTon));
                  }}
                />
                <button onClick={() => setQuantity(Math.min(product.soLuongTon, quantity + 1))}>+</button>
              </div>
              <button className="btn btn-primary btn-lg add-to-cart-btn" onClick={handleAddToCart}>
                🛒 Thêm vào giỏ hàng
              </button>
            </div>
          )}

          {addedMsg && (
            <div className={`alert ${addedMsg.includes('thành công') ? 'alert-success' : 'alert-error'}`}>
              {addedMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
