import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';

import Dashboard from '../pages/Admin/Dashboard';
import ManageProduct from '../pages/Admin/ManageProduct';
import ManageOrder from '../pages/Admin/ManageOrder';

import AdminRoute from './AdminRoute'; 

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* 🔒 ADMIN (bọc AdminRoute) */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <ManageProduct />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <AdminRoute>
            <ManageOrder />
          </AdminRoute>
        }
      />

      {/* SUCCESS */}
      <Route
        path="/checkout-success"
        element={
          <div className="container">
            <div className="empty-state" style={{ marginTop: '60px' }}>
              <span className="empty-icon">🎉</span>
              <h3>Đặt hàng thành công!</h3>
              <p>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.</p>
              <a href="/" className="btn btn-primary">Tiếp tục mua sắm</a>
            </div>
          </div>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <div className="container">
            <div className="empty-state" style={{ marginTop: '60px' }}>
              <span className="empty-icon">404</span>
              <h3>Không tìm thấy trang</h3>
              <a href="/" className="btn btn-primary">Về trang chủ</a>
            </div>
          </div>
        }
      />
    </Routes>
  );
}