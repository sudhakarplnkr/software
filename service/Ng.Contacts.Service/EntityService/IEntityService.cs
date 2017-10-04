namespace Ng.Contact.Service.EntityService
{
    using System.Collections.Generic;
    public interface IEntityService<T>
    where T : class
    {
        void Create(T entity);
        void Delete(T entity);
        IEnumerable<T> GetAll();
        void Update(T entity);
    }
}
