namespace Ng.Contact.Repository.BillInfo
{
    using Core;
    using Model.Entity;
    using System.Collections.Generic;

    public interface IBillInfoRepository : IGenericRepository<BillInfo>
    {
       IList<BillInfo> GetBills();
        BillInfo Get(long id);
    }
}
