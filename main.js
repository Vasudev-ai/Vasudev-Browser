const { app, BrowserWindow, ipcMain } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        show: false,
        frame: false, // Removes the title bar and frame
        backgroundColor: '#ffffff',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // For simple demo purposes, usually not recommended for production but fine here
            webviewTag: true // Enable <webview> tag
        }
    })

    win.maximize()
    win.show()
    win.loadFile('index.html')

    ipcMain.on('minimize-window', () => {
        win.minimize()
    })

    ipcMain.on('maximize-window', () => {
        if (win.isMaximized()) {
            win.unmaximize()
        } else {
            win.maximize()
        }
    })

    ipcMain.on('close-window', () => {
        win.close()
    })
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
