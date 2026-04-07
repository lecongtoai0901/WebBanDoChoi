using DoAn_WebBanDoChoi.Models;

namespace DoAn_WebBanDoChoi.Repositories.Interfaces
{
    public interface IAccountRepository
    {
        Task<Account?> GetByEmail(string email);
        Task Add(Account account);
    }
}
