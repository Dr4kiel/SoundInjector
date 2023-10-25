const chooseInput = async () => {
    const data = await window.electronAPI.chooseInput()
    // make a pop up to choose the input with the list of the inputs
    const inputList = document.querySelector('#inputList')
    inputList.innerHTML = ''
    data.forEach(input => {
        inputList.innerHTML += inputElement(input)
    })

}

const inputElement = (input) => {
    // get the index and the name of the input Ex : {index: 1, name: "test"}
    return `
        <div class="m-1">
            <button class="input btn btn-dark p-2 m-1 w-100" onclick="window.electronAPI.inputChosen('${input.index}')">
                <span class="vh-10 vw-10">${input.name}</span>
            </button>
        </div>
    `
}

chooseInput()