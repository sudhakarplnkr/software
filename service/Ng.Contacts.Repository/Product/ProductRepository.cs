namespace Ng.Contact.Repository.Product
{
    using Core;
    using Model.Entity;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;

    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(DbContext context)
            : base(context)
        {
        }

        public IList<Product> GetProducts()
        {
            var product = GetAll()
                .Include(u => u.PurchaseOrders)
                .Include(u => u.PurchaseOrders.Select(s => s.Company))
                .Include(u => u.PurchaseOrders.Select(s => s.Unit));
            return product.ToList();
        }

        public Product Get(long id)
        {
            var product = FindBy(u => u.Id == id).Include(i=>i.PurchaseOrders).FirstOrDefault();
            return product;
        }

        public bool IsExist(string name)
        {
            var isExist = FindBy(u => u.Description.ToUpper() == name.ToUpper()).Any();
            return isExist;
        }
    }
}
