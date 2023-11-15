const inputText = document.getElementById("textinput")
const btn = document.getElementById("btn")
const btnText = btn.innerText
const alltodo = document.getElementById("alltodo")
let userArray = [];
let edit = null;
let objStr = localStorage.getItem("users")
    if(objStr != null){
        userArray = JSON.parse(objStr)

    }


    showDisplay()
btn.addEventListener("click", (e) => {
    let textValue = inputText.value
    if(edit != null){
    userArray.splice(edit,1,{"name": textValue})
    edit = null
    }else{
        userArray.push({"name": textValue})
    }

    SaveInfo(userArray);
    inputText.value = "";
    // showDisplay()
    btn.innerText = btnText
})

function SaveInfo(userArray){
    let str = JSON.stringify(userArray)
    localStorage.setItem("users", str)
    showDisplay()

}

function showDisplay(){
    let stateMent = ""
    userArray.forEach((value,index) => {
        console.log(value)
        stateMent += `
                    <tr>
                    <th scope="row">${index+1}</th>
                    <td>${value.name}</td>
                    <td class="d-flex justify-content-around">
                    <i class="bi bi-pencil-square"  onclick="EditTodo(${index})" ></i> 
                    <i class="bi bi-trash-fill" onclick="deleteTodo(${index})" ></i>
                    </td>
                    </tr>
      
        `
        alltodo.innerHTML = stateMent
    })
}


function EditTodo(id){
    edit = id;
    inputText.value = userArray[id].name
    btn.innerText = "Save"
}

function deleteTodo(id){
    userArray.splice(id,1)
    SaveInfo(userArray)
}