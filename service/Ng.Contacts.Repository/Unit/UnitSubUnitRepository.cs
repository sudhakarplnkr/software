namespace Ng.Contact.Repository.Unit
{
    using Core;
    using Model.Entity;
    using System.Data.Entity;

    public class UnitSubUnitRepository : GenericRepository<UnitSubUnit>, IUnitSubUnitRepository
    {
        public UnitSubUnitRepository(DbContext context)
            : base(context)
        {
        }
    }
}
