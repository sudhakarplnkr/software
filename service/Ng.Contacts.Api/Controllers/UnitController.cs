namespace Ng.Contact.Api.Controllers
{
    using Contacts.Utils;
    using Model.Entity;
    using Service.Unit;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;
    public class UnitController : ApiController
    {
        private readonly IUnitService unitService;

        public UnitController(IUnitService unitService)
        {
            this.unitService = unitService;
        }

        [HttpGet]
        public IEnumerable<Unit> Get()
        {
            Seeds();
            var units = this.unitService.GetAll().ToList();
            return units;
        }

        [HttpGet]
        public Unit Get(long id)
        {
            Guard.IsNotNullOrZero(id);

            var units = this.unitService.Get(id);
            return units;
        }

        [HttpPost]
        public void Post(Unit unit)
        {
            Guard.IsNotNull(unit);
            this.unitService.Create(unit);
        }

        [HttpPut]
        public void Put(Unit unit)
        {
            Guard.IsNotNull(unit);
            this.unitService.Update(unit);
        }

        [HttpDelete]
        public void Delete(long id)
        {
            Guard.IsNotNull(id);
            this.unitService.Delete(id);
        }

        private void Seeds()
        {
            if (!this.unitService.GetAll().Any())
            {
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
                },
                new Unit {
                    Code="ML",
                    Description="MILLI"

                },
                new Unit {
                    Code="LTR",
                    Description="LITTER"
                },
                new Unit {
                    Code="KG",
                    Description="KILO GRAM"

                },
                new Unit {
                    Code="G",
                    Description="GRAM"
                },
                new Unit {
                    Code="PIECE",
                    Description="PIECE"

                }
            };
                units.ForEach(u =>
                {
                    this.unitService.Create(u);
                });
            }            
        }
    }
}