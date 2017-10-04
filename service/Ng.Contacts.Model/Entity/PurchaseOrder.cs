namespace Ng.Contact.Model.Entity
{
    using Core;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("PurchaseOrder")]
    public class PurchaseOrder : AuditableEntity<long>
    {
        public decimal PerUnitPrice { get; set; }
        public decimal SalesPrice { get; set; }
        public decimal ReSalesPrice { get; set; }
        public decimal OpeningStock { get; set; }
        public decimal ClosingStock { get; set; }
        public decimal CurrentStock { get; set; }
        public decimal Cgst { get; set; }
        public decimal Sgst { get; set; }
        public long ProductId { get; set; }
        public long CompanyId { get; set; }
        public long UnitId { get; set; }
        public bool IsActive { get; set; }
        public virtual Company Company { get; set; }
        public virtual Product Product { get; set; }
        public virtual Unit Unit { get; set; }
    }
}
