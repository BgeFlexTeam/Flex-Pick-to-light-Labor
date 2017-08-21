using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace FlexPTLBGEWeb
{
    public class Program
    {
         public static IConfigurationRoot Configuration { get; set; }
        public static void Main(string[] args)
        {
           // BuildWebHost(args).Run();
             var builder = new ConfigurationBuilder()
             .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

             Configuration = builder.Build();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)            
                .UseStartup<Startup>()
                .Build();
    }
}
