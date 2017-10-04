namespace Ng.Contact.Repository.Company
{
    using Core;
    using Model.Entity;
    using System.Data.Entity;
    using System.Linq;

    public class CompanyRepository : GenericRepository<Company>, ICompanyRepository
    {
        public CompanyRepository(DbContext context)
            : base(context)
        {
        }

        public Company Get(long id)
        {
            var company = FindBy(u => u.Mobile == id).FirstOrDefault();
            return company;
        }
    }
}
