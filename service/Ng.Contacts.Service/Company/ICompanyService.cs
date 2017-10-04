namespace Ng.Contact.Service.Company
{
    using EntityService;
    using Model.Entity;

    public interface ICompanyService : IEntityService<Company>
    {
        Company Get(long id);
        void Delete(long id);
    }
}
