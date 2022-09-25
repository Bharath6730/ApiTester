document.getElementById("submit").addEventListener("click", () => {
    let data = getAllData()

    sendToBackend(data)
})

var requestMethods = "GET"
var availableQuery = 1
var availableHeaders = 1

let keyList = document.getElementById("paramsBody1")
let valueList = document.getElementById("paramsBody2")
let desList = document.getElementById("paramsBody3")

let headerKeyList = document.getElementById("headerBody1")
let headerValueList = document.getElementById("headerBody2")
let headerDesList = document.getElementById("headerBody3")
var selectedOption = "Query"

document.getElementById("addNewInput").addEventListener("click", () => {
    console.log(selectedOption)
    if (selectedOption == "Query") {
        var newDiv = document.createElement("div")
        newDiv.classList.add("paramsBodyRows")
        var newInput = document.createElement("input")
        newInput.type = "text"
        newInput.placeholder = "Enter key"
        newInput.classList.add("urlInput")
        newInput.classList.add("withBorder")
        newDiv.appendChild(newInput)
        keyList.appendChild(newDiv)

        var newDiv = document.createElement("div")
        newDiv.classList.add("paramsBodyRows")
        var newInput = document.createElement("input")
        newInput.type = "text"
        newInput.placeholder = "Enter value"
        newInput.classList.add("urlInput")
        newInput.classList.add("withBorder")
        newDiv.appendChild(newInput)
        valueList.appendChild(newDiv)

        var newDiv = document.createElement("div")
        newDiv.classList.add("paramsBodyRows")
        var newInput = document.createElement("input")
        newInput.type = "text"
        newInput.placeholder = "Enter Description"
        newInput.classList.add("urlInput")
        newInput.classList.add("withBorder")
        newDiv.appendChild(newInput)
        desList.appendChild(newDiv)
    } else {
        var newDiv = document.createElement("div")
        newDiv.classList.add("paramsBodyRows")
        var newInput = document.createElement("input")
        newInput.type = "text"
        newInput.placeholder = "Enter key"
        newInput.classList.add("urlInput")
        newInput.classList.add("withBorder")
        newDiv.appendChild(newInput)
        headerKeyList.appendChild(newDiv)

        var newDiv = document.createElement("div")
        newDiv.classList.add("paramsBodyRows")
        var newInput = document.createElement("input")
        newInput.type = "text"
        newInput.placeholder = "Enter value"
        newInput.classList.add("urlInput")
        newInput.classList.add("withBorder")
        newDiv.appendChild(newInput)
        headerValueList.appendChild(newDiv)

        var newDiv = document.createElement("div")
        newDiv.classList.add("paramsBodyRows")
        var newInput = document.createElement("input")
        newInput.type = "text"
        newInput.placeholder = "Enter Description"
        newInput.classList.add("urlInput")
        newInput.classList.add("withBorder")
        newDiv.appendChild(newInput)
        headerDesList.appendChild(newDiv)
    }
})
// setListeners(1)

// Dropdown
const filterOption = document.getElementsByClassName("filter")[0]
let chosenOption = document.getElementById("dropDownSelectedItem")
const dropDown = document.getElementsByClassName("dropDown")[0]

filterOption.addEventListener("click", () => {
    dropDown.classList.toggle("hide")
    console.log(dropDown.classList)
})

let filterOptions = document.getElementsByClassName("dropDownItems")

for (let i = 0; i < filterOptions.length; i++) {
    let element = filterOptions[i]
    element.addEventListener("click", () => {
        chosenOption.innerText = element.innerText
        requestMethods = element.innerText
        dropDown.classList.add("hide")
    })
}

document.getElementById("parameterOption").addEventListener("click", () => {
    document.getElementById("parameterBody").classList.remove("hide")
    document.getElementById("headerBody").classList.add("hide")
    selectedOption = "Query"
})
document.getElementById("headerOption").addEventListener("click", () => {
    document.getElementById("parameterBody").classList.add("hide")
    document.getElementById("headerBody").classList.remove("hide")
    selectedOption = "Header"
})

function getAllData() {
    let data = {}
    let url = document.getElementById("urlInput").value + "?"
    // join parametrs
    let keyList = document.getElementById("paramsBody1").children
    let valueList = document.getElementById("paramsBody2").children
    for (let i = 1; i < keyList.length; i++) {
        const key = keyList[i].children[0].value
        const value = valueList[i].children[0].value
        url += key + "=" + value + "&"
    }
    data.url = url
    data.requestMethods = requestMethods
    console.log(requestMethods)
    // get Headers
    data.header = {}
    let headerKeyList = document.getElementById("headerBody1").children
    let headerValueList = document.getElementById("headerBody1").children
    for (let i = 1; i < headerKeyList.length; i++) {
        const key = headerKeyList[i].children[0].value
        const value = headerValueList[i].children[0].value
        if (key != "" && value && value != "") {
            data.header[key] = value
        }
    }

    return data
}
