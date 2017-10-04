namespace Ng.Contact.Api.Controllers
{
    using Model.Entity;
    using Repository.Person;
    using System.Collections.Generic;
    using System.Web.Http;
    public class ValuesController : ApiController
    {
        private readonly IPersonRepository personRepository;
        public ValuesController(IPersonRepository personRepository)
        {
            this.personRepository = personRepository;
        }
        // GET api/values
        public IEnumerable<Person> Get()
        {
            var person = this.personRepository.GetAll();
            return person;
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
