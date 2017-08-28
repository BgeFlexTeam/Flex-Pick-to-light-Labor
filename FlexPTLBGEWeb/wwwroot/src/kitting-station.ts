/// <reference path="polymer.d.ts" />
/// <reference path="polymer2-ts.ts" />

@customElement("kitting-station")
class KittingStation extends Polymer.Element {

    @property()
    prod: Project.Product = null;

    connectedCallback(): void {
        super.connectedCallback();
        this.$.kittingSnInputBox.value = "";
        this.$.kittinglabel.innerText = "";
        this.$.kittingSnInputBox.focus();
        this.$.kittingSnInputBox.focused = true;
    }

    async _txtKittingKeypress(e: any): Promise<void> {
        if (e.key === "Enter") { this.kittingSNTap(); }
    }

    async kittingSNTap(): Promise<any> {
        this.$.kittinglabel.innerText = "loading...";
        let p: Project.Product = new Project.Product();
        p.serialNumber = this.$.kittingSnInputBox.value;
        if (p.serialNumber != null && p.serialNumber.length > 0) {
            this.prod = await Project.Fetch.Post(`/api/Product/getProductBySN`, p);
        }
        if (this.prod != null) {
            let b: boolean = await this.kittingSN();
            if (b) {
                this.$.kittinglabel.innerText = "BOM list loaded.";
                this.$.kittingSnInputBox.focus();
                this.$.kittingSnInputBox.focused = true;
            } else {
                this.$.kittingSnInputBox.value = "";
                this.$.kittinglabel.innerText = "Something went wrong...";
                this.$.kittingSnInputBox.focus();
                this.$.kittingSnInputBox.focused = true;
            }
        }

    }

    async kittingSN(): Promise<boolean> {
        try {
            let list: Array<Project.Part> = await Project.Fetch.Post(`/api/Kitting/GetBoms`, this.prod);
            if (list.length === 0) { return false; }
            this.$.bomlist.items = list;
            // insert to PTL
            // for (let v of list) {
            //     await Project.Fetch.Post(`/api/Kitting/InsertToPTL`, v);
            // }
            await Project.Fetch.Post(`/api/Kitting/InsertToPTL`, list);
            return true;
        } catch (error) {
            return false;
        }
    }
}