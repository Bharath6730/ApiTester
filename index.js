const { app, BrowserWindow, ipcMain } = require("electron")
const fetch = require("electron-fetch").default

let win

const createWindow = () => {
    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        // frame: false,
    })
    win.loadFile(__dirname + "/src/index.html")
}
app.whenReady().then(() => {
    createWindow()
})

app.on("window-all-closed", () => {
    win = null
    if (process.platform !== "darwin") {
        app.quit()
    }
})

ipcMain.on("newData", (event, data) => {
    // console.log(data.value)
    fetch(data.value.url, {
        method: data.value.requestMethods,
        headers: data.value.header,
    })
        .then((res) => res.text())
        .then((body) => {
            win.webContents.send("line", body.toString())
        })
        .catch((err) => {
            win.webContents.send("error", err)
        })
})
