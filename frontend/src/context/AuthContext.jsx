import { createContext, useContext, useState, useEffect } from 'react';
import accountApi from '../api/accountApi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // ================= AUTO LOAD USER =================
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  // ================= LOGIN =================
  const login = async (data) => {
    try {
      const res = await accountApi.login(data);

      // lưu localStorage
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));

      // set state
      setToken(res.token);
      setUser(res.user);

      return res;
    } catch (err) {
      throw err;
    }
  };

  // ================= REGISTER =================
  const register = async (data) => {
    try {
      const res = await accountApi.register(data);
      return res;
    } catch (err) {
      throw err;
    }
  };

  // ================= LOGOUT =================
  const logout = async () => {
    try {
      await accountApi.logout();
    } catch (err) {
      console.log('Logout API lỗi (bỏ qua)');
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAdmin: user?.role === "Admin" 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// custom hook
export function useAuth() {
  return useContext(AuthContext);
}