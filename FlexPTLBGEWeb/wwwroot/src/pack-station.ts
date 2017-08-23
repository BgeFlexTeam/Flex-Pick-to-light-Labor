/// <reference path="polymer.d.ts" />
/// <reference path="polymer2-ts.ts" />

@customElement("pack-station")
class PackStation extends Polymer.Element {
    connectedCallback(): void {
        super.connectedCallback();
        this.$.finishSnInputBox.value = "";
        this.$.finishlabel.innerText = "";
        this.$.finishSnInputBox.focus();
        this.$.finishSnInputBox.focused = true;
    }

    async _txtPackKeypress(e: any): Promise<void> {
        if (e.key === "Enter") { this.packSNTap(); }
    }

    async packSNTap(): Promise<any> {
        let myproduct: Project.Product = await this.packSN();
        if (myproduct != null) {
            if (myproduct.isComplete === true) {
                this.$.finishlabel.innerText = "Pack is complete yet! (SN: " + myproduct.serialNumber + ")";
                this.$.finishSnInputBox.value = "";
                this.$.finishSnInputBox.focus();
                this.$.finishSnInputBox.focused = true;
            } else {
                this.$.finishlabel.innerText = "Pack is complete. (SN: " + myproduct.serialNumber + ")";
                this.$.finishSnInputBox.value = "";
                this.$.finishSnInputBox.focus();
                this.$.finishSnInputBox.focused = true;
            }
        } else {
            this.$.finishlabel.innerText = "Invalid SerialNumber ( " + this.$.finishSnInputBox.value + " ), pack is uncomplete.";
            this.$.finishSnInputBox.value = "";
            this.$.finishSnInputBox.focus();
            this.$.finishSnInputBox.focused = true;
        }
    }

    async packSN(): Promise<Project.Product> {
        this.$.finishlabel.innerText = "loading...";
        try {
            let p: Project.Product = new Project.Product();
            p.serialNumber = this.$.finishSnInputBox.value;
            if (p.serialNumber != null) {
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