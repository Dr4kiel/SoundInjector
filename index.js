const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { spawn } = require('child_process');

function createInputPage() {
    const win = new BrowserWindow({
        width: 1280,
        height: 1000,
        // autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'inputPage/preload.js')
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

function createMainPage(arg) {
    const win = new BrowserWindow({
        width: 1280,
        height: 1000,
        // autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'mainPage/preload.js'),
            contextIsolation: true
        }
    })

    win.loadFile('mainPage/mainPage.html')

    const dir = "injector/sounds"
    const fs = require('fs')
    const files = fs.readdirSync(dir)
    console.log(files)

    ipcMain.handle('getFiles', async () => {
        return files
    })

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
        // initialize the main page
        currentWindow.close()
        currentWindow = createMainPage(arg)
    })

    currentWindow = createInputPage()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})