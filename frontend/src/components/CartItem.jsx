export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <div className="cart-item">
      <div className="cart-item-img">
        <img
          src={item.hinhAnh || 'https://via.placeholder.com/100x100?text=No+Image'}
          alt={item.tensp}
        />
      </div>
      <div className="cart-item-info">
        <h4 className="cart-item-name">{item.tensp}</h4>
        <div className="cart-item-price">{formatPrice(item.donGia)}</div>
      </div>
      <div className="cart-item-quantity">
        <button
          className="qty-btn"
          onClick={() => onUpdateQuantity(item.masp, Math.max(1, item.soLuong - 1))}
          disabled={item.soLuong <= 1}
        >
          −
        </button>
        <span className="qty-value">{item.soLuong}</span>
        <button
          className="qty-btn"
          onClick={() => onUpdateQuantity(item.masp, item.soLuong + 1)}
        >
          +
        </button>
      </div>
      <div className="cart-item-total">
        {formatPrice(item.donGia * item.soLuong)}
      </div>
      <button className="cart-item-remove" onClick={() => onRemove(item.masp)} title="Xóa">
        ✕
      </button>
    </div>
  );
}
