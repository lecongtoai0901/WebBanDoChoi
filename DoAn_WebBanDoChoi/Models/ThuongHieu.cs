using System;
using System.Collections.Generic;

namespace DoAn_WebBanDoChoi.Models
{
    public partial class ThuongHieu
    {
        public ThuongHieu()
        {
            SanPhams = new HashSet<SanPham>();
        }

        public int Math { get; set; }
        public string Tenth { get; set; } = null!;

        public virtual ICollection<SanPham> SanPhams { get; set; }
    }
}
