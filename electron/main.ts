import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = process.env.VITE_DEV_SERVER_URL || !app.isPackaged;

async function createWindow(): Promise<void> {
  const win = new BrowserWindow({
    width: 1600,
    height: 950,
    minWidth: 1280,
    minHeight: 760,
    backgroundColor: '#070812',
    title: 'FM Remix Forge Studio',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  if (isDev) {
    await win.loadURL('http://localhost:5173');
  } else {
    await win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow).catch(console.error);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) void createWindow();
});

ipcMain.handle('project:save', async (_event, project: unknown) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: 'Sauvegarder le projet FM',
    defaultPath: 'fm-remix-project.json',
    filters: [{ name: 'Projet FM Remix', extensions: ['json'] }]
  });
  if (canceled || !filePath) return { ok: false };
  await fs.writeFile(filePath, JSON.stringify(project, null, 2), 'utf-8');
  return { ok: true, filePath };
});

ipcMain.handle('project:open', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: 'Ouvrir un projet FM',
    properties: ['openFile'],
    filters: [{ name: 'Projet FM Remix', extensions: ['json'] }]
  });
  if (canceled || filePaths.length === 0) return { ok: false };
  const raw = await fs.readFile(filePaths[0], 'utf-8');
  return { ok: true, filePath: filePaths[0], project: JSON.parse(raw) };
});
