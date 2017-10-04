namespace Ng.Contact.Repository.Country
{
    using Contacts.Contracts;
    using Core;
    using Model.Entity;

    public interface ICountryRepository : IGenericRepository<Country>
    {
        CountryViewModel GetById(int id);
    }
}
