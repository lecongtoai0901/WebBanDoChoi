import { useState, useEffect } from 'react';
import sanPhamApi from '../api/sanPhamApi';
import '../styles/ProductList.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await sanPhamApi.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      fetchProducts();
      return;
    }
    try {
      setLoading(true);
      const response = await sanPhamApi.search(searchKeyword);
      setProducts(response.data);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) return;
    try {
      await sanPhamApi.delete(id, localStorage.getItem('token'));
      setProducts(products.filter(p => p.masp !== id));
      alert('Xóa sản phẩm thành công');
    } catch (error) {
      alert('Lỗi khi xóa sản phẩm');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="product-list-container">
      <div className="product-header">
        <h1>Quản lý Sản phẩm</h1>
        <button className="btn-add" onClick={() => setShowForm(true)}>
          + Thêm sản phẩm
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="btn-search" onClick={handleSearch}>
          Tìm kiếm
        </button>
        <button className="btn-reset" onClick={() => { setSearchKeyword(''); fetchProducts(); }}>
          Reset
        </button>
      </div>

      {showForm && (
        <ProductForm product={editingProduct} onClose={handleFormClose} />
      )}

      <div className="products-grid">
        {products.length === 0 ? (
          <p className="empty-message">Không có sản phẩm nào</p>
        ) : (
          products.map((product) => (
            <div key={product.masp} className="product-card">
              <div className="product-image">
                {product.hinhAnh ? (
                  <img src={product.hinhAnh} alt={product.tensp} />
                ) : (
                  <div className="image-placeholder">Hình ảnh</div>
                )}
              </div>
              <div className="product-info">
                <h3>{product.tensp}</h3>
                <p className="price">{product.gia.toLocaleString('vi-VN')} VND</p>
                <p className="description">{product.moTa}</p>
                <p className="stock">Tồn kho: {product.soLuongTon}</p>
                <div className="product-actions">
                  <button className="btn-edit" onClick={() => handleEdit(product)}>
                    Sửa
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(product.masp)}>
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ProductForm({ product, onClose }) {
  const [formData, setFormData] = useState(
    product || {
      tensp: '',
      gia: 0,
      moTa: '',
      hinhAnh: '',
      soLuongTon: 0,
      trangThai: true,
      maLoai: '',
      math: '',
    }
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (product) {
        await sanPhamApi.update(product.masp, formData, token);
        alert('Cập nhật sản phẩm thành công');
      } else {
        await sanPhamApi.create(formData, token);
        alert('Thêm sản phẩm thành công');
      }
      onClose();
    } catch (error) {
      alert('Lỗi: ' + (error.response?.data?.message || 'Không thể lưu sản phẩm'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{product ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label>Tên sản phẩm *</label>
            <input
              type="text"
              name="tensp"
              value={formData.tensp}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Giá *</label>
            <input
              type="number"
              name="gia"
              value={formData.gia}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mô tả</label>
            <textarea
              name="moTa"
              value={formData.moTa}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Hình ảnh URL</label>
            <input
              type="text"
              name="hinhAnh"
              value={formData.hinhAnh}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Số lượng tồn kho</label>
            <input
              type="number"
              name="soLuongTon"
              value={formData.soLuongTon}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="trangThai"
                checked={formData.trangThai}
                onChange={handleChange}
              />
              Kích hoạt
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Đang lưu...' : 'Lưu'}
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
