const { ipcRenderer } = require("electron")

function sendToBackend(data) {
    ipcRenderer.send("newData", {
        value: data,
    })
}

ipcRenderer.on("line", function (event, store) {
    document.getElementById("responseText").innerHTML = store
})
