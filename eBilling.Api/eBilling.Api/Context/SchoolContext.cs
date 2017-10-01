namespace eBilling.Api.Context
{
    using Models;
    using System.Data.Entity;
    public class SchoolContext : DbContext
    {
        public SchoolContext() : base("name=eBillingConnection")
        {
            //Database.SetInitializer(new CreateDatabaseIfNotExists<SchoolContext>());

            //Database.SetInitializer(new DropCreateDatabaseIfModelChanges<SchoolContext>());
            //Database.SetInitializer(new DropCreateDatabaseAlways<SchoolContext>());
            //Database.SetInitializer(new SchoolDBInitializer());
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Standard> Standards { get; set; }

    }
}
