namespace Ng.Contact.Model.Core
{
    public interface IEntity<T>
    {
        T Id { get; set; }
    }
}
