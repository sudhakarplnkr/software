namespace Ng.Contact.Service.Unit
{
    using EntityService;
    using Model.Entity;

    public interface IUnitService : IEntityService<Unit>
    {
        Unit Get(long id);
        void Delete(long id);
        bool IsExist(long id, string description);
    }
}
