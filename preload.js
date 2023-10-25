const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    loadSong: () => ipcRenderer.invoke('loadSong')
    // nous pouvons aussi exposer des variables en plus des fonctions
})