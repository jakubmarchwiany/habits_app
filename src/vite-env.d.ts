/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_ENDPOINT: string;
    readonly VITE_N_DAYS: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
