namespace Ng.Contact.Repository.PurchaseOrder
{
    using Core;
    using Model.Entity;
    using System.Collections.Generic;

    public interface IPurchaseOrderRepository : IGenericRepository<PurchaseOrder>
    {
        IList<PurchaseOrder> GetPurchaseOrders();
        PurchaseOrder Get(long id);
        PurchaseOrder GetByProductAndUnit(long productId, long unitId);
    }
}
