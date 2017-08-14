/// <reference path="polymer.d.ts" />
class FlexApp extends Polymer.Element {
    static get is() { return "flex-app"; }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: "flex-app"
            }
        };
    }
}
customElements.define(FlexApp.is, FlexApp);
