namespace Ng.Contact.Service.Unit
{
    using EntityService;
    using Model.Entity;
    using Repository.Unit;
    using Repository.UnitOfWork;

    public class UnitService : EntityService<Unit>, IUnitService
    {
        IUnitOfWork unitOfWork;
        IUnitRepository unitRepository;

        public UnitService(IUnitOfWork unitOfWork, IUnitRepository unitRepository)
            : base(unitOfWork, unitRepository)
        {
            this.unitOfWork = unitOfWork;
            this.unitRepository = unitRepository;
        }

        public Unit Get(long id)
        {
           var unit = this.unitRepository.Get(id);
            return unit;
        }

        public bool IsExist(long id, string code)
        {
            var isExist = this.unitRepository.IsExist(id, code);
            return isExist;
        }

        public void Delete(long id)
        {
            var unit = this.unitRepository.Get(id);
            this.unitRepository.Delete(unit);
            this.unitOfWork.Commit();
        }
    }
}