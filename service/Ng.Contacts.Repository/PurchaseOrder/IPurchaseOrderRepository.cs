namespace Ng.Contact.Repository.PurchaseOrder
{
    using Core;
    using Model.Entity;

    public interface IPurchaseOrderRepository : IGenericRepository<PurchaseOrder>
    {
        PurchaseOrder Get(long id);
        PurchaseOrder GetByProductAndUnit(long productId, long unitId);
    }
}
