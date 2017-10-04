namespace Ng.Contact.Model.Entity
{
    using Core;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Person")]
    public class Person : AuditableEntity<long>
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string State { get; set; }
        public int CountryId { get; set; }
        public virtual Country Country { get; set; }
    }
}
