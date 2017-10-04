namespace Ng.Contact.Repository.Country
{
    using Contacts.Contracts;
    using Core;
    using Model.Entity;
    using System.Data.Entity;
    using System.Linq;

    public class CountryRepository : GenericRepository<Country>, ICountryRepository
    {
        public CountryRepository(DbContext context)
              : base(context)
        {

        }
        public CountryViewModel GetById(int id)
        {
            return FindBy(x => x.Id == id).FirstOrDefault();
        }
    }
}
