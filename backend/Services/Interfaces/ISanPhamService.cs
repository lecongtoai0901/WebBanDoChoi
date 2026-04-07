using DoAn_WebBanDoChoi.DTOs.SanPham;

namespace DoAn_WebBanDoChoi.Services.Interfaces
{
    public interface ISanPhamService
    {
        Task<List<SanPhamDTO>> GetAll();
        Task<SanPhamDTO?> GetById(int id);
        Task<List<SanPhamDTO>> Search(string keyword);
        Task<List<SanPhamDTO>> GetByCategory(int categoryId);
        Task<int> Create(CreateSanPhamDTO dto);
        Task<bool> Update(int id, UpdateSanPhamDTO dto);
        Task<bool> Delete(int id);
    }
}
