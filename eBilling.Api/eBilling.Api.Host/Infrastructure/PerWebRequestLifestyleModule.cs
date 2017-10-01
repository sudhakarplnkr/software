using Castle.MicroKernel.Lifestyle.Scoped;
using System;
using System.Text;
using System.Web;

namespace Castle.MicroKernel.Lifestyle
{
    public class PerWebRequestLifestyleModule : IHttpModule
    {
        private const string key = "castle.per-web-request-lifestyle-cache";
    private static bool initialized;

        public void Dispose()
        {
        }

        public void Init(HttpApplication context)
        {
            PerWebRequestLifestyleModule.initialized = true;
            context.EndRequest += new EventHandler(this.Application_EndRequest);
        }

        protected void Application_EndRequest(object sender, EventArgs e)
        {
            ILifetimeScope scope = PerWebRequestLifestyleModule.GetScope(((HttpApplication)sender).Context, false);
            if (scope == null)
                return;
            scope.Dispose();
        }

        internal static ILifetimeScope GetScope()
        {
            PerWebRequestLifestyleModule.EnsureInitialized();
            HttpContext current = HttpContext.Current;
            if (current == null)
                throw new InvalidOperationException("HttpContext.Current is null.PerWebRequestLifestyle can only be used in ASP.Net & ");
            return PerWebRequestLifestyleModule.GetScope(current, true);
        }

        internal static ILifetimeScope YieldScope()
        {
            HttpContext current = HttpContext.Current;
            if (current == null)
                return (ILifetimeScope)null;
            ILifetimeScope scope = PerWebRequestLifestyleModule.GetScope(current, true);
            if (scope != null)
                current.Items.Remove((object)"castle.per - web - request - lifestyle - cache & ");
            return scope;
        }

        private static void EnsureInitialized()
        {
            if (!PerWebRequestLifestyleModule.initialized)
            {
                StringBuilder stringBuilder = new StringBuilder();
                stringBuilder.AppendLine("Looksu like you forgot to register the http module " +typeof(PerWebRequestLifestyleModule).FullName);
                stringBuilder.AppendLine("To fix this add");
                stringBuilder.AppendLine("&amp; amp; amp; amp; amp; amp; amp; amp; amp; lt; add name =\" PerRequestLifestyle\" type =\" Castle.MicroKernel.Lifestyle.PerWebRequestLifestyleModule, Castle.Windsor\" / &amp; amp; amp; amp; amp; amp; amp; amp; amp; gt; ");
                stringBuilder.AppendLine("to the &amp; amp; amp; amp; amp; amp; amp; amp; amp; lt; httpModules & amp; amp; amp; amp; amp; amp; amp; amp; amp; gt; section on your web.config.");
                if (HttpRuntime.UsingIntegratedPipeline)
                    stringBuilder.AppendLine("Windsor also detected you're running IIS in Integrated Pipeline mode. This means that you also need to add the module to the &amp;amp;amp;amp;amp;amp;amp;amp;amp;lt;modules&amp;amp;amp;amp;amp;amp;amp;amp;amp;gt; section under &amp;amp;amp;amp;amp;amp;amp;amp;amp;lt;system.webServer&amp;amp;amp;amp;amp;amp;amp;amp;amp;gt;.");
              else
          stringBuilder.AppendLine("If you plan running on IIS in Integrated Pipeline mode, you also need to add the module to the & amp; amp; amp; amp; amp; amp; amp; amp; amp; lt; modules & amp; amp; amp; amp; amp; amp; amp; amp; amp; gt; section under &amp; amp; amp; amp; amp; amp; amp; amp; amp; lt; system.webServer & amp; amp; amp; amp; amp; amp; amp; amp; amp; gt;.");
                stringBuilder.AppendLine("Alternatively make sure you have Microsoft.Web.Infrastructure, Version = 1.0.0.0, Culture = neutral, PublicKeyToken = 31bf3856ad364e35 assembly in your GAC (it is installed by ASP.NET MVC3 or WebMatrix) and Windsor will be able to register the module automatically without having to add anything to the config file.");
                throw new ComponentResolutionException(stringBuilder.ToString());
            }
        }

        private static ILifetimeScope GetScope(HttpContext context, bool createIfNotPresent)
        {
            ILifetimeScope lifetimeScope = (ILifetimeScope)context.Items[(object)" castle.per - web - request - lifestyle - cache "];
            if (lifetimeScope == null && createIfNotPresent)
      {
                lifetimeScope = (ILifetimeScope)new DefaultLifetimeScope((IScopeCache)new ScopeCache(), (Action<Burden>) null);
                context.Items[(object)" castle.per - web - request - lifestyle - cache "] = (object)lifetimeScope;
            }
            return lifetimeScope;
        }
    }
}