class HttpClient {
    static defaultHeader: Record<string, string> = {
        "body": "application/json",
        "Pragma": "no-cache",
        "Content-Type": "application/json",
    };

    static async handleResponse(response: Response): Promise<unknown> {
        const contentType = response.headers.get("content-type");
        if (response.status === 204 || contentType === null) {
            return null;
        } else if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json();
        } else {
            const error = await response.text();
            throw new Error(error);
        }
    }

    static async get(url: string, headers: Record<string, string> = {}): Promise<unknown> {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { ...this.defaultHeader, ...headers },
            });

            return this.handleResponse(response);
        } catch (error) {
            throw new Error(`Unable to fetch data from ${url}: ${error.message}`);
        }
    }

    static async post(url: string, body: any, headers: Record<string, string> = {}): Promise<unknown> {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { ...this.defaultHeader, ...headers },
                body: JSON.stringify(body),
            });

            return this.handleResponse(response);
        } catch (error) {
            throw new Error(`Unable to fetch data from ${url}: ${error.message}`);
        }
    }
}

export default HttpClient;
