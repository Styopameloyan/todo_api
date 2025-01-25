"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class HttpClient {
    static handleResponse(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentType = response.headers.get("content-type");
            if (response.status === 204 || contentType === null) {
                return null;
            }
            else if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            }
            else {
                const error = yield response.text();
                throw new Error(error);
            }
        });
    }
    static get(url, headers = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(url, {
                    method: 'GET',
                    headers: Object.assign(Object.assign({}, this.defaultHeader), headers),
                });
                return this.handleResponse(response);
            }
            catch (error) {
                throw new Error(`Unable to fetch data from ${url}: ${error.message}`);
            }
        });
    }
    static post(url, body, headers = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(url, {
                    method: 'POST',
                    headers: Object.assign(Object.assign({}, this.defaultHeader), headers),
                    body: JSON.stringify(body),
                });
                return this.handleResponse(response);
            }
            catch (error) {
                throw new Error(`Unable to fetch data from ${url}: ${error.message}`);
            }
        });
    }
}
HttpClient.defaultHeader = {
    "body": "application/json",
    "Pragma": "no-cache",
    "Content-Type": "application/json",
};
exports.default = HttpClient;
//# sourceMappingURL=httpClient.js.map