namespace Ng.Contact.Service.Product
{
    using EntityService;
    using Model.Entity;

    public interface IProductService : IEntityService<Product>
    {
        Product Get(long id);
        void Delete(long id);
    }
}
