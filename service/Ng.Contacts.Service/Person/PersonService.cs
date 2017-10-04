namespace Ng.Contact.Service.Person
{
    using EntityService;
    using Model.Entity;
    using Repository.Person;
    using Repository.UnitOfWork;

    public class PersonService : EntityService<Person>, IPersonService
    {
        IUnitOfWork _unitOfWork;
        IPersonRepository _personRepository;

        public PersonService(IUnitOfWork unitOfWork, IPersonRepository personRepository)
            : base(unitOfWork, personRepository)
        {
            _unitOfWork = unitOfWork;
            _personRepository = personRepository;
        }

        public Person GetById(long Id)
        {
            return _personRepository.GetById(Id);
        }
    }
}
