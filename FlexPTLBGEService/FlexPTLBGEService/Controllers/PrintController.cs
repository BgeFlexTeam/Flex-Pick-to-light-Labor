using FlexPTLBGEService.Helpers;
using FlexPTLBGEService.Models;
using System.Web.Http;

namespace FlexPTLBGEService.Controllers
{
    public class PrintController : ApiController
    {
        public string Get()
        {
            return "Print service is running.";
        }

        public void Post(PrintJob printJob)
        {
            RawPrinterHelper.SendStringToPrinter(printJob.printerName, printJob.labelContent);
        }
    }
}
