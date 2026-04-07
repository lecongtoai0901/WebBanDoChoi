using DoAn_WebBanDoChoi.DTOs.Account;
using DoAn_WebBanDoChoi.Services.Implementations;
using DoAn_WebBanDoChoi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DoAn_WebBanDoChoi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _service;

        public AccountController(IAccountService service)
        {
            _service = service;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO dto)
        {
            var result = await _service.Register(dto);
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            var result = await _service.Login(dto);

            if (result == null || result.Token == null)
                return Unauthorized("Sai email hoặc mật khẩu");

            return Ok(new
            {
                token = result.Token,
                user = new
                {
                    makh = result.User.MaKH,
                    email = result.User.Email,
                    hoTen = result.User.HoTen,
                    roleId = result.User.RoleId,
                    role = result.User.Role
                }
            });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            return Ok("Logout thành công");
        }
    }
}
