using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ng.Contact.Model.Entity;
using Ng.Contact.Repository.Person;
using Ng.Contact.Repository.UnitOfWork;
using Ng.Contact.Service.Person;
using System.Collections.Generic;
using System.Linq;

namespace Ng.Contacts.Services.Unit.Test
{
    [TestClass]
    public class PersonServiceTest
    {
        private Mock<IPersonRepository> personRepository;
        private IPersonService personService;
        Mock<IUnitOfWork> unitWork;
        List<Person> persons;

        [TestInitialize]
        public void Initialize()
        {
            personRepository = new Mock<IPersonRepository>();
            unitWork = new Mock<IUnitOfWork>();
            personService = new PersonService(unitWork.Object, personRepository.Object);
            persons = new List<Person>() {
             new Person { Id = 1, Name = "Test User1" },
             new Person { Id = 2, Name = "Test User2" },
             new Person { Id = 3, Name = "Test User3" }
            };
        }

        [TestMethod]
        public void PersonGetAll()
        {
            //Arrange
            personRepository.Setup(x => x.GetAll()).Returns(persons);

            //Act
            var results = personService.GetAll().ToList();

            //Assert
            Assert.IsNotNull(results);
            Assert.AreEqual(3, results.Count);
        }
    }
}
