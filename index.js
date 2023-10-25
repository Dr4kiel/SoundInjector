const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { spawn } = require('child_process');

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 1000,
        // autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('inputPage/chooseInput.html')

    // lancer le script python et récupérer les données
    // const python = spawn('python', ['injector/test.py']);
    // python.stdout.on('data', data => {
    //     console.log(`stdout: ${data}`);
    // });
    return win;
}

app.whenReady().then(() => {

    var currentWindow = null

    ipcMain.handle('chooseInput', async () => {
        const python = spawn('python', ['injector/test.py']);
        const data = await new Promise((resolve, reject) => {
            python.stdout.on('data', data => {
                resolve(data.toString())
            })
        })
        // convert strings to objects
        return JSON.parse(data)
    })

    ipcMain.on('inputChosen', (event, arg) => {
        // python.stdin.write(arg)
        console.log(arg)
        currentWindow.loadFile('mainPage/index.html')
    })

    currentWindow = createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})