import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/DonHang`
  : 'http://localhost:5149/api/DonHang';

const donHangApi = {
  create: (data, token) =>
    axios.post(API_URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  getMyOrders: (token) =>
    axios.get(`${API_URL}/my-orders`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  getAll: (token) =>
    axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  getById: (id, token) =>
    axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  updateStatus: (id, trangThai, token) =>
    axios.put(
      `${API_URL}/${id}/status`,
      { trangThai },
      { headers: { Authorization: `Bearer ${token}` } }
    ),
};

export default donHangApi;
