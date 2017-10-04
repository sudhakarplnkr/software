namespace Ng.Contact.Model.Entity
{
    using Core;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Country")]
    public class Country : Entity<int>
    {
        public string Name { get; set; }

        public virtual IEnumerable<Person> Persons { get; set; }
    }
}