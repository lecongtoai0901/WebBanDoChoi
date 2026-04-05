using System;
using System.Collections.Generic;

namespace DoAn_WebBanDoChoi.Models
{
    public partial class ChiTietDonHang
    {
        public int Madh { get; set; }
        public int Masp { get; set; }
        public double? DonGia { get; set; }
        public int? SoLuong { get; set; }

        public virtual DonHang MadhNavigation { get; set; } = null!;
        public virtual SanPham MaspNavigation { get; set; } = null!;
    }
}
