namespace Ng.Contact.Service.Company
{
    using EntityService;
    using Model.Entity;

    public interface ICompanyService : IEntityService<Company>
    {
        Company Get(long id);
        Company FindByMobile(long? mobile);

        void Delete(long id);
        bool IsExist(long id, long? mobile);
    }
}
