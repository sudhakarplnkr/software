namespace Ng.Contact.Repository.Company
{
    using Core;
    using Model.Entity;

    public interface ICompanyRepository : IGenericRepository<Company>
    {
        Company Get(long id);
        Company FindByMobile(long? mobile);
        bool IsExist(long id, long? mobile);
    }
}
