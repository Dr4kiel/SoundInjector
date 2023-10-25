const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { spawn } = require('child_process');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        // autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')

    // lancer le script python et récupérer les données
    // const python = spawn('python', ['injector/test.py']);
    // python.stdout.on('data', data => {
    //     console.log(`stdout: ${data}`);
    // });
}

app.whenReady().then(() => {
    ipcMain.handle('loadSong', async () => {
        const python = spawn('python', ['injector/test.py']);
        const data = await new Promise((resolve, reject) => {
            python.stdout.on('data', data => {
                resolve(data.toString().split('\n'))
            });
        })
        data.pop()
        return data
    })
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})