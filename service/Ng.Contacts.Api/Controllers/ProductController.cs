namespace Ng.Contact.Api.Controllers
{
    using Contacts.Utils;
    using Model.Entity;
    using Service.Product;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;
    public class ProductController : ApiController
    {
        private readonly IProductService productService;

        public ProductController(IProductService productService)
        {
            this.productService = productService;
        }

        [HttpGet]
        public IEnumerable<Product> Get()
        {
            var products = this.productService.GetAll().ToList();
            products.ForEach(product =>
            {
                product.PurchaseOrders = product.PurchaseOrders.Where(u => u.IsActive).ToList();
            });
            return products;
        }

        [HttpGet]
        public Product Get(long id)
        {
            Guard.IsNotNullOrZero(id);

            var products = this.productService.Get(id);
            return products;
        }

        [HttpPost]
        public void Post(Product product)
        {
            Guard.IsNotNull(product);
            this.productService.Create(product);
        }

        [HttpPut]
        public void Put(Product product)
        {
            Guard.IsNotNull(product);
            this.productService.Update(product);
        }

        [HttpDelete]
        public void Delete(long id)
        {
            Guard.IsNotNull(id);
            this.productService.Delete(id);
        }
    }
}