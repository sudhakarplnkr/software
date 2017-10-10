namespace Ng.Contact.Api.Controllers
{
    using Contacts.Utils;
    using Model.Entity;
    using Service.PurchaseOrder;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;
    public class PurchaseOrderController : ApiController
    {
        private readonly IPurchaseOrderService purchaseOrderService;

        public PurchaseOrderController(IPurchaseOrderService purchaseOrderService)
        {
            this.purchaseOrderService = purchaseOrderService;
        }

        [HttpGet]
        public IEnumerable<PurchaseOrder> Get()
        {
            var purchaseOrders = this.purchaseOrderService.GetPurchaseOrders().Where(u => u.IsActive).ToList();
            return purchaseOrders;
        }

        [HttpGet]
        public PurchaseOrder Get(long id, long unitId)
        {
            Guard.IsNotNullOrZero(id);
            Guard.IsNotNullOrZero(unitId);

            var purchaseOrders = this.purchaseOrderService.GetByProductAndUnit(id, unitId);
            return purchaseOrders;
        }

        [HttpPost]
        public void Post(PurchaseOrder purchaseOrder)
        {
            Guard.IsNotNull(purchaseOrder);
            if (purchaseOrder.Id > 0)
            {
                var originalOrder = this.purchaseOrderService.Get(purchaseOrder.Id);
                originalOrder.IsActive = false;
                purchaseOrder.OpeningStock += originalOrder.CurrentStock;
                this.purchaseOrderService.Update(originalOrder);
                purchaseOrder.Id = 0;
            }

            purchaseOrder.IsActive = true;
            this.purchaseOrderService.Create(purchaseOrder);
        }

        [HttpPut]
        public void Put(PurchaseOrder purchaseOrder)
        {
            Guard.IsNotNull(purchaseOrder);
            var originalOrder = this.purchaseOrderService.Get(purchaseOrder.Id);
            originalOrder.CurrentStock = purchaseOrder.CurrentStock;
            originalOrder.Cgst = purchaseOrder.Cgst;
            originalOrder.ClosingStock = purchaseOrder.ClosingStock;
            originalOrder.CompanyId = purchaseOrder.CompanyId;
            originalOrder.OpeningStock = purchaseOrder.OpeningStock;
            originalOrder.PerUnitPrice = purchaseOrder.PerUnitPrice;
            originalOrder.ProductId = purchaseOrder.ProductId;
            originalOrder.ReSalesPrice = purchaseOrder.ReSalesPrice;
            originalOrder.SalesPrice = purchaseOrder.SalesPrice;
            originalOrder.Sgst = purchaseOrder.Sgst;
            originalOrder.UnitId = purchaseOrder.UnitId;
            originalOrder.IsActive = true;
            this.purchaseOrderService.Update(originalOrder);
        }

        [HttpDelete]
        public void Delete(long id)
        {
            Guard.IsNotNull(id);
            this.purchaseOrderService.Delete(id);
        }
    }
}