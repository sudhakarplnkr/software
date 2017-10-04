namespace Ng.Contact.Model.Entity
{
    using Core;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Company")]
    public class Company : AuditableEntity<long>
    {
        public string Name { get; set; }
        public long? Mobile { get; set; }
        public decimal? Balance { get; set; }
        public string Phone { get; set; }
        public long? AadharNumber { get; set; }
        public string TinNumber { get; set; }
        public string GstNumber { get; set; }
        public string PanNumber { get; set; }
        public string Address { get; set; }
        public ICollection<PurchaseOrder> PurchaseOrders { get; set; }
    }
}
