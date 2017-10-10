namespace Ng.Contact.Service.PurchaseOrder
{
    using EntityService;
    using Model.Entity;
    using Repository.PurchaseOrder;
    using Repository.UnitOfWork;
    using System.Collections.Generic;
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

        public IList<PurchaseOrder> GetPurchaseOrders()
        {
            var purchaseOrderService = this.purchaseOrderRepository.GetPurchaseOrders();
            return purchaseOrderService;
        }

        public PurchaseOrder Get(long id)
        {
           var purchaseOrderService = this.purchaseOrderRepository.Get(id);
            return purchaseOrderService;
        }

        public PurchaseOrder GetByProductAndUnit(long productId, long unitId)
        {
            var purchaseOrder = this.purchaseOrderRepository.GetByProductAndUnit(productId, unitId);
            return purchaseOrder;
        }


        private void UpdateExistingPurchaseOrder(long id)
        {
            var purchaseOrder = this.purchaseOrderRepository.Get(id);
            purchaseOrder.IsActive = false;
            this.purchaseOrderRepository.Edit(purchaseOrder);
        }

        public void Delete(long id)
        {
            var purchaseOrderService = this.purchaseOrderRepository.Get(id);
            this.purchaseOrderRepository.Delete(purchaseOrderService);
            this.unitOfWork.Commit();
        }
    }
}