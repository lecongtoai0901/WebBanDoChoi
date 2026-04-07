using DoAn_WebBanDoChoi.Data;
using DoAn_WebBanDoChoi.Models;
using DoAn_WebBanDoChoi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DoAn_WebBanDoChoi.Repositories.Implementations
{
    public class AccountRepository : IAccountRepository
    {
        private readonly WebBanDoChoiContext _context;

        public AccountRepository(WebBanDoChoiContext context)
        {
            _context = context;
        }

        public async Task<Account?> GetByEmail(string email)
        {
            return await _context.Accounts
                .FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task Add(Account account)
        {
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
        }
    }
}
