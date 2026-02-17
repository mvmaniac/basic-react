function toBoolean(value: string | undefined, fallback = false) {
  if (value === undefined) return fallback;
  return value.toLowerCase() === 'true';
}

export const ENV = {
  mode: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  enableRqDevtools: toBoolean(import.meta.env.VITE_ENABLE_RQ_DEVTOOLS, false),
} as const;
