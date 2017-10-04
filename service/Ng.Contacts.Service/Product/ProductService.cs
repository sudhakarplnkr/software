namespace Ng.Contact.Service.Product
{
    using EntityService;
    using Model.Entity;
    using Repository.Product;
    using Repository.UnitOfWork;

    public class ProductService : EntityService<Product>, IProductService
    {
        IUnitOfWork unitOfWork;
        IProductRepository companyRepository;

        public ProductService(IUnitOfWork unitOfWork, IProductRepository companyRepository)
            : base(unitOfWork, companyRepository)
        {
            this.unitOfWork = unitOfWork;
            this.companyRepository = companyRepository;
        }

        public Product Get(long id)
        {
           var product = this.companyRepository.Get(id);
            return product;
        }

        public void Delete(long id)
        {
            var product = this.companyRepository.Get(id);
            this.companyRepository.Delete(product);
            this.unitOfWork.Commit();
        }
    }
}