namespace Ng.Contact.Service.BillInfo
{
    using Company;
    using Model.Entity;
    using Product;
    using System.Linq;

    public class BillInfoModelService : IBillInfoModelService
    {
        IBillInfoService billInfoService;
        ICompanyService companyService;
        IProductService productService;

        public BillInfoModelService(IBillInfoService billInfoService, ICompanyService companyService, IProductService productService)
        {
            this.billInfoService = billInfoService;
            this.companyService = companyService;
            this.productService = productService;
        }

        public void Create(BillInfo billInfo)
        {
            if (billInfo?.Mobile > 0 && billInfo?.Mobile.Value.ToString().Length == 10)
            {
                var company = this.companyService.Get(billInfo.Mobile.Value);
                if (company == null)
                {
                    company = new Company
                    {
                        AadharNumber = billInfo.Aadhar,
                        Address = billInfo.Address,
                        GstNumber = billInfo.GstNumber,
                        Mobile = billInfo.Mobile,
                        Name = billInfo.CompanyName,
                        Phone = billInfo.Phone,
                        TinNumber = billInfo.TinNumber,
                        Balance = billInfo.Balance,
                        PanNumber = billInfo.PanNumber
                    };
                    companyService.Create(company);
                    billInfo.CompanyId = company.Id;
                }
                else
                {
                    company.AadharNumber = billInfo.Aadhar;
                    company.Address = billInfo.Address;
                    company.GstNumber = billInfo.GstNumber;
                    company.Mobile = billInfo.Mobile;
                    company.Name = billInfo.CompanyName;
                    company.Phone = billInfo.Phone;
                    company.TinNumber = billInfo.TinNumber;
                    company.PanNumber = billInfo.PanNumber;
                    company.Balance = billInfo.Balance;
                    companyService.Update(company);
                }
            }

            billInfo.SalesOrders.ToList().ForEach(order =>
            {
                var product = productService.Get(order.ProductId);
                var purchaseOrder = product.PurchaseOrders.FirstOrDefault(u => u.UnitId == order.UnitId && u.IsActive);
                purchaseOrder.CurrentStock -= order.Quantity;
                this.productService.Update(product);
            });

            this.billInfoService.Create(billInfo);
        }
    }
}