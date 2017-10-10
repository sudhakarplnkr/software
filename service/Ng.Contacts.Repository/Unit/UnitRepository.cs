namespace Ng.Contact.Repository.Unit
{
    using Core;
    using Model.Entity;
    using System.Data.Entity;
    using System.Linq;

    public class UnitRepository : GenericRepository<Unit>, IUnitRepository
    {
        public UnitRepository(DbContext context)
            : base(context)
        {
        }

        public Unit Get(long id)
        {
            var unit = FindBy(u => u.Id == id).FirstOrDefault();
            return unit;
        }

        public bool IsExist(long id, string code)
        {
            var isExist = FindBy(u => u.Id !=id && u.Code == code).Any();
            return isExist;
        }
    }
}
