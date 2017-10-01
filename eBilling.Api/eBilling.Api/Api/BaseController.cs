namespace eBillingApi.Models
{
    using Newtonsoft.Json;
    using System.Net;
    using System.Net.Http;
    using System.Text;
    using System.Web.Http;
    public class BaseController : ApiController
    {
        protected HttpResponseMessage ConverToJson(object data)
        {
            string yourJson = JsonConvert.SerializeObject(data);
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(yourJson, Encoding.UTF8, "application/json");
            return response;
        }
    }
}