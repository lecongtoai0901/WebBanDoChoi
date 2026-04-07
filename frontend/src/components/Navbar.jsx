import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [keyword, setKeyword] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();
  const userDropdownRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?search=${encodeURIComponent(keyword.trim())}`);
      setMenuOpen(false);
      setSearchOpen(false);
    }
  };

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      {/* Top bar */}
      <div className="header-top">
        <div className="container header-top-inner">
          {/* Mobile: hamburger on left */}
          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </>
              )}
            </svg>
          </button>

          <Link to="/" className="logo">
            <img src={logo} alt="" className="logo-img" />
          </Link>

          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Nhập từ khóa cần tìm..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </form>

          <div className="header-actions">
            {user ? (
              <div className="user-menu">
                <span className="user-greeting">Xin chào, <strong>{user.hoTen}</strong></span>
                <button onClick={logout} className="btn btn-outline btn-sm">Đăng xuất</button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/register" className="btn btn-primary btn-sm">Đăng ký</Link>
                <Link to="/login" className="btn btn-accent btn-sm">Đăng nhập</Link>
              </div>
            )}

            {/* Mobile: search icon */}
            <button className="mobile-search-toggle" onClick={() => setSearchOpen(!searchOpen)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Mobile: user icon with dropdown */}
            <div className="mobile-user-wrapper" ref={userDropdownRef}>
              <button className="mobile-user-toggle" onClick={() => setUserDropdown(!userDropdown)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
              {userDropdown && (
                <div className="user-dropdown">
                  {user ? (
                    <>
                      <span className="user-dropdown-name">Xin chào, <strong>{user.hoTen}</strong></span>
                      <button onClick={() => { logout(); setUserDropdown(false); }} className="btn btn-outline btn-sm btn-full">Đăng xuất</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="btn btn-accent btn-sm btn-full" onClick={() => setUserDropdown(false)}>Đăng nhập</Link>
                      <Link to="/register" className="btn btn-primary btn-sm btn-full" onClick={() => setUserDropdown(false)}>Đăng ký</Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link to="/cart" className="cart-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              <span className="cart-label">Giỏ hàng</span>
            </Link>
          </div>
        </div>

        {/* Mobile search overlay */}
        {searchOpen && (
          <div className="mobile-search-bar">
            <form onSubmit={handleSearch} className="mobile-search-form">
              <input
                type="text"
                placeholder="Nhập từ khóa cần tìm..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                autoFocus
              />
              <button type="submit" className="search-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
              <button type="button" className="mobile-search-close" onClick={() => setSearchOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
        <div className="container">
          <ul className="nav-list">
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Trang Chủ</Link></li>
            <li><Link to="/?loai=1" onClick={() => setMenuOpen(false)}>Gundam</Link></li>
            <li><Link to="/?loai=2" onClick={() => setMenuOpen(false)}>Pokemon</Link></li>
            <li><Link to="/?loai=3" onClick={() => setMenuOpen(false)}>Mô Hình</Link></li>
            <li><Link to="/?loai=4" onClick={() => setMenuOpen(false)}>Lego</Link></li>
            <li><Link to="/?loai=5" onClick={() => setMenuOpen(false)}>Board Game</Link></li>
            <li><Link to="/?loai=6" onClick={() => setMenuOpen(false)}>Tin Tức - Hướng Dẫn</Link></li>
            {user && user.roleId === 1 && (
              <li><Link to="/admin" onClick={() => setMenuOpen(false)}>Quản Trị</Link></li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
