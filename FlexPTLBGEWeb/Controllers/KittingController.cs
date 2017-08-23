using Microsoft.AspNetCore.Mvc;
using FlexPTLBGEWeb.Models;
using System.Data;
using System.Data.SqlClient;
using System;
using System.Linq;
using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System.Collections.Generic;

namespace FlexPTLBGEWeb.Controllers
{
    public class KittingController : Controller
    {
        public IDbConnection Connection { get; }
        private readonly AppOptions options;
        private string connectionString;

        public KittingController(IOptions<AppOptions> options)
        {
            // Connection = new SqlConnection("data source=ZALNT254;initial catalog=PTLBGE;persist security info=True;user id=web;password=connect!;App=FlexPTLBGEWeb");
            //Connection.Open();
            this.options = options.Value;
            connectionString = this.options.DefaultConnection;
        }      

        [HttpPost]      
        public List<Part> GetBoms([FromBody] Product p)
        {
            try{
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    DynamicParameters parameters = new DynamicParameters();       
                    parameters.Add("@SerialNumber", p.SerialNumber);
                    List<Part> result = connection.Query<Part>("SELECT p.* FROM Product pr INNER JOIN BOM b ON pr.PartID = b.ParentID INNER JOIN Part p ON p.ID = b.PartID WHERE pr.SerialNumber = @SerialNumber order by b.AssemblyOrder", parameters).ToList();
                    return result;
                }
            }catch(Exception e){
              System.Console.WriteLine(e);
                return new List<Part>();

            }
        }
        
        [HttpPost]      
        public bool InsertToPTL([FromBody] Part p)
        { 
            //-- Test:		EXEC ptlAddRequest 'FlexFlow', '<ptl><application><name>FlexFlow</name><version>2.9.3.100</version></application><signal>PICK</signal><signalref>N/A</signalref><request><rpos>1</rpos><line>X86-ASSY01</line><zone>X86A01</zone><uniqid>S40017W</uniqid><description>SYS100782</description><data><item>LGH-0000000FW856</item><qty>4</qty></data><data><item>LGH-0000000KG396</item><qty>2</qty></data></request></ptl>'
            try{
                string sql = "dbo.ptlAddRequest";
                string xml_param="<ptl><application><name>PTLBGE</name><version>1.0</version></application><signal>PICK</signal><signalref>N/A</signalref>";
                xml_param+="<request><rpos>1</rpos><line>Line1</line><zone>Zone1</zone><uniqid>1</uniqid><description>-</description>";
                xml_param+="<data><item>"+p.PartName+"</item><qty>4</qty></data></request></ptl>";
                var param = new DynamicParameters();
                param.Add("@Request", xml_param);

               
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    var affectedRows = connection.Execute(sql, param, commandType: CommandType.StoredProcedure);
                    return affectedRows>0;                    
                }
            }catch(Exception e){
                System.Console.WriteLine(e.Message);
                return false;
            }
        }
    }
}