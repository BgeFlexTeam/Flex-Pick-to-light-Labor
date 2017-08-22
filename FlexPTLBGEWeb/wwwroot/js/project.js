var Project;
(function (Project) {
    let FetchType;
    (function (FetchType) {
        FetchType[FetchType["json"] = 0] = "json";
        FetchType[FetchType["text"] = 1] = "text";
        FetchType[FetchType["blob"] = 2] = "blob";
        FetchType[FetchType["void"] = 3] = "void";
    })(FetchType = Project.FetchType || (Project.FetchType = {}));
    class ResponseError extends Error {
        constructor(response) {
            super(null);
            this.message = response.statusText;
            this.status = response.status;
            this.url = response.url;
        }
    }
    Project.ResponseError = ResponseError;
    class ServerError extends Error {
        constructor(response, result) {
            super(result);
            this.message = this.message || result.ExceptionMessage;
            this.stack = this.stack || result.StackTrace;
            this.status = response.status;
            this.url = response.url;
        }
    }
    Project.ServerError = ServerError;
    class Fetch {
        static async Get(url, type = FetchType.json) {
            const headers = new Headers();
            headers.append(`Content-Type`, `application/json`);
            const response = await fetch(url, {
                method: "GET",
                headers: headers
            }); // fetch throws no error
            return this.Result(response, type);
        }
        static async Post(url, parameter = undefined, type = FetchType.json) {
            const headers = new Headers();
            headers.append(`Content-Type`, `application/json`);
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(parameter)
            });
            return this.Result(response, type);
        }
        static async Result(response, type = FetchType.json) {
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
            }
            else {
                let error = null;
                try {
                    error = await response.clone().json();
                }
                catch (error) {
                    throw new ResponseError(response);
                }
                throw new ServerError(response, error);
            }
        }
    }
    Project.Fetch = Fetch;
    class Part {
    }
    Project.Part = Part;
})(Project || (Project = {}));
