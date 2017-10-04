namespace Ng.Contact.Repository.PurchaseOrder
{
    using Core;
    using Model.Entity;
    using System.Data.Entity;
    using System.Linq;

    public class PurchaseOrderRepository : GenericRepository<PurchaseOrder>, IPurchaseOrderRepository
    {
        public PurchaseOrderRepository(DbContext context)
            : base(context)
        {
        }

        public PurchaseOrder Get(long id)
        {
            var purchaseOrder = FindBy(u => u.Id == id).FirstOrDefault();
            return purchaseOrder;
        }
    }
}
