namespace Project {

    export let store: any;

    export enum FetchType {
        json,
        text,
        blob,
        void
    }

    export class ResponseError extends Error {
        public status: number;
        public url: string;

        constructor(response: Response) {
            super(null);
            this.message = response.statusText;
            this.status = response.status;
            this.url = response.url;
        }
    }

    export class ServerError extends Error {
        public stack?: string;
        public status: number;
        public url: string;

        constructor(response: Response, result: any) {
            super(result);
            this.message = this.message || result.ExceptionMessage;
            this.stack = this.stack || result.StackTrace;
            this.status = response.status;
            this.url = response.url;
        }
    }

    export class Fetch {

        static async Get(url: string, type: FetchType = FetchType.json): Promise<any> {
            const headers: Headers = new Headers();
            headers.append(`Content-Type`, `application/json`);

            const response: Response = await fetch(url, {
                method: "GET",
                headers: headers
            }); // fetch throws no error
            return this.Result(response, type);
        }

        static async Post(url: string, parameter: object = undefined, type: FetchType = FetchType.json): Promise<any> {
            const headers: Headers = new Headers();
            headers.append(`Content-Type`, `application/json`);

            const response: Response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(parameter)
            });
            return this.Result(response, type);
        }

        static async LocalPost(url: string, parameter: object = undefined, type: FetchType = FetchType.json): Promise<any> {
			const headers: Headers = new Headers();
			headers.append(`Content-Type`, `application/x-www-form-urlencoded;charset=UTF-8`);
			headers.append(`Access-Control-Allow-Origin`, `*`);
			headers.append(`Access-Control-Allow-Methods`, `OPTIONS, POST`);
			headers.append(`Access-Control-Allow-Headers`, `Content-Type`);

			let params: any = undefined;
			if (parameter) {
				params = Object.keys(parameter).map((key) => {
					return encodeURIComponent(key) + "=" + encodeURIComponent(parameter[key]);
				}).join("&");
			}

			const response: Response = await fetch(url, {
				method: "POST",
				headers: headers,
				body: params,
				mode: "cors"
			});
			return this.Result(response, type);
		}

        private static async Result(response: Response, type: FetchType = FetchType.json): Promise<any> {
            if (response.ok) {
                if (response.status === 200) {
                    switch (type) {
                        case FetchType.json: return await response.json();
                        case FetchType.blob: return await response.blob();
                        case FetchType.text: return await response.text();
                        case FetchType.void: return undefined;
                    }
                }
                return null; // 204 - No content
            } else {
                let error: any = null;
                try {
                    error = await response.clone().json();
                } catch (error) {
                    throw new ResponseError(response);
                }
                throw new ServerError(response, error);
            }
        }
    }

    export class Label {
        public static async Print(serialNumber: string, product: string): Promise<any> {
			let result: any = await Fetch.Post("/api/Label/Print", { serialNumber: serialNumber, product: product }, FetchType.text);
			if (result != null) {
				return await Fetch.LocalPost(`http://localhost:5002/api/print`, {
					labelContent: result,
					printerName: "zebra"
				});
			}
		}
    }

     export class Part {
        public id: number;
        public partName: string;
        public partFamilyID: number;
        public code: string;
    }

     export class Product {
        public id: number;
        public serialNumber: string;
        public partID: number;
        public creationTime: Date;
        public isComplete: boolean;
    }
      export class Bom {
        public id: number;
        public parentID: number;
        public partID: number;
        public assemblyOrder: number;
    }
     export class Assembly {
        public id: number;
        public serialNumber: string;
        public assembledPartID: number;
        public assemblyOrder: number;
        public AssembledTime: Date;
    }
    export class AssemblyData {
        public serialNumber: string;
        public partName: string;
        public code: string;
    }

}