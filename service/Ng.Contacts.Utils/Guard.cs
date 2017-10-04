namespace Ng.Contacts.Utils
{
    public class Guard
    {
        public static void IsNotNullOrZero(long? value)
        {
            if (value == null || value == 0)
            {
                throw new System.ArgumentNullException();
            }
        }

        public static void IsNotNull(object value)
        {
            if (value == null)
            {
                throw new System.ArgumentNullException();
            }
        }
    }
}
