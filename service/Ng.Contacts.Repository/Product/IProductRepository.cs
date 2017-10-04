namespace Ng.Contact.Repository.Product
{
    using Core;
    using Model.Entity;

    public interface IProductRepository : IGenericRepository<Product>
    {
        Product Get(long id);
    }
}
