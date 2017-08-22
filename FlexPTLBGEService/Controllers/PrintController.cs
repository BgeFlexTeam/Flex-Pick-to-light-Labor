using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Diagnostics;
using FlexPTLBGEService.Helpers;
using FlexPTLBGEService.Models;

namespace FlexPTLBGEService.Controllers
{
    public class PrintController : Controller
    {
        //public CustomActionResult Post([FromBody]PrintJob printJob)
        //because of cors (application/x-www-form-urlencoded;charset=UTF-8)
        [HttpPost]
        public void Print(PrintJob printJob)
        {
            RawPrinterHelper.SendStringToPrinter(printJob.printerName, printJob.labelContent);
        }
    }
}
