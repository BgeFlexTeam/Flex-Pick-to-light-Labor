
namespace FlexPTLBGEWeb.Models {
	public class Part {
		public int Id { get; set; }
		public string PartName { get; set; }
        public int? PartFamilyID { get; set; }
		public string PTLLocation { get; set; }		
		public int? Count { get; set; }
		
		public virtual PartFamily PartFamily { get; set; }	
	}
}
