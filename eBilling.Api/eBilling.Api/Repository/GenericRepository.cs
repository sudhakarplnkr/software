namespace eBillingApi.Repository
{
    using MongoDB.Driver;
    using MongoDB.Driver.Builders;
    using System;
    using System.Collections.Generic;

    public class GenericRepository<T> where T : new()
    {
        MongoClient _client;
        MongoServer _server;
        MongoDatabase _db;

        public GenericRepository()
        {
            _client = new MongoClient("mongodb://localhost:27017");
            _server = _client.GetServer();
            _db = _server.GetDatabase("eBilling");
        }

        public string EntityName => typeof(T).Name;
        public string UserName => System.Security.Principal.WindowsIdentity.GetCurrent().Name;

        private const string Id = "_id";
        private const string CreatedBy = "CreatedBy";
        private const string CreatedAt = "CreatedAt";
        private const string ModifiedBy = "ModifiedBy";
        private const string ModifiedAt = "ModifiedAt";
        

        public IEnumerable<T> Get()
        {
            return _db.GetCollection<T>(EntityName).FindAll();
        }

        public T Get(int id)
        {
            return _db.GetCollection<T>(EntityName).FindOne(Query.EQ(Id, id));
        }

        public void Create(T entity)
        {
            entity.GetType().GetProperty(CreatedBy).SetValue(entity, UserName);
            entity.GetType().GetProperty(CreatedAt).SetValue(entity, DateTime.Now);
            _db.GetCollection<T>(EntityName).Save(entity);
        }

        public void Update(int id, T entity)
        {
            entity.GetType().GetProperty(Id).SetValue(entity, id);
            entity.GetType().GetProperty(ModifiedBy).SetValue(entity, UserName);
            entity.GetType().GetProperty(ModifiedAt).SetValue(entity, DateTime.Now);
            var operation = Update<T>.Replace(entity);
            _db.GetCollection<T>(EntityName).Update(Query.EQ(Id, id), operation);
        }

        public void Remove(int id)
        {
            _db.GetCollection<T>(EntityName).Remove(Query.EQ(Id, id));
        }

    }
}