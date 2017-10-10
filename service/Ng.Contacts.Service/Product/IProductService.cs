namespace Ng.Contact.Service.Product
{
    using EntityService;
    using Model.Entity;
    using System.Collections.Generic;

    public interface IProductService : IEntityService<Product>
    {
        IList<Product> GetProducts();
        Product Get(long id);
        bool IsExist(string name);
        void Delete(long id);
    }
}
