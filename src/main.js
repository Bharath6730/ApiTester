const { ipcRenderer } = require("electron")

function sendToBackend(data) {
    ipcRenderer.send("newData", {
        value: data,
    })
}

ipcRenderer.on("line", function (event, store) {
    const div = document.createElement("h1")
    div.innerText = "Got data"
    console.log(store)
})
