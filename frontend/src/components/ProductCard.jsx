import { Link } from 'react-router-dom';

const getImageUrl = (path) => {
  if (!path) return 'https://via.placeholder.com/300x300?text=No+Image';
  if (path.startsWith('http')) return path;
  
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5149';
  return `${baseUrl}${path}`;
};

export default function ProductCard({ product }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.masp}`} className="product-card-link">
        <div className="product-card-img">
          <img
            src={getImageUrl(product.hinhAnh)}
            alt={product.tensp}
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
            }}
          />
          {product.trangThai === false && <span className="badge-soldout">Hết hàng</span>}
        </div>
        <div className="product-card-info">
          <h3 className="product-card-name">{product.tensp}</h3>
          {product.tenThuongHieu && (
            <span className="product-card-brand">{product.tenThuongHieu}</span>
          )}
          <div className="product-card-price">{formatPrice(product.gia)}</div>
        </div>
      </Link>
    </div>
  );
}
