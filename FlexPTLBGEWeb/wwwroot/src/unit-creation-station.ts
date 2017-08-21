/// <reference path="polymer.d.ts" />
/// <reference path="polymer2-ts.ts" />

@customElement("unit-creation-station")
class UnitCreationStation extends Polymer.Element {

    @property()
    productName: string;

    @property()
    serialNumber: string;

    connectedCallback(): void {
        super.connectedCallback();
        this.$.productSelector.focus();
        this.$.productSelector.focused = true;

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

    async createSNTap(): Promise<void> {
        try {
            let response : any = await Project.Fetch.Post(`/api/Part/createSN`, this.$.productSelector.selectedItem);
        } catch (error) {
            console.log(error);
        }
    }
}
