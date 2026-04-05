using System;
using System.Collections.Generic;

namespace DoAn_WebBanDoChoi.Models
{
    public partial class GioHang
    {
        public GioHang()
        {
            ChiTietGioHangs = new HashSet<ChiTietGioHang>();
        }

        public int Magh { get; set; }
        public DateTime? NgayTao { get; set; }
        public int? Makh { get; set; }

        public virtual Account? MakhNavigation { get; set; }
        public virtual ICollection<ChiTietGioHang> ChiTietGioHangs { get; set; }
    }
}
