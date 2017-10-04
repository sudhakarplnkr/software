namespace Ng.Contact.Model.Context
{
    using Entity;
    using System.Data.Entity;

    public interface INgContactContext
    {
        IDbSet<Unit> Units { get; set; }
        IDbSet<Company> Companeis { get; set; }
        IDbSet<Product> Products { get; set; }
        IDbSet<PurchaseOrder> PurchaseOrders { get; set; }
        int SaveChanges();
    }
}