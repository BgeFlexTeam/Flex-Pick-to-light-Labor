/// <reference path="polymer.d.ts" />

class FlexApp extends Polymer.Element {
      static get is():string { return "flex-app"; }

      static get properties():any {
        return {
          prop1: {
            type: String,
            value: "flex-app"
          }
        };
      }
    }

customElements.define(FlexApp.is, FlexApp);