namespace Ng.Contact.Api.Controllers
{
    using Contacts.Utils;
    using Model.Entity;
    using Service.Company;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
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

            var companys = this.companyService.FindByMobile(id);
            return companys;
        }

        [HttpPost]
        public HttpStatusCode Post(Company company)
        {
            Guard.IsNotNull(company);
            var isExist = this.companyService.IsExist(company.Id, company.Mobile);
            if (isExist)
            {
                return HttpStatusCode.PreconditionFailed;
            }
            this.companyService.Create(company);
            return HttpStatusCode.OK;
        }

        [HttpPut]
        public HttpStatusCode Put(Company company)
        {
            Guard.IsNotNull(company);

            var isExist = this.companyService.IsExist(company.Id, company.Mobile);
            if (isExist)
            {
                return HttpStatusCode.PreconditionFailed;
            }

            this.companyService.Update(company);
            return HttpStatusCode.OK;
        }

        [HttpDelete]
        public void Delete(long id)
        {
            Guard.IsNotNull(id);
            this.companyService.Delete(id);
        }
    }
}