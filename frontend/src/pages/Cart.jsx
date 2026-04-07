import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

export default function Cart() {
  const { token } = useAuth();
  const { cartItems, loading, updateQuantity, removeItem, clearCart } = useCart();

  const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + 'đ';

  const totalAmount = cartItems.reduce((sum, item) => sum + item.donGia * item.soLuong, 0);

  if (!token) {
    return (
      <div className="container">
        <div className="empty-state">
          <span className="empty-icon">🔒</span>
          <h3>Vui lòng đăng nhập</h3>
          <p>Bạn cần đăng nhập để xem giỏ hàng</p>
          <Link to="/login" className="btn btn-primary">Đăng nhập</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Đang tải giỏ hàng...</p>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <h1 className="page-title">🛒 Giỏ hàng của bạn</h1>

      {cartItems.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🛒</span>
          <h3>Giỏ hàng trống</h3>
          <p>Hãy thêm sản phẩm yêu thích vào giỏ hàng nhé!</p>
          <Link to="/" className="btn btn-primary">Tiếp tục mua sắm</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            <div className="cart-header-row">
              <span>Sản phẩm</span>
              <span>Đơn giá</span>
              <span>Số lượng</span>
              <span>Thành tiền</span>
              <span></span>
            </div>
            {cartItems.map((item) => (
              <CartItem
                key={item.masp}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
            <div className="cart-actions-row">
              <Link to="/" className="btn btn-outline">← Tiếp tục mua sắm</Link>
              <button className="btn btn-danger" onClick={clearCart}>Xóa tất cả</button>
            </div>
          </div>

          <div className="cart-summary">
            <h3>Tóm tắt đơn hàng</h3>
            <div className="summary-row">
              <span>Tạm tính ({cartItems.length} sản phẩm)</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
            <div className="summary-row">
              <span>Phí vận chuyển</span>
              <span className="free-ship">Miễn phí</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Tổng cộng</span>
              <span className="total-price">{formatPrice(totalAmount)}</span>
            </div>
            <Link to="/checkout" className="btn btn-primary btn-full btn-lg">
              Tiến hành đặt hàng
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
