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

const pretty = require("pretty")

ipcMain.on("newData", (event, data) => {
    let now = Date.now()
    let status
    fetch(data.value.url, {
        method: data.value.requestMethods,
        headers: data.value.header,
    })
        .then(async (res) => {
            const body = await res.text()
            win.webContents.send("line", {
                response: pretty(body.toString()),
                latency: Date.now() - now,
                status: res.status,
            })
        })
        .catch((err) => {
            win.webContents.send("error", err)
        })
})
