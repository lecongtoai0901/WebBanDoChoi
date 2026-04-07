namespace DoAn_WebBanDoChoi.DTOs.SanPham
{
    public class CreateSanPhamDTO
    {
        public string Tensp { get; set; }
        public double Gia { get; set; }
        public string? MoTa { get; set; }
        public string? HinhAnh { get; set; }
        public int? SoLuongTon { get; set; }
        public bool? TrangThai { get; set; }
        public int? MaLoai { get; set; }
        public int? Math { get; set; }
    }
}
