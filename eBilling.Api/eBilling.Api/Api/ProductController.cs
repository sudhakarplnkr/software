namespace eBilling.Api.Api
{
    using Context;
    using eBillingApi.Models;
    using eBillingApi.Repository;
    using Models;
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Web.Http;

    public class ProductController : BaseController
    {
        private readonly GenericRepository<Product> genericRepository;
        //private readonly SchoolContext schoolContext;
       
        public ProductController()
        {
            this.genericRepository = new GenericRepository<Product>();
            //this.schoolContext = schoolContext;
        }

        // GET api/values 
        public HttpResponseMessage Get()
        {
            //Student stud = new Student() { StudentName = "New Student", Standard = new Standard { StandardName = "1" } };

            //schoolContext.Students.Add(stud);
            //schoolContext.SaveChanges();

            var standard = new Standard
            {
                StandardName = "1",
                Students = new List<Student> {
                    new Student
                    {
                        StudentName = "test student1"
                    },
                     new Student
                    {
                        StudentName = "test student2"
                    }
                }
            };
            //var standards = schoolContext.Standards;
            //schoolContext.Standards.RemoveRange(standards);

            //schoolContext.Standards.RemoveRange(standards);
            //schoolContext.SaveChanges();
            
            var products = this.genericRepository.Get(); //schoolContext.Standards;
            return ConverToJson(products);
        }

        // GET api/values/5 
        public HttpResponseMessage Get(int id)
        {
            var products = this.genericRepository.Get(id);
            return ConverToJson(products);
        }

        // POST api/values 
        public void Post([FromBody]Product product)
        {
            this.genericRepository.Create(product);
        }

        // PUT api/values/5 
        public void Put(int id, [FromBody]Product product)
        {
            var result = this.genericRepository.Get(id);
            if (result == null)
            {
                return;
            }

            this.genericRepository.Update(id, product);
        }

        // DELETE api/values/5 
        public void Delete(int id)
        {
            this.genericRepository.Remove(id);
        }
    }
}
