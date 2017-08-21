/// <reference path="polymer.d.ts" />
/// <reference path="polymer2-ts.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let UnitCreationStation = class UnitCreationStation extends Polymer.Element {
    connectedCallback() {
        super.connectedCallback();
        this.$.productSelector.focus();
        this.$.productSelector.focused = true;
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
        try {
            let response = await Project.Fetch.Post(`/api/Part/createSN`, this.$.productSelector.selectedItem);
        }
        catch (error) {
            console.log(error);
        }
    }
};
__decorate([
    property(),
    __metadata("design:type", String)
], UnitCreationStation.prototype, "productName", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], UnitCreationStation.prototype, "serialNumber", void 0);
UnitCreationStation = __decorate([
    customElement("unit-creation-station")
], UnitCreationStation);
