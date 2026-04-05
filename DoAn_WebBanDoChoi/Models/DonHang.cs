using System;
using System.Collections.Generic;

namespace DoAn_WebBanDoChoi.Models
{
    public partial class DonHang
    {
        public DonHang()
        {
            ChiTietDonHangs = new HashSet<ChiTietDonHang>();
        }

        public int Madh { get; set; }
        public string DiaChiGiao { get; set; } = null!;
        public DateTime? NgayDat { get; set; }
        public double? TongTien { get; set; }
        public string? TrangThai { get; set; }
        public int? Makh { get; set; }

        public virtual Account? MakhNavigation { get; set; }
        public virtual ICollection<ChiTietDonHang> ChiTietDonHangs { get; set; }
    }
}
