namespace eBilling.Api.Host
{
    using System;
    using System.ServiceProcess;
    using Microsoft.Owin.Hosting;
    public partial class eBillingHost : ServiceBase
    {
        public string baseAddress = "http://localhost:9000/";
        private IDisposable _server = null;
        
        public eBillingHost()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            _server = WebApp.Start<Startup>(url: baseAddress);
        }

        protected override void OnStop()
        {
            if(_server != null)
            {
                _server.Dispose();
            }
            base.OnStop();
        }
    }
}
