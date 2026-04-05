using System;
using System.Collections.Generic;

namespace DoAn_WebBanDoChoi.Models
{
    public partial class SanPham
    {
        public SanPham()
        {
            ChiTietDonHangs = new HashSet<ChiTietDonHang>();
            ChiTietGioHangs = new HashSet<ChiTietGioHang>();
        }

        public int Masp { get; set; }
        public double Gia { get; set; }
        public string? HinhAnh { get; set; }
        public string? MoTa { get; set; }
        public DateTime? NgayCapNhat { get; set; }
        public DateTime? NgayTao { get; set; }
        public int? SoLuongTon { get; set; }
        public string Tensp { get; set; } = null!;
        public bool? TrangThai { get; set; }
        public int? MaLoai { get; set; }
        public int? Math { get; set; }

        public virtual LoaiSanPham? MaLoaiNavigation { get; set; }
        public virtual ThuongHieu? MathNavigation { get; set; }
        public virtual ICollection<ChiTietDonHang> ChiTietDonHangs { get; set; }
        public virtual ICollection<ChiTietGioHang> ChiTietGioHangs { get; set; }
    }
}
