namespace Ng.Contact.Service.BillInfo
{
    using EntityService;
    using Model.Entity;
    using System.Collections.Generic;

    public interface IBillInfoService : IEntityService<BillInfo>
    {
        IList<BillInfo> GetBills();
        BillInfo Get(long id);
        void Delete(long id);
    }
}
