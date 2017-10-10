namespace Ng.Contact.Api.Controllers
{
    using Contacts.Utils;
    using Model.Entity;
    using Service.Product;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
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
            var products = this.productService.GetProducts().ToList();
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

            var product = this.productService.Get(id);
            return product;
        }

        [HttpPost]
        public HttpStatusCode Post(Product product)
        {
            Guard.IsNotNull(product);
            var isExist = this.productService.IsExist(product.Description);
            if (isExist)
            {
                return HttpStatusCode.PreconditionFailed;
            }
            this.productService.Create(product);
            return HttpStatusCode.OK;
        }

        [HttpPut]
        public HttpStatusCode Put(Product product)
        {
            Guard.IsNotNull(product);

            var originalProduct = this.productService.Get(product.Id);
            Guard.IsNotNull(originalProduct);

            var isExist = this.productService.IsExist(product.Description);
            if (isExist && !string.Equals(originalProduct.Description, product.Description, System.StringComparison.OrdinalIgnoreCase))
            {
                return HttpStatusCode.PreconditionFailed;
            }

            originalProduct.Description = product.Description;
            originalProduct.TamilName = product.TamilName;
            this.productService.Update(originalProduct);
            return HttpStatusCode.OK;
        }

        [HttpDelete]
        public void Delete(long id)
        {
            Guard.IsNotNull(id);
            this.productService.Delete(id);
        }
    }
}