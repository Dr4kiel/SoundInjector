const { app, BrowserWindow, ipcMain } = require('electron')
const { spawn } = require('child_process');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: { nodeIntegration: true }
    })

    win.loadFile('index.html')

    // lancer le script python et récupérer les données
    // const python = spawn('python', ['injector/test.py']);
    // python.stdout.on('data', data => {
    //     console.log(`stdout: ${data}`);
    // });
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})