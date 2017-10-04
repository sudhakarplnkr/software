namespace Ng.Contact.Repository.Product
{
    using Core;
    using Model.Entity;
    using System.Data.Entity;
    using System.Linq;

    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(DbContext context)
            : base(context)
        {
        }

        public Product Get(long id)
        {
            var product = FindBy(u => u.Id == id).FirstOrDefault();
            return product;
        }
    }
}
