import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/GioHang`
  : 'http://localhost:5149/api/GioHang';

const gioHangApi = {
  getCart: (token) =>
    axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  addToCart: (data, token) =>
    axios.post(`${API_URL}/add`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  updateQuantity: (masp, soLuong, token) =>
    axios.put(
      `${API_URL}/update`,
      { masp, soLuong },
      { headers: { Authorization: `Bearer ${token}` } }
    ),
  removeItem: (masp, token) =>
    axios.delete(`${API_URL}/remove/${masp}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  clearCart: (token) =>
    axios.delete(`${API_URL}/clear`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default gioHangApi;
