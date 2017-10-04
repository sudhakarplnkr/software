namespace Ng.Contacts.Repository.Unit.Test
{
    using System.Data.Common;
    using System.Data.Entity;
    using Contact.Model.Entity;
    using System.Data.Entity.ModelConfiguration.Conventions;
    using System.Collections.Generic;
    using Effort.Provider;

    public class TestContext : DbContext
    {
        public TestContext()
            : base("Name=TestContext")
        {

        }
        public TestContext(bool enableLazyLoading, bool enableProxyCreation)
            : base("Name=TestContext")
        {
            Configuration.ProxyCreationEnabled = enableProxyCreation;
            Configuration.LazyLoadingEnabled = enableLazyLoading;
        }
        public TestContext(DbConnection connection)
            : base(connection, true)
        {
            Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<Person> Person { get; set; }
        public DbSet<Country> Country { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // Suppress code first model migration check          
            Database.SetInitializer(new AlwaysCreateInitializer());

            //modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            //modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();
            //modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            base.OnModelCreating(modelBuilder);
        }

        public void Seed(TestContext Context)
        {
            var persons = new List<Person>() {
             new Person { Id = 1, Name = "Test User1" },
             new Person { Id = 2, Name = "Test User2" },
             new Person { Id = 3, Name = "Test User3" }
            };
            Context.Person.AddRange(persons);
            Context.SaveChanges();
        }

        public class DropCreateIfChangeInitializer : DropCreateDatabaseIfModelChanges<TestContext>
        {
            protected override void Seed(TestContext context)
            {
                context.Seed(context);
                base.Seed(context);
            }
        }

        public class CreateInitializer : CreateDatabaseIfNotExists<TestContext>
        {
            protected override void Seed(TestContext context)
            {
                context.Seed(context);
                base.Seed(context);
            }
        }

        public class AlwaysCreateInitializer : DropCreateDatabaseAlways<TestContext>
        {
            protected override void Seed(TestContext context)
            {
                context.Seed(context);
                base.Seed(context);
            }
        }
    }
}