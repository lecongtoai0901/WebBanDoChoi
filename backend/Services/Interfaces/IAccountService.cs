using DoAn_WebBanDoChoi.DTOs.Account;
using DoAn_WebBanDoChoi.Models;

namespace DoAn_WebBanDoChoi.Services.Interfaces
{
    public interface IAccountService
    {
        Task<string> Register(RegisterDTO dto);
        Task<LoginResponseDTO?> Login(LoginDTO dto);
    }
}
