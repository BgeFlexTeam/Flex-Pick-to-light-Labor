/// <reference path="polymer.d.ts" />
class UnitCreation extends Polymer.Element {
    static get is() { return "unit-creation"; }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: "flex-app"
            }
        };
    }
}
customElements.define(UnitCreation.is, UnitCreation);
