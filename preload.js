const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    chooseInput: () => ipcRenderer.invoke('chooseInput'),
    inputChosen: (input) => ipcRenderer.send('inputChosen', input)
    // nous pouvons aussi exposer des variables en plus des fonctions
})