namespace Ng.Contact.Repository.Unit
{
    using Core;
    using Model.Entity;

    public interface IUnitRepository : IGenericRepository<Unit>
    {
        Unit Get(long id);
        bool IsExist(long id, string code);
    }
}
