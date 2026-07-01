/// <reference types="vite/client" />

declare global {
  interface Window {
    fmBridge?: {
      saveProject: (project: unknown) => Promise<{ ok: boolean; filePath?: string }>;
      openProject: () => Promise<{ ok: boolean; filePath?: string; project?: unknown }>;
    };
  }
}

export {};
