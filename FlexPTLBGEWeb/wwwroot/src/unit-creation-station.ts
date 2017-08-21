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
            // const serialNumber = await Part.GetPart("partnumber01");

            await Project.Fetch.Post(`/api/Part/GetProducts`);

        } catch (error) {
            console.log(error);
        }
    }
}
