import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import donHangApi from '../../api/donHangApi';

export default function ManageOrder() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await donHangApi.getAll(token);
      setOrders(res.data || []);
    } catch { setOrders([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchOrders(); }, [token]);

  const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  const formatDate = (date) => date ? new Date(date).toLocaleDateString('vi-VN') : '';

  const statusColors = {
    'Chờ xác nhận': '#f59e0b',
    'Đã xác nhận': '#3b82f6',
    'Đang giao': '#8b5cf6',
    'Đã giao': '#10b981',
    'Đã hủy': '#ef4444',
  };

  const handleUpdateStatus = async (id, trangThai) => {
    try {
      await donHangApi.updateStatus(id, trangThai, token);
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || 'Cập nhật thất bại');
    }
  };

  return (
    <div className="container admin-page">
      <h1 className="page-title">🧾 Quản lý đơn hàng</h1>

      {loading ? (
        <div className="loading-container"><div className="spinner"></div></div>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <h3>Chưa có đơn hàng nào</h3>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã ĐH</th>
                <th>Khách hàng</th>
                <th>Địa chỉ</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.madh}>
                  <td>#{order.madh}</td>
                  <td>{order.tenKhachHang}</td>
                  <td className="addr-cell">{order.diaChiGiao}</td>
                  <td>{formatDate(order.ngayDat)}</td>
                  <td className="price-cell">{formatPrice(order.tongTien)}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: statusColors[order.trangThai] || '#6b7280' }}
                    >
                      {order.trangThai}
                    </span>
                  </td>
                  <td>
                    <select
                      value={order.trangThai}
                      onChange={(e) => handleUpdateStatus(order.madh, e.target.value)}
                      className="status-select"
                    >
                      <option>Chờ xác nhận</option>
                      <option>Đã xác nhận</option>
                      <option>Đang giao</option>
                      <option>Đã giao</option>
                      <option>Đã hủy</option>
                    </select>
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => setSelectedOrder(selectedOrder === order.madh ? null : order.madh)}
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Chi tiết đơn hàng #{selectedOrder}</h2>
            {(() => {
              const order = orders.find((o) => o.madh === selectedOrder);
              if (!order) return null;
              return (
                <div className="order-detail-list">
                  {order.chiTietDonHangs?.map((ct) => (
                    <div key={ct.masp} className="checkout-item">
                      <img src={ct.hinhAnh || 'https://via.placeholder.com/50'} alt="" />
                      <div className="checkout-item-info">
                        <span>{ct.tenSanPham}</span>
                        <span>x{ct.soLuong}</span>
                      </div>
                      <span>{formatPrice(ct.donGia * ct.soLuong)}</span>
                    </div>
                  ))}
                  <hr />
                  <div className="summary-row total">
                    <span>Tổng cộng:</span>
                    <span>{formatPrice(order.tongTien)}</span>
                  </div>
                </div>
              );
            })()}
            <button className="btn btn-outline" onClick={() => setSelectedOrder(null)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}
