namespace Ng.Contact.Repository.Infrastructure
{
    using Castle.MicroKernel.Registration;
    using Castle.MicroKernel.SubSystems.Configuration;
    using Castle.Windsor;
    using Model.Context;
    using Unit;
    using System.Data.Entity;
    using UnitOfWork;
    using Company;
    using Product;
    using PurchaseOrder;
    using BillInfo;

    public class RepositoryInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(Component.For<IUnitOfWork>().ImplementedBy<UnitOfWork>().LifestylePerWebRequest());
            container.Register(Component.For<DbContext>().UsingFactoryMethod(() => new NgContactContext()).LifestylePerWebRequest());
            container.Register(Component.For<IUnitRepository>().ImplementedBy<UnitRepository>().LifestylePerWebRequest());
            container.Register(Component.For<ICompanyRepository>().ImplementedBy<CompanyRepository>().LifestylePerWebRequest());
            container.Register(Component.For<IProductRepository>().ImplementedBy<ProductRepository>().LifestylePerWebRequest());
            container.Register(Component.For<IPurchaseOrderRepository>().ImplementedBy<PurchaseOrderRepository>().LifestylePerWebRequest());
            container.Register(Component.For<IBillInfoRepository>().ImplementedBy<BillInfoRepository>().LifestylePerWebRequest());
        }
    }
}