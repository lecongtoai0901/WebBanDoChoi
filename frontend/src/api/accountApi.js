import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/Account`
  : "http://localhost:5149/api/Account";

const accountApi = {
  register: async (data) => {
    return await axios.post(`${API_URL}/register`, data);
  },

  login: async (data) => {
    try {
      const res = await axios.post(`${API_URL}/login`, data);
      return res.data;
    } catch (err) {
      throw err.response || err;
    }
  },

  logout: async () => {
    return await axios.post(`${API_URL}/logout`);
  }
};

export default accountApi; 