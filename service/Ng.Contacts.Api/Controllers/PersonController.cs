namespace Ng.Contact.Api.Controllers
{
    using Model.Entity;
    using Service.Person;
    using System.Collections.Generic;
    using System.Web.Http;
    public class PersonController : ApiController
    {
        private readonly IPersonService personService;

        public PersonController(IPersonService personService)
        {
            this.personService = personService;
        }

        public IEnumerable<Person> Get()
        {
            var person = this.personService.GetAll();
            return person;
        }
    }
}
