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
let FlexApp = class FlexApp extends Polymer.Element {
    routePageChanged(page) {
        this.page = page || "station-loader";
        if (!this.$.drawer.persistent) {
            this.$.drawer.close();
        }
    }
    pageChanged(page) {
        const resolvedPageUrl = page + ".html";
        Polymer.importHref(resolvedPageUrl, null, null, true);
    }
};
__decorate([
    property({ reflectToAttribute: true }),
    __metadata("design:type", String)
], FlexApp.prototype, "page", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], FlexApp.prototype, "rootPath", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], FlexApp.prototype, "subroute", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], FlexApp.prototype, "routeData", void 0);
__decorate([
    observe("routeData.page"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FlexApp.prototype, "routePageChanged", null);
__decorate([
    observe("page"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FlexApp.prototype, "pageChanged", null);
FlexApp = __decorate([
    customElement("flex-app")
], FlexApp);
