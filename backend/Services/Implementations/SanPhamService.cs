using DoAn_WebBanDoChoi.DTOs.SanPham;
using DoAn_WebBanDoChoi.Models;
using DoAn_WebBanDoChoi.Repositories.Interfaces;
using DoAn_WebBanDoChoi.Services.Interfaces;

namespace DoAn_WebBanDoChoi.Services.Implementations
{
    public class SanPhamService : ISanPhamService
    {
        private readonly ISanPhamRepository _repo;

        public SanPhamService(ISanPhamRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<SanPhamDTO>> GetAll()
        {
            try
            {
                var sanPhams = await _repo.GetAll();
                Console.WriteLine($"[GetAll] Found {sanPhams.Count} products");
                return sanPhams.Select(sp => MapToDTO(sp)).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[GetAll] Error: {ex.Message}");
                throw;
            }
        }

        public async Task<SanPhamDTO?> GetById(int id)
        {
            var sanPham = await _repo.GetById(id);
            return sanPham != null ? MapToDTO(sanPham) : null;
        }

        public async Task<List<SanPhamDTO>> Search(string keyword)
        {
            var sanPhams = await _repo.Search(keyword);
            return sanPhams.Select(sp => MapToDTO(sp)).ToList();
        }

        public async Task<List<SanPhamDTO>> GetByCategory(int categoryId)
        {
            var sanPhams = await _repo.GetByCategory(categoryId);
            return sanPhams.Select(sp => MapToDTO(sp)).ToList();
        }

        public async Task<int> Create(CreateSanPhamDTO dto)
        {
            var sanPham = new SanPham
            {
                Tensp = dto.Tensp,
                Gia = dto.Gia,
                MoTa = dto.MoTa,
                HinhAnh = dto.HinhAnh,
                SoLuongTon = dto.SoLuongTon ?? 0,
                TrangThai = dto.TrangThai ?? true,
                MaLoai = dto.MaLoai,
                Math = dto.Math
            };

            return await _repo.Add(sanPham);
        }

        public async Task<bool> Update(int id, UpdateSanPhamDTO dto)
        {
            var sanPham = await _repo.GetById(id);
            if (sanPham == null)
                return false;

            sanPham.Tensp = dto.Tensp;
            sanPham.Gia = dto.Gia;
            sanPham.MoTa = dto.MoTa;
            sanPham.HinhAnh = dto.HinhAnh;
            sanPham.SoLuongTon = dto.SoLuongTon;
            sanPham.TrangThai = dto.TrangThai;
            sanPham.MaLoai = dto.MaLoai;
            sanPham.Math = dto.Math;

            await _repo.Update(sanPham);
            return true;
        }

        public async Task<bool> Delete(int id)
        {
            var sanPham = await _repo.GetById(id);
            if (sanPham == null)
                return false;

            await _repo.Delete(id);
            return true;
        }

        private SanPhamDTO MapToDTO(SanPham sanPham)
        {
            return new SanPhamDTO
            {
                Masp = sanPham.Masp,
                Tensp = sanPham.Tensp,
                Gia = sanPham.Gia,
                MoTa = sanPham.MoTa,
                HinhAnh = sanPham.HinhAnh,
                SoLuongTon = sanPham.SoLuongTon,
                TrangThai = sanPham.TrangThai,
                MaLoai = sanPham.MaLoai,
                Math = sanPham.Math,
                NgayTao = sanPham.NgayTao,
                NgayCapNhat = sanPham.NgayCapNhat
            };
        }
    }
}
