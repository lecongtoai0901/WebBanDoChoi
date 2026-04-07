namespace DoAn_WebBanDoChoi.DTOs.Account
{
    public class UserDTO
    {
        public int MaKH { get; set; }
        public string Email { get; set; }
        public string HoTen { get; set; }
        public string NgayDangKy { get; set; }
        public int? RoleId { get; set; }
        public string Role { get; set; }
    }
}
