const { ipcRenderer } = require("electron")

function sendToBackend(data) {
    ipcRenderer.send("newData", {
        value: data,
    })
}

ipcRenderer.on("line", function (event, store) {
    console.log(store)
    document.getElementById("responseText").innerHTML = store.response
    document.getElementById("latency").innerHTML =
        "Latency:    " + store.latency + " ms"
    document.getElementById("statusCode").innerHTML =
        "Status Code: " + store.status
})
