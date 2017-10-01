namespace eBilling.Api.Models
{
using System;
    public class Student
    {
        public Student()
        {

        }
        public int StudentId { get; set; }
        public string StudentName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public byte[] Photo { get; set; }
        public decimal Height { get; set; }
        public float Weight { get; set; }
        public int StandardId { get; set; }
        public Standard Standard { get; set; }
    }

}
