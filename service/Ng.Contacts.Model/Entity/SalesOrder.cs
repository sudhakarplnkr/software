namespace Ng.Contact.Model.Entity
{
    using Core;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("SalesOrder")]
    public class SalesOrder : AuditableEntity<long>
    {
        public decimal PerUnitPrice { get; set; }
        public long ProductId { get; set; }
        public string ProductDescription { get; set; }
        public long CompanyId { get; set; }
        public string CompanyName { get; set; }
        public long UnitId { get; set; }
        public string UnitCode { get; set; }
        public decimal CurrentStock { get; set; }
        public decimal TaxableAmout { get; set; }
        public decimal Quantity { get; set; }
        public decimal Cgst { get; set; }
        public decimal CgstAmount { get; set; }
        public decimal Sgst { get; set; }
        public decimal SgstAmount { get; set; }
        public decimal Amount { get; set; }
        public virtual BillInfo BillInfo { get; set; }
    }
}
