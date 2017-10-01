namespace eBilling.Api.Api
{
    using eBillingApi.Models;
    using eBillingApi.Repository;
    using System.Net.Http;
    using System.Web.Http;
    public class UnitController : BaseController
    {
        private readonly GenericRepository<Unit> genericRepository;

        public UnitController()
        {
            this.genericRepository = new GenericRepository<Unit>();
        }

        // GET api/unit 
        public HttpResponseMessage Get()
        {
            var units = this.genericRepository.Get();
            return ConverToJson(units);
        }

        // GET api/unit/5 
        public HttpResponseMessage Get(int id)
        {
            var unit = this.genericRepository.Get(id);
            return ConverToJson(unit);
        }

        // POST api/unit 
        public void Post([FromBody]Unit unit)
        {
            this.genericRepository.Create(unit);
        }

        // PUT api/unit/5 
        public void Put(int id, [FromBody]Unit unit)
        {
            var result = this.genericRepository.Get(id);
            if (result == null)
            {
                return;
            }

            this.genericRepository.Update(id, unit);
        }

        // DELETE api/unit/5 
        public void Delete(int id)
        {
            this.genericRepository.Remove(id);
        }
    }
}
