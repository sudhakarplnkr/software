namespace Ng.Contact.Model.Entity
{
    using Core;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("BillInfo")]
    public class BillInfo : AuditableEntity<long>
    {
        public long BillCode { get; set; }
        public decimal? Balance { get; set; }
        public long? CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public long? Aadhar { get; set; }
        public string GstNumber { get; set; }
        public string PanNumber { get; set; }
        public string TinNumber { get; set; }
        public string Phone { get; set; }
        public long? Mobile { get; set; }
        public decimal TwoHalfCgst { get; set; }
        public decimal TwoHalfSgst { get; set; }
        public decimal SixCgst { get; set; }
        public decimal SixSgst { get; set; }
        public decimal NineCgst { get; set; }
        public decimal NineSgst { get; set; }
        public decimal FourteenCgst { get; set; }
        public decimal FourteenSgst { get; set; }
        public decimal Total { get; set; }
        public virtual ICollection<SalesOrder> SalesOrders { get; set; }
    }
}
