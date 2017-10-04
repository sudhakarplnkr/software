namespace Ng.Contact.Model.Entity
{
    using Core;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("UnitSubUnit")]
    public class UnitSubUnit : Entity<long>
    {
        public long UnitId { get; set; }
        public long SubUnitId { get; set; }
        public virtual Unit Unit { get; set; }
        public virtual ICollection<Product> Products { get; set; }
        public virtual ICollection<PurchaseOrder> PurchaseOrders { get; set; }
    }
}
