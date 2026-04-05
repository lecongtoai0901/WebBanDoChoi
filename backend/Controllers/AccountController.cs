using Microsoft.AspNetCore.Mvc;

namespace DoAn_WebBanDoChoi.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
