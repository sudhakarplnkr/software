namespace Ng.Contact.Model.Core
{
    public abstract class Entity<T> : IEntity<T>
    {
        public virtual T Id { get; set; }
    }
}
