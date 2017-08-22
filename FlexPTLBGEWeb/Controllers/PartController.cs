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
    public class PartController : Controller
    {
        public IDbConnection Connection { get; }
        private readonly AppOptions options;
        private string connectionString;

        public PartController(IOptions<AppOptions> options)
        {
            // Connection = new SqlConnection("data source=ZALNT254;initial catalog=PTLBGE;persist security info=True;user id=web;password=connect!;App=FlexPTLBGEWeb");
            //Connection.Open();
            this.options = options.Value;
            connectionString = this.options.DefaultConnection;
        }

        [HttpPost]
        // public Part GetProducts([FromBody] string partNumber)
        public List<Part> GetProducts()
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                // DynamicParameters parameters = new DynamicParameters();       
                // parameters.Add("@PartNumber", partNumber);
                List<Part> result = connection.Query<Part>("SELECT * FROM Part WHERE PTLLocation IS NULL").ToList();
                return result;
            }
        }
         [HttpPost]
        public Part createSN([FromBody]Part p){
            using (SqlConnection connection = new SqlConnection(connectionString)) {
            connection.Open();
             string sqlQuery = "INSERT INTO Product VALUES (@sn,@i,@d)";
             sqlConnection.Execute(sqlQuery,    new {'asd', 5, '2017-05-01'});
            }
        }
    }
}