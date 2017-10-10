namespace Ng.Contact.Repository.Company
{
    using Core;
    using Model.Entity;
    using System.Data.Entity;
    using System.Linq;
    using System;

    public class CompanyRepository : GenericRepository<Company>, ICompanyRepository
    {
        public CompanyRepository(DbContext context)
            : base(context)
        {
        }

        public Company Get(long id)
        {
            var company = FindBy(u => u.Id == id).FirstOrDefault();
            return company;
        }

        public Company FindByMobile(long? mobile)
        {
            var company = FindBy(u => u.Mobile == mobile).FirstOrDefault();
            return company;
        }

        public bool IsExist(long id, long? mobile)
        {
            var isExist = FindBy(u => u.Id != id && u.Mobile == mobile).Any();
            return isExist;
        }
    }
}
