using Microsoft.AspNetCore.Mvc;
using FlexPTLBGEWeb.Models;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using Dapper.Contrib.Extensions;

 namespace FlexPTLBGEWeb.Controllers
{  
    public class ProductController : Controller{
        public IDbConnection Connection { get; }
        private readonly AppOptions options;
        private string connectionString;

        public ProductController(IOptions<AppOptions> options)
        {           
            this.options = options.Value;
            connectionString = this.options.DefaultConnection;
        }

         [HttpPost]       
        public Product packSN([FromBody] Product p)
        {
            if(p != null && p.SerialNumber.Length>0){
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    DynamicParameters parameters = new DynamicParameters();
                    string serialnumber = p.SerialNumber;
                    parameters.Add("@SerialNumber", serialnumber);
                    var sql = "SELECT * FROM Product WHERE SerialNumber = @SerialNumber";
                    Product myproduct = connection.QueryFirst<Product>(sql, parameters);
                    connection.Update(new Product() { ID = myproduct.ID, SerialNumber=myproduct.SerialNumber, PartID=myproduct.PartID, CreationTime=myproduct.CreationTime, IsComplete = true });   
                    return myproduct;   
                    //var myproduct = connection.Get<Product>(1);
                }
            }else{
                return null;
            }
        }
    }
}