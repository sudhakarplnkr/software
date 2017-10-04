namespace Ng.Contact.Service.Person
{
    using EntityService;
    using Model.Entity;

    public interface IPersonService : IEntityService<Person>
    {
        Person GetById(long Id);
    }
}
