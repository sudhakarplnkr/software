namespace eBilling.Api.Host.Infrastructure
{
    using Api;
    using Castle.MicroKernel.Registration;
    using Castle.MicroKernel.SubSystems.Configuration;
    using Castle.Windsor;
    using Context;
    using System.Web.Http.Controllers;

    public class ApiInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(Classes.FromAssembly(typeof(ProductController).Assembly)
                            .BasedOn<IHttpController>());
            container.Register(Component.For<SchoolContext>());
        }
    }
}
