import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('fmBridge', {
  saveProject: (project: unknown) => ipcRenderer.invoke('project:save', project),
  openProject: () => ipcRenderer.invoke('project:open')
});
