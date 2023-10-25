const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    // récupérer les données
    getFiles: () => ipcRenderer.invoke('getFiles')
})