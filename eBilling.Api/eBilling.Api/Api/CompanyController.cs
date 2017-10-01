namespace eBilling.Api.Api
{
    using eBillingApi.Models;
    using eBillingApi.Repository;
    using System.Net.Http;
    using System.Web.Http;
    public class CompanyController : BaseController
    {
        private readonly GenericRepository<Company> genericRepository;

        public CompanyController()
        {
            this.genericRepository = new GenericRepository<Company>();
        }

        // GET api/company 
        public HttpResponseMessage Get()
        {
            var companies = this.genericRepository.Get();
            return ConverToJson(companies);
        }

        // GET api/company/5 
        public HttpResponseMessage Get(int id)
        {
            var company = this.genericRepository.Get(id);
            return ConverToJson(company);
        }

        // POST api/company 
        public void Post([FromBody]Company company)
        {
            this.genericRepository.Create(company);
        }

        // PUT api/company/5 
        public void Put(int id, [FromBody]Company company)
        {
            var result = this.genericRepository.Get(id);
            if (result == null)
            {
                return;
            }

            this.genericRepository.Update(id, company);
        }

        // DELETE api/company/5 
        public void Delete(int id)
        {
            this.genericRepository.Remove(id);
        }
    }
}
