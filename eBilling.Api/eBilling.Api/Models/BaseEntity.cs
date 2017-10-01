namespace eBillingApi.Models
{
    using MongoDB.Bson.Serialization.Attributes;
    using System;

    public class BaseEntity: IEntity<int>
    {
        [BsonId]
        public int _id { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }       
    }
}
