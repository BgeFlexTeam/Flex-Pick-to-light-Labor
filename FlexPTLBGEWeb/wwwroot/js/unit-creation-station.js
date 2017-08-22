/// <reference path="polymer.d.ts" />
/// <reference path="polymer2-ts.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let UnitCreationStation = class UnitCreationStation extends Polymer.Element {
    // @property()
    // productName: string;
    // @property()
    // serialNumber: string;
    connectedCallback() {
        super.connectedCallback();
        this.$.productSelector.focus();
        this.$.productSelector.focused = true;
        this.$.responselabel.innerText = "";
        this.$.productSelector.selectedItem = null;
        this.loadProducts();
    }
    async loadProducts() {
        try {
            let list = await Project.Fetch.Post(`/api/Part/GetProducts`);
            this.$.productSelector.items = list;
        }
        catch (error) {
            console.log(error);
        }
    }
    async createSNTap() {
        let myproduct = await this.createSN();
        if (myproduct != null) {
            this.$.responselabel.innerText = "Generated SerialNumber is: " + myproduct.serialNumber;
        }
        else {
            this.$.responselabel.innerText = "SerialNumber is not generated.";
        }
    }
    async createSN() {
        this.$.responselabel.innerText = "loading...";
        try {
            let x = this.$.productSelector.selectedItem;
            if (x != null) {
                let response = await Project.Fetch.Post(`/api/Part/createSN`, x);
                return response;
            }
            else {
                return null;
            }
        }
        catch (error) {
            return null;
        }
    }
};
UnitCreationStation = __decorate([
    customElement("unit-creation-station")
], UnitCreationStation);
