export default class BrowserStorage {
    private storageType: "localStorage" | "cookie";
    private cookieOptions: {
        expires: number;
        path: string;
    } = { expires: 365, path: "/" };
  
    constructor(storageType: "localStorage" | "cookie", cookieOptions?: {
        expires: number;
        path: string;
    }) {
  
        this.storageType = storageType;
        if (storageType === "cookie") {
            this.cookieOptions = cookieOptions || {
            expires: 365,
            path: "/"
            };
        }
    }
    set(key: string, value: string): void {
        if (this.storageType === "localStorage") {
            localStorage.setItem(key, value);
        } else {
            const cookieString = `${key}=${value}; expires=${this.cookieOptions.expires}d; path=${this.cookieOptions.path}`;
            document.cookie = cookieString;
        }
    }
  
    get(key: string): string | null {
        if (this.storageType === "localStorage") {
            return localStorage.getItem(key);
        } else {
            const cookies = document.cookie.split(";");
            for (const cookie of cookies) {
            const [cookieKey, cookieValue] = cookie.trim().split("=");
            if (cookieKey === key) {
                return cookieValue;
            }
            }
            return null;
        }
    }
  
    delete(key: string): void {
        if (this.storageType === "localStorage") {
            localStorage.removeItem(key);
        } else {
            const cookieString = `${key}=; expires=-1; path=${this.cookieOptions.path}`;
            document.cookie = cookieString;
        }
    }
}

export const lsStorage = new BrowserStorage("localStorage")