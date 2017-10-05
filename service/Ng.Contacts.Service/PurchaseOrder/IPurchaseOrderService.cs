namespace Ng.Contact.Service.PurchaseOrder
{
    using EntityService;
    using Model.Entity;

    public interface IPurchaseOrderService : IEntityService<PurchaseOrder>
    {
        PurchaseOrder Get(long id);
        PurchaseOrder GetByProductAndUnit(long productId, long unitId);
        void Delete(long id);
    }
}
