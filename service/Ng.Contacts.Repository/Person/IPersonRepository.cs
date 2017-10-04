namespace Ng.Contact.Repository.Person
{
    using Core;
    using Model.Entity;

    public interface IPersonRepository : IGenericRepository<Person>
    {
        Person GetById(long id);
    }
}
