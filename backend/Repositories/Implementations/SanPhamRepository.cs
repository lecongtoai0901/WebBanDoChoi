using DoAn_WebBanDoChoi.Data;
using DoAn_WebBanDoChoi.Models;
using DoAn_WebBanDoChoi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DoAn_WebBanDoChoi.Repositories.Implementations
{
    public class SanPhamRepository : ISanPhamRepository
    {
        private readonly WebBanDoChoiContext _context;

        public SanPhamRepository(WebBanDoChoiContext context)
        {
            _context = context;
        }

        public async Task<List<SanPham>> GetAll()
        {
            return await _context.SanPhams.ToListAsync();
        }

        public async Task<SanPham?> GetById(int id)
        {
            return await _context.SanPhams.FirstOrDefaultAsync(x => x.Masp == id);
        }

        public async Task<List<SanPham>> Search(string keyword)
        {
            return await _context.SanPhams
                .Where(x => x.Tensp.Contains(keyword) || (x.MoTa != null && x.MoTa.Contains(keyword)))
                .ToListAsync();
        }

        public async Task<List<SanPham>> GetByCategory(int categoryId)
        {
            return await _context.SanPhams
                .Where(x => x.MaLoai == categoryId)
                .ToListAsync();
        }

        public async Task<int> Add(SanPham sanPham)
        {
            sanPham.NgayTao = DateTime.Now;
            sanPham.NgayCapNhat = DateTime.Now;
            _context.SanPhams.Add(sanPham);
            await _context.SaveChangesAsync();
            return sanPham.Masp;
        }

        public async Task Update(SanPham sanPham)
        {
            sanPham.NgayCapNhat = DateTime.Now;
            _context.SanPhams.Update(sanPham);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var sanPham = await GetById(id);
            if (sanPham != null)
            {
                _context.SanPhams.Remove(sanPham);
                await _context.SaveChangesAsync();
            }
        }
    }
}
