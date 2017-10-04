namespace Ng.Contact.Service.Infrastructure
{
    using BillInfo;
    using Castle.MicroKernel.Registration;
    using Castle.MicroKernel.SubSystems.Configuration;
    using Castle.Windsor;
    using Company;
    using Product;
    using PurchaseOrder;
    using Unit;

    public class ServiceInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(Component.For<IUnitService>().ImplementedBy<UnitService>().LifestylePerWebRequest());
            container.Register(Component.For<ICompanyService>().ImplementedBy<CompanyService>().LifestylePerWebRequest());
            container.Register(Component.For<IProductService>().ImplementedBy<ProductService>().LifestylePerWebRequest());
            container.Register(Component.For<IPurchaseOrderService>().ImplementedBy<PurchaseOrderService>().LifestylePerWebRequest());
            container.Register(Component.For<IBillInfoService>().ImplementedBy<BillInfoService>().LifestylePerWebRequest());
            container.Register(Component.For<IBillInfoModelService>().ImplementedBy<BillInfoModelService>().LifestylePerWebRequest());
        }
    }
}