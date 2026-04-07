import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import sanPhamApi from '../../api/sanPhamApi';

const getImageUrl = (path) => {
  if (!path) return 'https://via.placeholder.com/50';
  if (path.startsWith('http')) return path;
  
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5149';
  return `${baseUrl}${path}`;
};

export default function ManageProduct() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    tensp: '', gia: '', hinhAnh: '', moTa: '', soLuongTon: '', maLoai: '', math: '',
  });

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Fetching products from:', 'http://localhost:5149/api/SanPham');
      const res = await sanPhamApi.getAll();
      console.log('Raw response:', res);
      console.log('Response status:', res.status);
      console.log('Response data:', res.data);
      console.log('Is array:', Array.isArray(res.data));
      
      if (Array.isArray(res.data)) {
        setProducts(res.data);
        console.log(`Loaded ${res.data.length} products`);
      } else {
        console.warn('Response is not an array:', res.data);
        setProducts([]);
        setError('Định dạng dữ liệu không hợp lệ');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      console.error('Error message:', err.message);
      console.error('Error response:', err.response);
      setError(err.response?.data?.message || err.message || 'Lỗi khi tải sản phẩm');
      setProducts([]);
    }
    finally { setLoading(false); }
  };

  useEffect(() => { 
    console.log('Component mounted, token:', token ? 'present' : 'missing');
    fetchProducts(); 
  }, []);

  const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + 'đ';

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log('[Upload] No file selected');
      return;
    }

    console.log(`[Upload] Starting upload: ${file.name}, type: ${file.type}, size: ${file.size}`);
    setUploading(true);
    try {
      console.log('[Upload] Calling API...');
      const response = await sanPhamApi.upload(file);
      console.log('[Upload] Success response:', response);
      setForm({ ...form, hinhAnh: response.data.imageUrl });
      alert('Upload hình ảnh thành công');
    } catch (err) {
      console.error('[Upload] Error:', err);
      console.error('[Upload] Error response:', err.response);
      alert('Lỗi upload: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setForm({ tensp: '', gia: '', hinhAnh: '', moTa: '', soLuongTon: '', maLoai: '', math: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (p) => {
    setForm({
      tensp: p.tensp, gia: p.gia, hinhAnh: p.hinhAnh || '', moTa: p.moTa || '',
      soLuongTon: p.soLuongTon || '', maLoai: p.maLoai || '', math: p.math || '',
    });
    setEditingId(p.masp);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.tensp.trim()) {
      alert('Tên sản phẩm không được để trống');
      return;
    }
    if (!form.gia || parseFloat(form.gia) <= 0) {
      alert('Giá phải lớn hơn 0');
      return;
    }
    
    const data = {
      ...form,
      gia: parseFloat(form.gia),
      soLuongTon: parseInt(form.soLuongTon) || 0,
      maLoai: form.maLoai ? parseInt(form.maLoai) : null,
      math: form.math ? parseInt(form.math) : null,
    };
    
    console.log('[Submit] Form data:', data);
    console.log('[Submit] Image URL:', data.hinhAnh);
    
    try {
      if (editingId) {
        console.log('[Submit] Updating product:', editingId);
        await sanPhamApi.update(editingId, data, token);
        alert('Cập nhật sản phẩm thành công');
      } else {
        console.log('[Submit] Creating new product');
        await sanPhamApi.create(data, token);
        alert('Thêm sản phẩm thành công');
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error('[Submit] Error:', err);
      alert(err.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
    try {
      await sanPhamApi.delete(id, token);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Xóa thất bại');
    }
  };

  return (
    <div className="container admin-page">
      <div className="admin-header">
        <h1 className="page-title">📦 Quản lý sản phẩm</h1>
        <button className="btn btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>
          + Thêm sản phẩm
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && resetForm()}>
          <div className="modal">
            <h2>{editingId ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Tên sản phẩm</label>
                <input name="tensp" value={form.tensp} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Giá</label>
                  <input name="gia" type="number" value={form.gia} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Số lượng tồn</label>
                  <input name="soLuongTon" type="number" value={form.soLuongTon} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Hình ảnh</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                  {uploading && <span>Đang upload...</span>}
                </div>
                {form.hinhAnh && (
                  <div style={{ marginTop: '10px' }}>
                    <img
                      src={getImageUrl(form.hinhAnh)}
                      alt="preview"
                      style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '4px' }}
                    />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Mô tả</label>
                <textarea name="moTa" rows="3" value={form.moTa} onChange={handleChange} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Mã loại</label>
                  <input name="maLoai" type="number" value={form.maLoai} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Mã thương hiệu</label>
                  <input name="math" type="number" value={form.math} onChange={handleChange} />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={uploading}>
                  {uploading ? 'Đang upload...' : editingId ? 'Cập nhật' : 'Thêm mới'}
                </button>
                <button type="button" className="btn btn-outline" onClick={resetForm}>Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading-container"><div className="spinner"></div></div>
      ) : error ? (
        <div className="error-message">
          <p>⚠️ {error}</p>
          <button className="btn btn-primary" onClick={fetchProducts}>Thử lại</button>
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <p>Không có sản phẩm nào. Hãy thêm sản phẩm mới.</p>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Hình</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Tồn kho</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.masp}>
                  <td>{p.masp}</td>
                  <td>
                    <img
                      src={getImageUrl(p.hinhAnh)}
                      alt=""
                      className="admin-thumb"
                    />
                  </td>
                  <td>{p.tensp}</td>
                  <td>{formatPrice(p.gia)}</td>
                  <td>{p.soLuongTon}</td>
                  <td>
                    <button className="btn btn-sm btn-outline" onClick={() => handleEdit(p)}>Sửa</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.masp)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
