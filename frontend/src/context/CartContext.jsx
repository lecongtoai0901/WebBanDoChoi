import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import gioHangApi from '../api/gioHangApi';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!token) {
      setCartItems([]);
      return;
    }
    setLoading(true);
    try {
      const res = await gioHangApi.getCart(token);
      setCartItems(res.data || []);
    } catch {
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (masp, soLuong = 1) => {
    await gioHangApi.addToCart({ masp, soLuong }, token);
    await fetchCart();
  };

  const updateQuantity = async (masp, soLuong) => {
    await gioHangApi.updateQuantity(masp, soLuong, token);
    await fetchCart();
  };

  const removeItem = async (masp) => {
    await gioHangApi.removeItem(masp, token);
    await fetchCart();
  };

  const clearCart = async () => {
    await gioHangApi.clearCart(token);
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + (item.soLuong || 0), 0);

  return (
    <CartContext.Provider
      value={{ cartItems, cartCount, loading, addToCart, updateQuantity, removeItem, clearCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export default CartContext;
