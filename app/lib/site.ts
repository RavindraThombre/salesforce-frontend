import { isBrowser, isDevEnvironment } from "./utils";

export const appSettings = {
    name: "Salesforce Academy",
    description: "Live Salesforce training platform with admin & student LMS",
    logo: "/logo.png",
    base_color: "#095899",
    keys: {
        default_api_key: "lms-api-key",
    },
    links: {
        api_base_url: isDevEnvironment ? "/api-proxy" : "/salesforce-academy/api-proxy",
        // api_base_url: isDevEnvironment ? "/api-proxy" : (isBrowser() ? window.location.origin : ""),
        auth_base_url: isDevEnvironment ? "/auth-api" : (isBrowser() ? window.location.origin : ""),
        salesforce_base_url: isDevEnvironment ? "/salesforce-api" : (isBrowser() ? window.location.origin : ""),

    }
};

