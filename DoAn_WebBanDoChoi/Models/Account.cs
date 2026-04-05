using System;
using System.Collections.Generic;

namespace DoAn_WebBanDoChoi.Models
{
    public partial class Account
    {
        public Account()
        {
            DonHangs = new HashSet<DonHang>();
            GioHangs = new HashSet<GioHang>();
        }

        public int Makh { get; set; }
        public string Email { get; set; } = null!;
        public string HoTen { get; set; } = null!;
        public string MatKhau { get; set; } = null!;
        public DateOnly? NgayDangKy { get; set; }
        public string? SoDienThoai { get; set; }
        public int? RoleId { get; set; }

        public virtual Role? Role { get; set; }
        public virtual ICollection<DonHang> DonHangs { get; set; }
        public virtual ICollection<GioHang> GioHangs { get; set; }
    }
}
