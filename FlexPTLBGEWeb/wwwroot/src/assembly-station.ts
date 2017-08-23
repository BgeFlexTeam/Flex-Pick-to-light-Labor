/// <reference path="polymer.d.ts" />
/// <reference path="polymer2-ts.ts" />

@customElement("assembly-station")
class AssemblyStation extends Polymer.Element {
    @property()
    prod: Project.Product = null;
    @property()
    part: Project.Part = null;

    connectedCallback(): void {
        super.connectedCallback();
        this.$.productSNInputBox.focus();
        this.$.productSNInputBox.focused = true;
        this.$.assyProgress.value = 0;
    }

    async _txtPartKeypress(e: any): Promise<void> {
        if (e.key === "Enter") { this.readPartTap(); }
    }
    async _txtProdKeypress(e: any): Promise<void> {
        if (e.key === "Enter") { this.readBOMTap(); }
    }

    async readBOMTap(): Promise<any> {
        this.$.snlabel.innerText = "";
        let myproduct: Project.Product = await this.readProduct();
        if (myproduct != null) {
            let mynextpart: Project.Part = await this.readNextPart();
            if (mynextpart != null) {
                this.$.nextpartlabel.innerText = "Read the code of " + mynextpart.partName + " part!";
                this.$.partInputBox.value = "";
                this.$.partInputBox.focused = true;
                this.$.partInputBox.focus();
            } else {
                this.$.nextpartlabel.innerText = "BOM is complete.";
                this.$.productSNInputBox.focus();
                this.$.productSNInputBox.focused = true;
            }
        } else {
            this.$.productSNInputBox.focus();
            this.$.productSNInputBox.focused = true;
            this.$.snlabel.innerText = "Invalid SerialNumber!";
        }
    }

    async readPartTap(): Promise<any> {
        try {
            this.$.partlabel.innerText = "";
            if (this.part == null) {
                this.$.partlabel.innerText = "Read the SerialNumber first!";
                this.$.partInputBox.value = "";
                this.$.productSNInputBox.focus();
                this.$.productSNInputBox.focused = true;
                return null;
            }
            if (this.$.partInputBox.value !== this.part.code) {
                this.$.partlabel.innerText = "Partcode is wrong!";
                this.$.partInputBox.value = "";
                this.$.partInputBox.focused = true;
                this.$.partInputBox.focus();
            } else {
                if (this.prod != null && this.part != null) {
                    let param: Project.AssemblyData = new Project.AssemblyData();
                    param.code = this.part.code;
                    param.partName = this.part.partName;
                    param.serialNumber = this.prod.serialNumber;
                    let response: any = await Project.Fetch.Post(`/api/Assembly/assemblyPart`, param);
                    if (response) {
                        this.readBOMTap();
                    }
                } else {
                    return null;
                }
            }
        } catch (error) {
            return null;
        }
    }

    async readProduct(): Promise<Project.Product> {
        try {
            let p: Project.Product = new Project.Product();
            p.serialNumber = this.$.productSNInputBox.value;
            if (p.serialNumber != null && p.serialNumber.length > 0) {
                this.prod = await Project.Fetch.Post(`/api/Product/getProductBySN`, p);
                let mainpart : Project.Part = await Project.Fetch.Post(`/api/Product/getImageUrlBySN`, p);
                if(mainpart!=null) {this.$.productimage.src ="./img/"+mainpart.partName+".png";} else {this.$.productimage.src ="";}
                return this.prod;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }
    async readNextPart(): Promise<Project.Part> {
        try {
            if (this.$.productSNInputBox.value.length > 0) {
                let myprogress: number = await Project.Fetch.Post(`/api/Assembly/getProgress`, this.prod);
                this.$.assyProgress.value = myprogress;
                let nextpart: Project.Part = await Project.Fetch.Post(`/api/Assembly/getNextBom`, this.prod);
                this.part = nextpart;
                return nextpart;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

}