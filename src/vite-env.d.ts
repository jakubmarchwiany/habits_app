/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_ENDPOINT: string;
    readonly VITE_DAYS_TO_SHOW: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
