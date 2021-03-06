﻿namespace Ng.Contact.Repository.BillInfo
{
    using Core;
    using Model.Entity;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;

    public class BillInfoRepository : GenericRepository<BillInfo>, IBillInfoRepository
    {
        public BillInfoRepository(DbContext context)
            : base(context)
        {
        }

        public BillInfo Get(long id)
        {
            var billInfo = FindBy(u => u.Id == id).FirstOrDefault();
            return billInfo;
        }

        public IList<BillInfo> GetBills()
        {
            var billInfos = GetAll().Include(u=>u.SalesOrders).ToList();
            return billInfos;
        }
    }
}
