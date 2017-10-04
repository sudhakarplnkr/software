namespace Ng.Contact.Model.Context
{
    using Core;
    using Entity;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.ModelConfiguration.Conventions;
    using System.Linq;
    using System.Threading;

    public class NgContactContext : DbContext, INgContactContext
    {
        public NgContactContext()
            : base("Name=NgContactContext")
        {
            this.Configuration.LazyLoadingEnabled = true;
            Database.SetInitializer(new CreateDatabaseIfNotExists<NgContactContext>());
            Database.SetInitializer(new Seeds());
            //Database.SetInitializer(new DropCreateDatabaseIfModelChanges<NgContactContext>());
            //Database.SetInitializer<SchoolDBContext>(new DropCreateDatabaseAlways<SchoolDBContext>());
            //Database.SetInitializer<SchoolDBContext>(new SchoolDBInitializer());
        }

        public virtual IDbSet<Unit> Units { get; set; }
        public virtual IDbSet<Company> Companeis { get; set; }
        public virtual IDbSet<Product> Products { get; set; }
        public virtual IDbSet<PurchaseOrder> PurchaseOrders { get; set; }
        public virtual IDbSet<BillInfo> BillInfos { get; set; }
        public virtual IDbSet<SalesOrder> SalesOrders { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            // configures one-to-many relationship
            modelBuilder.Entity<Unit>()
              .HasMany(g => g.Products)
              .WithMany(g => g.Units);

            modelBuilder.Entity<BillInfo>()
              .HasMany(g => g.SalesOrders)
              .WithRequired(g => g.BillInfo);

            modelBuilder.Entity<Unit>()
              .HasMany(g => g.PurchaseOrders)
              .WithRequired(g => g.Unit);

            modelBuilder.Entity<PurchaseOrder>().HasRequired<Company>(s => s.Company)
                .WithMany(g => g.PurchaseOrders).HasForeignKey<long>(s => s.CompanyId);

            modelBuilder.Entity<PurchaseOrder>().HasRequired<Product>(s => s.Product)
             .WithMany(s => s.PurchaseOrders).HasForeignKey<long>(s => s.ProductId);

            modelBuilder.Entity<Product>().HasMany<Unit>(s => s.Units)
                .WithMany(c => c.Products);
        }

        public override int SaveChanges()
        {
            AuditEntity();
            return base.SaveChanges();
        }

        private void AuditEntity()
        {
            var modifiedEntries = ChangeTracker.Entries()
                .Where(x => x.Entity is IAuditableEntity
                    && (x.State == EntityState.Added || x.State == EntityState.Modified));

            foreach (var entry in modifiedEntries)
            {
                IAuditableEntity entity = entry.Entity as IAuditableEntity;
                if (entity != null)
                {
                    string identityName = Thread.CurrentPrincipal.Identity.Name;
                    var now = DateTime.UtcNow;

                    if (entry.State == EntityState.Added)
                    {
                        entity.CreatedBy = identityName;
                        entity.CreatedDate = now;
                    }
                    else
                    {
                        base.Entry(entity).Property(x => x.CreatedBy).IsModified = false;
                        base.Entry(entity).Property(x => x.CreatedDate).IsModified = false;
                    }

                    entity.UpdatedBy = identityName;
                    entity.UpdatedDate = now;
                }
            }
        }
    }
}