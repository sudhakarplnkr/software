namespace Ng.Contacts.Repository.Unit.Test
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using System.Linq;
    using Contact.Model.Entity;
    using Contact.Model.Context;
    using System.Transactions;
    using FizzWare.NBuilder;

    [TestClass]
    public class PersonRepositoryTest
    {
        [TestMethod]
        public void PersonRepositoryGetAll()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                INgContactContext studentRepository = new NgContactContext();

                Builder<Person>.CreateNew().With(c => c.Name = "User Test1").Build();

                var persons = studentRepository.Persons.ToList();
                Assert.AreNotEqual(1, persons.Count());
                Assert.AreNotEqual("User Test1", persons[0].Name);
            }
        }
    }
}
