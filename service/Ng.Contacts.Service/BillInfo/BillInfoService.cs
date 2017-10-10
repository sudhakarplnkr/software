namespace Ng.Contact.Service.BillInfo
{
    using EntityService;
    using Model.Entity;
    using Repository.BillInfo;
    using Repository.UnitOfWork;
    using System.Collections.Generic;

    public class BillInfoService : EntityService<BillInfo>, IBillInfoService
    {
        IUnitOfWork unitOfWork;
        IBillInfoRepository billInfoRepository;

        public BillInfoService(IUnitOfWork unitOfWork, IBillInfoRepository billInfoRepository)
            : base(unitOfWork, billInfoRepository)
        {
            this.unitOfWork = unitOfWork;
            this.billInfoRepository = billInfoRepository;
        }

        public IList<BillInfo> GetBills()
        {
            var billInfos = this.billInfoRepository.GetBills();
            return billInfos;
        }

        public BillInfo Get(long id)
        {
           var billInfo = this.billInfoRepository.Get(id);
            return billInfo;
        }

        public void Delete(long id)
        {
            var billInfo = this.billInfoRepository.Get(id);
            this.billInfoRepository.Delete(billInfo);
            this.unitOfWork.Commit();
        }
    }
}