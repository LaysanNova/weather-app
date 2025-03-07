class API_Service {
    static async getAppName() {
        return fetch("http://localhost:5000/api/")
            .then(response => {
                if (response.status !== 200) {
                    console.error("[ERROR] Response status: ", response.status);
                    throw new Error('[ERROR] Failed to fetch app name. Unexpected response status.');
                }

                return response.text();
            })
            .catch(error => {
                console.error('[ERROR] Fetch error:', error);
                throw error;
            });
    }
}

export { API_Service };
