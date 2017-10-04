namespace Ng.Contact.Service.PurchaseOrder
{
    using EntityService;
    using Model.Entity;
    using Repository.PurchaseOrder;
    using Repository.UnitOfWork;
    using System.Linq;

    public class PurchaseOrderService : EntityService<PurchaseOrder>, IPurchaseOrderService
    {
        IUnitOfWork unitOfWork;
        IPurchaseOrderRepository purchaseOrderRepository;

        public PurchaseOrderService(IUnitOfWork unitOfWork, IPurchaseOrderRepository purchaseOrderRepository)
            : base(unitOfWork, purchaseOrderRepository)
        {
            this.unitOfWork = unitOfWork;
            this.purchaseOrderRepository = purchaseOrderRepository;
        }

        public PurchaseOrder Get(long id)
        {
           var purchaseOrderService = this.purchaseOrderRepository.Get(id);
            return purchaseOrderService;
        }

        private void GetByProductAndUnit(long productId, long unitId)
        {
            var purchaseOrders = GetAll().Where(u => u.ProductId == productId && u.UnitId == unitId).ToList();
            purchaseOrders.ForEach(order =>
            {
                order.IsActive = false;
                this.purchaseOrderRepository.Edit(order);
            });
        }

        public void Delete(long id)
        {
            var purchaseOrderService = this.purchaseOrderRepository.Get(id);
            this.purchaseOrderRepository.Delete(purchaseOrderService);
            this.unitOfWork.Commit();
        }
    }
}