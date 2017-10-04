namespace Ng.Contact.Api.Controllers
{
    using Contacts.Utils;
    using Model.Entity;
    using Service.Company;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;
    public class CompanyController : ApiController
    {
        private readonly ICompanyService companyService;

        public CompanyController(ICompanyService companyService)
        {
            this.companyService = companyService;
        }

        [HttpGet]
        public IEnumerable<Company> Get()
        {
            var companys = this.companyService.GetAll().ToList();
            return companys;
        }

        [HttpGet]
        public Company Get(long id)
        {
            Guard.IsNotNullOrZero(id);

            var companys = this.companyService.Get(id);
            return companys;
        }

        [HttpPost]
        public void Post(Company company)
        {
            Guard.IsNotNull(company);
            this.companyService.Create(company);
        }

        [HttpPut]
        public void Put(Company company)
        {
            Guard.IsNotNull(company);
            this.companyService.Update(company);
        }

        [HttpDelete]
        public void Delete(long id)
        {
            Guard.IsNotNull(id);
            this.companyService.Delete(id);
        }
    }
}