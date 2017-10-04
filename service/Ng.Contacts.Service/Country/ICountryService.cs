namespace Ng.Contact.Service.Country
{
    using EntityService;
    using Model.Entity;

    public interface ICountryService : IEntityService<Country>
    {
        Country GetById(int Id);
    }
}
