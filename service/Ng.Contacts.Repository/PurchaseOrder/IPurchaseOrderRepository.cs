namespace Ng.Contact.Repository.PurchaseOrder
{
    using Core;
    using Model.Entity;

    public interface IPurchaseOrderRepository : IGenericRepository<PurchaseOrder>
    {
        PurchaseOrder Get(long id);
    }
}
