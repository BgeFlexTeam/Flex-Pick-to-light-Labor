/// <reference path="polymer.d.ts" />
/// <reference path="polymer2-ts.ts" />

@customElement("unit-creation-station")
class UnitCreationStation extends Polymer.Element {

    // @property()
    // productName: string;

    // @property()
    // serialNumber: string;

    connectedCallback(): void {
        super.connectedCallback();
        this.$.productSelector.focus();
        this.$.productSelector.focused = true;
        this.$.responselabel.innerText ="";
        this.$.productSelector.selectedItem=null;
        this.loadProducts();
    }

    public async loadProducts(): Promise<void> {
        try {
            let list: Array<number> = await Project.Fetch.Post(`/api/Part/GetProducts`);
            this.$.productSelector.items = list;
        } catch (error) {
            console.log(error);
        }
    }

    async createSNTap(): Promise<any> {
        let myproduct: Project.Product = await this.createSN();
        if (myproduct != null) {
            this.$.responselabel.innerText = "Generated SerialNumber is: " + myproduct.serialNumber;
            Project.Label.Print(myproduct.serialNumber);
        } else {
            this.$.responselabel.innerText = "SerialNumber is not generated.";
        }
    }

    async createSN(): Promise<Project.Product> {
        this.$.responselabel.innerText = "loading...";
        try {
            let x: Project.Part = this.$.productSelector.selectedItem;
            if (x != null) {
                let response: any = await Project.Fetch.Post(`/api/Part/createSN`, x);
                 return response;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }
}
