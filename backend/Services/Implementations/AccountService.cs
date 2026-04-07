using DoAn_WebBanDoChoi.DTOs.Account;
using DoAn_WebBanDoChoi.Models;
using DoAn_WebBanDoChoi.Repositories.Interfaces;
using DoAn_WebBanDoChoi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DoAn_WebBanDoChoi.Services.Implementations
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _repo;
        private readonly JwtService _jwtService;

        public AccountService(IAccountRepository repo, JwtService jwtService)
        {
            _repo = repo;
            _jwtService = jwtService;
        }

        public async Task<string> Register(RegisterDTO dto)
        {
            var exist = await _repo.GetByEmail(dto.Email);

            if (exist != null)
                return "Email đã tồn tại";

            var account = new Account
            {
                Email = dto.Email,
                HoTen = dto.HoTen,
                MatKhau = BCrypt.Net.BCrypt.HashPassword(dto.MatKhau),
                NgayDangKy = DateOnly.FromDateTime(DateTime.Now),
                RoleId = 2
            };

            await _repo.Add(account);

            return "Đăng ký thành công";
        }

        public async Task<LoginResponseDTO?> Login(LoginDTO dto)
        {
            var user = await _repo.GetByEmail(dto.Email);

            if (user == null)
                return null;

            bool isValid = BCrypt.Net.BCrypt.Verify(dto.MatKhau, user.MatKhau);

            if (!isValid)
                return null;

            var token = _jwtService.GenerateToken(user);
            string role = user.RoleId == 1 ? "Admin" : "User";

            return new LoginResponseDTO
            {
                Token = token,
                User = new UserDTO
                {
                    MaKH = user.Makh,
                    Email = user.Email,
                    HoTen = user.HoTen,
                    NgayDangKy = user.NgayDangKy?.ToString("yyyy-MM-dd") ?? string.Empty,
                    RoleId = user.RoleId,
                    Role = role
                }
            };
        }
    }
}
