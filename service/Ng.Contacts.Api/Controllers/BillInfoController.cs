namespace Ng.Contact.Api.Controllers
{
    using Contacts.Utils;
    using Model.Entity;
    using Service.BillInfo;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;
    public class BillInfoController : ApiController
    {
        private readonly IBillInfoService billInfoService;
        private readonly IBillInfoModelService billInfoModelService;

        public BillInfoController(IBillInfoService billInfoService, IBillInfoModelService billInfoModelService)
        {
            this.billInfoService = billInfoService;
            this.billInfoModelService = billInfoModelService;
        }

        [HttpGet]
        public IEnumerable<BillInfo> Get()
        {
            var billInfos = this.billInfoService.GetAll().ToList();
            return billInfos;
        }

        [HttpGet]
        public BillInfo Get(long id)
        {
            Guard.IsNotNullOrZero(id);

            var billInfos = this.billInfoService.Get(id);
            return billInfos;
        }

        [HttpPost]
        public void Post(BillInfo billInfo)
        {
            Guard.IsNotNull(billInfo);
            this.billInfoModelService.Create(billInfo);
        }

        [HttpPut]
        public void Put(BillInfo billInfo)
        {
            Guard.IsNotNull(billInfo);
            this.billInfoService.Update(billInfo);
        }

        [HttpDelete]
        public void Delete(long id)
        {
            Guard.IsNotNull(id);
            this.billInfoService.Delete(id);
        }
    }
}