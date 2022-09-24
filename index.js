const { app, BrowserWindow, ipcMain } = require("electron")
const fetch = require("electron-fetch").default

let win

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })
    win.loadFile(__dirname + "/src/index.html")
}
app.whenReady().then(() => {
    createWindow()
})

ipcMain.on("newData", (event, data) => {
    fetch(data.value)
        .then((res) => res.text())
        .then((body) => {
            win.webContents.send("line", body)
        })
})
