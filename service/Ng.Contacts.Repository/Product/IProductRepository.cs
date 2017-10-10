namespace Ng.Contact.Repository.Product
{
    using Core;
    using Model.Entity;
    using System.Collections.Generic;

    public interface IProductRepository : IGenericRepository<Product>
    {
        IList<Product> GetProducts();
        Product Get(long id);
        bool IsExist(string name);
    }
}
