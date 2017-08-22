/// <reference path="polymer.d.ts" />
/// <reference path="polymer2-ts.ts" />

@customElement("assembly-station")
class AssemblyStation extends Polymer.Element {
     @property()
    prod: Project.Product = null;

     connectedCallback(): void {
        super.connectedCallback();
        this.$.productSNInputBox.focus();
        this.$.productSNInputBox.focused = true;
        this.$.assyProgress.value=0;
    }

    async _txtSerialNumberKeypress(e:any):Promise<void> {
        if (e.key === "Enter") { this.$.readPartTap.click(); }
    }

    async readBOMTap(): Promise<any> {
        let mynextpart: Project.Part = await this.readNextPart();

        if (mynextpart != null) {
                this.$.nextpartlabel.innerText = mynextpart.partName;
        } else {
            this.$.nextpartlabel.innerText = "BOM is complete.";
        }
    }

    async readPartTap(): Promise<any> {
        try {
            if (this.prod != null) {
                let response: any = await Project.Fetch.Post(`/api/Assembly/assemblyPart`, this.prod);
                if(response) {
                    this.readBOMTap();
                }
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    async readNextPart(): Promise<Project.Part> {
        try {
            let p: Project.Product = new Project.Product();
            p.serialNumber = this.$.productSNInputBox.value;
            if (p.serialNumber != null && p.serialNumber.length>0) {
                let myproduct: Project.Product = await Project.Fetch.Post(`/api/Product/getProductBySN`, p);
                let myprogress : number = await Project.Fetch.Post(`/api/Assembly/getProgress`, myproduct);
                this.$.assyProgress.value = myprogress;
                let nextpart : Project.Part = await Project.Fetch.Post(`/api/Assembly/getNextBom`, myproduct);
                this.prod = myproduct;
                return nextpart;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

}