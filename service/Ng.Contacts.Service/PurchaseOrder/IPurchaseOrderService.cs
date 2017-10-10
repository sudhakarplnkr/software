namespace Ng.Contact.Service.PurchaseOrder
{
    using EntityService;
    using Model.Entity;
    using System.Collections.Generic;

    public interface IPurchaseOrderService : IEntityService<PurchaseOrder>
    {
        IList<PurchaseOrder> GetPurchaseOrders();
        PurchaseOrder Get(long id);
        PurchaseOrder GetByProductAndUnit(long productId, long unitId);
        void Delete(long id);
    }
}
