namespace eBillingApi.Models
{
    public interface IEntity<TId>
    {
        TId _id { get; set; }
    }
}
