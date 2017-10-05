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

        public PurchaseOrder GetByProductAndUnit(long productId, long unitId)
        {
            var purchaseOrder = FindBy(u => u.IsActive && u.ProductId == productId && u.UnitId == unitId).FirstOrDefault();
            return purchaseOrder;
        }
    }
}