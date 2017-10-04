namespace Ng.Contacts.Contracts
{
    public class PersonViewModel
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string State { get; set; }
        public int CountryId { get; set; }
        public CountryViewModel Country { get; set; }
    }
}
