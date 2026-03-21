export const apiClient = {
    get(url) {
        return fetch(url).then((res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        });
    },
};
