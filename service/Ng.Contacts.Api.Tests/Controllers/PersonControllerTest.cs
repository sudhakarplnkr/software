namespace Ng.Contact.Api.Tests.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using Moq;
    using Model.Entity;
    using Api.Controllers;
    using Service.Person;

    [TestClass]
    public class PersonControllerTest
    {
        private static Mock<IPersonService> personRepository;

        [ClassInitialize]
        public static void TestInit(TestContext context)
        {
            personRepository = new Mock<IPersonService>();
        }

        [TestMethod]
        public void Get()
        {
            // Arrange
            var persons = new List<Person> {
                new Person {Name="test1" },
                new Person {Name="test2" }
            };
            var controller = new PersonController(personRepository.Object);
            personRepository.Setup(s => s.GetAll()).Returns(persons);

            // Act
            IEnumerable<Person> result = controller.Get();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count());
            Assert.AreEqual("test1", result.ElementAt(0).Name);
            Assert.AreEqual("test2", result.ElementAt(1).Name);
        }
    }
}
