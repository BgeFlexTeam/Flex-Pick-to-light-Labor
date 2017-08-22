/// <reference path="polymer.d.ts" />
/// <reference path="polymer2-ts.ts" />

@customElement("pack-station")
class PackStation extends Polymer.Element {
    connectedCallback(): void {
        super.connectedCallback();
        this.$.finishSnInputBox.focus();
        this.$.finishSnInputBox.focused = true;
    }

    async packSNTap(): Promise<any> {
        let myproduct: Project.Product = await this.packSN();
        if (myproduct != null) {
            if (myproduct.isComplete === true) {
                this.$.finishlabel.innerText = "Pack is complete yet! (SN: " + myproduct.serialNumber + ")";
                this.$.finishSnInputBox.value = "";
            } else {
                this.$.finishlabel.innerText = "Pack is complete. (SN: " + myproduct.serialNumber + ")";
                this.$.finishSnInputBox.value = "";
            }
        } else {
            this.$.finishlabel.innerText = "Invalid SerialNumber, pack is uncomplete.";
        }
    }

    async packSN(): Promise<Project.Product> {
        this.$.finishlabel.innerText = "loading...";
        try {
            let p: Project.Product = new Project.Product();
            p.SerialNumber = this.$.finishSnInputBox.value;
            if (p.SerialNumber != null) {
                let response: any = await Project.Fetch.Post(`/api/Product/packSN`, p);
                return response;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }
}