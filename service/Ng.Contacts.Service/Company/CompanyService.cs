namespace Ng.Contact.Service.Company
{
    using EntityService;
    using Model.Entity;
    using Repository.Company;
    using Repository.UnitOfWork;

    public class CompanyService : EntityService<Company>, ICompanyService
    {
        IUnitOfWork unitOfWork;
        ICompanyRepository companyRepository;

        public CompanyService(IUnitOfWork unitOfWork, ICompanyRepository companyRepository)
            : base(unitOfWork, companyRepository)
        {
            this.unitOfWork = unitOfWork;
            this.companyRepository = companyRepository;
        }

        public Company Get(long id)
        {
           var company = this.companyRepository.Get(id);
            return company;
        }

        public void Delete(long id)
        {
            var company = this.companyRepository.Get(id);
            this.companyRepository.Delete(company);
            this.unitOfWork.Commit();
        }
    }
}