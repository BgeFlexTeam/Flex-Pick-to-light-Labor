using Microsoft.AspNetCore.Mvc;
using FlexPTLBGEWeb.Models;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using Microsoft.Extensions.Configuration;

//namespace FlexPTLBGEWeb.Controllers


[Route("api")]
public class PartController : Controller
{
    public IDbConnection Connection { get; }
    private bool disposedValue = false; // To detect redundant calls
    public static IConfigurationRoot Configuration { get; private set; }
    private string connectionString;

    public PartController(IConfigurationRoot config)
    {
        // Connection = new SqlConnection("data source=ZALNT254;initial catalog=PTLBGE;persist security info=True;user id=web;password=connect!;App=FlexPTLBGEWeb");
        //Connection.Open();
      
         connectionString = Configuration.GetConnectionString("DefaultConnection");
    }
    
    [HttpPost("Part/GetProducts")]
   // public Part GetProducts([FromBody] string partNumber)
    public Part GetProducts()
    {       
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();
            // DynamicParameters parameters = new DynamicParameters();       
            // parameters.Add("@PartNumber", partNumber);
			Part result = connection.QueryFirst<Part>("SELECT PartName FROM ffPart WITH(NOLOCK) WHERE PartFamilyID = 3) ORDER BY ID");
			return result;
        }        
    }


    protected virtual void Dispose(bool disposing)
    {
        if (!disposedValue)
        {
            if (disposing)
            {
                if (Connection != null)
                {
                    Connection.Dispose();
                }
            }

            disposedValue = true;
        }
    }

    public void Dispose()
    {
        Dispose(true);
    }

}
