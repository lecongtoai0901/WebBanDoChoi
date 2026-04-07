import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="container admin-page">
      <h1 className="page-title">⚙️ Bảng điều khiển quản trị</h1>

      <div className="admin-header">
        <p>
          Xin chào, <strong>{user?.hoTen}</strong> 👋
        </p>
        <button className="btn btn-danger" onClick={logout}>
          Đăng xuất
        </button>
      </div>

      <div className="admin-cards">
        {/* PRODUCT */}
        <Link to="/admin/products" className="admin-card">
          <span className="admin-card-icon">📦</span>
          <h3>Quản lý sản phẩm</h3>
          <p>Thêm, sửa, xóa sản phẩm</p>
        </Link>

        {/* ORDER */}
        <Link to="/admin/orders" className="admin-card">
          <span className="admin-card-icon">🧾</span>
          <h3>Quản lý đơn hàng</h3>
          <p>Xem và cập nhật trạng thái đơn hàng</p>
        </Link>

        {/* USER */}
        <Link to="/admin/users" className="admin-card">
          <span className="admin-card-icon">👤</span>
          <h3>Quản lý người dùng</h3>
          <p>Phân quyền & quản lý tài khoản</p>
        </Link>
      </div>
    </div>
  );
}