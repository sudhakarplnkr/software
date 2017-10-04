using Ng.Contact.Model.Entity;
using System.Collections.Generic;
using System.Data.Entity;

namespace Ng.Contact.Model.Context
{
    public class Seeds : CreateDatabaseIfNotExists<NgContactContext>
    {
        public override void InitializeDatabase(NgContactContext context)
        {
            base.InitializeDatabase(context);
        }

        protected override void Seed(NgContactContext context)
        {
            if (context.Units.CountAsync().Result > 0)
            {
                return;
            }

            var units = new List<Unit>
            {
                new Unit {
                    Code="TIN",
                    Description="TIN"
                },
                new Unit {
                    Code="BAG",
                    Description="BAG"
                },
                new Unit {
                    Code="MUTTAI",
                    Description="MUTTAI"
                },
                new Unit {
                    Code="BOX",
                    Description="BOX"
                }               
            };
            
            context.Set<Unit>().AddRange(units);
            context.SaveChanges();
        }
    }
}
