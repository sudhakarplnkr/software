namespace Ng.Contact.Service.PurchaseOrder
{
    using EntityService;
    using Model.Entity;
    using System.Collections.Generic;

    public interface IPurchaseOrderService : IEntityService<PurchaseOrder>
    {
        PurchaseOrder Get(long id);
        void Delete(long id);
    }
}
