
using System;
using Dapper.Contrib.Extensions;

namespace FlexPTLBGEWeb.Models {
	[Table ("Product")]
	public class Product {		
		public int ID { get; set; }
		public string SerialNumber { get; set; }			
		public int PartID { get; set; }		
		public DateTime CreationTime {get;set;}      
	}
}
