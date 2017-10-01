namespace eBillingApi.Models
{
    using System;
    public class Product: BaseEntity
    {
        public int UnitId { get; set; }
        public int CompanyId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public decimal Mrp { get; set; }
        public decimal Price { get; set; }
        public decimal RetailerPrice { get; set; }
        public decimal Quantity { get; set; }
        public decimal Stock { get; set; }
        public decimal Cgst { get; set; }
        public decimal Sgst { get; set; }
        public decimal Vat { get; set; }
        public DateTime ManufacturedDate { get; set; }
        public DateTime ExpiredDate { get; set; }
        public short Status { get; set; }
        public virtual Unit Unit { get; set; }
        public virtual Company Company { get; set; }
    }
}