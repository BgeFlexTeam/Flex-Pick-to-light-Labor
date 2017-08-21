
using System;

namespace FlexPTLBGEWeb.Models {
	public class Product {
		public int Id { get; set; }
		public string SerialNumber { get; set; }			
		public int PartID { get; set; }		
		public DateTime CreationTime {get;set;}

        public virtual Part Part { get; set; }
	}
}
