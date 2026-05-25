import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/SanPham`
  : 'http://localhost:5149/api/SanPham';

const sanPhamApi = {
  getAll: () => axios.get(API_URL),
  getById: (id) => axios.get(`${API_URL}/${id}`),
  search: (keyword) => axios.get(`${API_URL}/search/${keyword}`),
  getByCategory: (categoryId) => axios.get(`${API_URL}/category/${categoryId}`),
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${API_URL}/upload`, formData);
  },
  create: (data, token) =>
    axios.post(API_URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  update: (id, data, token) =>
    axios.put(`${API_URL}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  delete: (id, token) => {
    console.log('Delete API - ID:', id, 'Type:', typeof id);
    if (!id) {
      console.error('Delete failed: ID is undefined or null');
      return Promise.reject(new Error('ID is required'));
    }
    return axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default sanPhamApi;
