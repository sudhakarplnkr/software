namespace Ng.Contact.Model.Entity
{
    using Core;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Product")]
    public class Product : Entity<long>
    {
        public string Code { get; set; }

        public string Description { get; set; }

        public string TamilName { get; set; }

        public virtual ICollection<Unit> Units { get; set; }

        public virtual ICollection<PurchaseOrder> PurchaseOrders { get; set; }
    }
}
