namespace Ng.Contact.Service.BillInfo
{
    using EntityService;
    using Model.Entity;

    public interface IBillInfoService : IEntityService<BillInfo>
    {
        BillInfo Get(long id);
        void Delete(long id);
    }
}
