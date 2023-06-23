export const storage = {
    getObjectFromStorage<T>(key:string) : T {
        const result = localStorage.getItem(key);
        if (result) {
            return JSON.parse(result);
        } else {
            return JSON.parse('[]');
        }
    },

}
