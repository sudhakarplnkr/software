namespace Ng.Contact.Service.Country
{
    using EntityService;
    using Model.Entity;
    using Repository.Country;
    using Repository.UnitOfWork;

    public class CountryService : EntityService<Country>, ICountryService
    {
        IUnitOfWork _unitOfWork;
        ICountryRepository _countryRepository;

        public CountryService(IUnitOfWork unitOfWork, ICountryRepository countryRepository)
            : base(unitOfWork, countryRepository)
        {
            _unitOfWork = unitOfWork;
            _countryRepository = countryRepository;
        }

        public Country GetById(int Id)
        {
            return _countryRepository.GetById(Id);
        }
    }
}
