namespace Ng.Contact.Service.Product
{
    using System;
    using System.Collections.Generic;
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

        public IList<Product> GetProducts()
        {
            var products = this.companyRepository.GetProducts();
            return products;
        }

        public Product Get(long id)
        {
           var product = this.companyRepository.Get(id);
            return product;
        }

        public bool IsExist(string name)
        {
            var isExist = this.companyRepository.IsExist(name);
            return isExist;
        }

        public void Delete(long id)
        {
            var product = this.companyRepository.Get(id);
            this.companyRepository.Delete(product);
            this.unitOfWork.Commit();
        }
    }
}