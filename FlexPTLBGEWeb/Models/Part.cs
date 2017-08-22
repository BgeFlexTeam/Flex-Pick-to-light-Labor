using System;
using Dapper.Contrib.Extensions;

namespace FlexPTLBGEWeb.Models {
	[Table ("Part")]
	public class Part {
		[Key]
		public int ID { get; set; }
		public string PartName { get; set; }
        public int? PartFamilyID { get; set; }
		public string PTLLocation { get; set; }		
		public int? Count { get; set; }
		
		/*public virtual PartFamily PartFamily { get; set; }*/	
	}
}
