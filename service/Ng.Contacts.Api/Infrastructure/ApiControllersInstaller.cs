namespace Ng.Contacts.Api.Infrastructure
{
    using Castle.MicroKernel.Registration;
    using Contact.Service.Infrastructure;
    using Contact.Repository.Infrastructure;
    using System.Web.Http;
    using Castle.MicroKernel.SubSystems.Configuration;

    public class ApiControllersInstaller : IWindsorInstaller
    {
        public void Install(Castle.Windsor.IWindsorContainer container, IConfigurationStore store)
        {
            container.Install(new ServiceInstaller());
            container.Install(new RepositoryInstaller());

            container.Register(Classes.FromThisAssembly()
             .BasedOn<ApiController>()
             .LifestylePerWebRequest());
        }
    }
}