namespace Ng.Contact.Repository.BillInfo
{
    using Core;
    using Model.Entity;

    public interface IBillInfoRepository : IGenericRepository<BillInfo>
    {
        BillInfo Get(long id);
    }
}
