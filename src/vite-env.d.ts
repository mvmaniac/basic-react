/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_RQ_DEVTOOLS?: 'true' | 'false';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
