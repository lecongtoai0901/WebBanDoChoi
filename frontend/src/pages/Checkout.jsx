import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import donHangApi from '../api/donHangApi';

export default function Checkout() {
  const { user, token } = useAuth();
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [diaChiGiao, setDiaChiGiao] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  const totalAmount = cartItems.reduce((sum, item) => sum + item.donGia * item.soLuong, 0);

  if (!token) {
    return (
      <div className="container">
        <div className="empty-state">
          <span className="empty-icon">🔒</span>
          <h3>Vui lòng đăng nhập</h3>
          <Link to="/login" className="btn btn-primary">Đăng nhập</Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <span className="empty-icon">🛒</span>
          <h3>Giỏ hàng trống</h3>
          <p>Không có sản phẩm để đặt hàng.</p>
          <Link to="/" className="btn btn-primary">Tiếp tục mua sắm</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!diaChiGiao.trim()) {
      setError('Vui lòng nhập địa chỉ giao hàng');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await donHangApi.create({ diaChiGiao }, token);
      await clearCart();
      navigate('/checkout-success');
    } catch (err) {
      setError(err.response?.data?.message || 'Đặt hàng thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container checkout-page">
      <h1 className="page-title">📦 Thanh toán</h1>

      <div className="checkout-layout">
        <div className="checkout-form-section">
          <h2>Thông tin giao hàng</h2>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label>Họ tên</label>
              <input type="text" value={user?.hoTen || ''} disabled />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={user?.email || ''} disabled />
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input type="text" value={user?.soDienThoai || ''} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="diaChiGiao">Địa chỉ giao hàng <span className="required">*</span></label>
              <textarea
                id="diaChiGiao"
                rows="3"
                placeholder="Nhập địa chỉ giao hàng chi tiết..."
                value={diaChiGiao}
                onChange={(e) => setDiaChiGiao(e.target.value)}
                required
              ></textarea>
            </div>
            {error && <div className="alert alert-error">{error}</div>}
            <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h2>Đơn hàng của bạn</h2>
          <div className="checkout-items">
            {cartItems.map((item) => (
              <div key={item.masp} className="checkout-item">
                <img
                  src={item.hinhAnh || 'https://via.placeholder.com/60x60?text=No+Image'}
                  alt={item.tensp}
                />
                <div className="checkout-item-info">
                  <span className="checkout-item-name">{item.tensp}</span>
                  <span className="checkout-item-qty">x{item.soLuong}</span>
                </div>
                <span className="checkout-item-price">{formatPrice(item.donGia * item.soLuong)}</span>
              </div>
            ))}
          </div>
          <hr />
          <div className="summary-row">
            <span>Tạm tính</span>
            <span>{formatPrice(totalAmount)}</span>
          </div>
          <div className="summary-row">
            <span>Phí vận chuyển</span>
            <span className="free-ship">Miễn phí</span>
          </div>
          <div className="summary-row total">
            <span>Tổng cộng</span>
            <span className="total-price">{formatPrice(totalAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
