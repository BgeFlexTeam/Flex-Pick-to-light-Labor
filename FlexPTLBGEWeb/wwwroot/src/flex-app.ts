/// <reference path="polymer.d.ts" />
/// <reference path="polymer2-ts.ts" />

@customElement("flex-app")
class FlexApp extends Polymer.Element {
	@property({ reflectToAttribute: true })
	page: string;

	@property()
	rootPath: string;

	@property()
	subroute: string;

	@property()
	routeData: object;

	@observe("routeData.page")
	routePageChanged(page: string): void {
		this.page = page || "station-loader";

		if (!this.$.drawer.persistent) {
			this.$.drawer.close();
		}
	}

	@observe("page")
	pageChanged(page: string): void {
		const resolvedPageUrl: string = page + ".html";
		Polymer.importHref(
			resolvedPageUrl,
			null,
			null,
			true);
	}

}