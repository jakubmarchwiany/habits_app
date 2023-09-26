/// <reference types="vite/client" />

type ImportMetaEnv = {
    readonly VITE_API_ENDPOINT: string;
    readonly VITE_DAYS_TO_SHOW: string;
};

type ImportMeta = {
    readonly env: ImportMetaEnv;
};
