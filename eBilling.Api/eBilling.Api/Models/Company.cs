namespace eBillingApi.Models
{
    public class Company: BaseEntity
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public long AadharNumber { get; set; }
        public string TinNumber { get; set; }
        public string GstNumber { get; set; }
    }
}
