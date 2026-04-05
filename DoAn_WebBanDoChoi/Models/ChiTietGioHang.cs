using System;
using System.Collections.Generic;

namespace DoAn_WebBanDoChoi.Models
{
    public partial class ChiTietGioHang
    {
        public int Magh { get; set; }
        public int Masp { get; set; }
        public double? DonGia { get; set; }
        public int? SoLuong { get; set; }

        public virtual GioHang MaghNavigation { get; set; } = null!;
        public virtual SanPham MaspNavigation { get; set; } = null!;
    }
}
