using DoAn_WebBanDoChoi.Models;

namespace DoAn_WebBanDoChoi.Repositories.Interfaces
{
    public interface ISanPhamRepository
    {
        Task<List<SanPham>> GetAll();
        Task<SanPham?> GetById(int id);
        Task<List<SanPham>> Search(string keyword);
        Task<List<SanPham>> GetByCategory(int categoryId);
        Task<int> Add(SanPham sanPham);
        Task Update(SanPham sanPham);
        Task Delete(int id);
    }
}
