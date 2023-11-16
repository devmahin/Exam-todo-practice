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
        stateMent += `
                    <tr class="tableData">
                    <th scope="row">${index+1}</th>
                    <td class="name">${value.name}</td>
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
const searchInput = document.getElementById("searchInput")
const td = document.querySelectorAll("#alltodo tr");
searchInput.addEventListener("input", (e) => {
    let inputVal = e.target.value.toLowerCase()
    alltodo.innerHTML = "";
    td.forEach((val,index) => {
        const tr_td = val.querySelectorAll("td")
        if(tr_td[0].innerText.toLocaleLowerCase().indexOf(inputVal) > -1){
            alltodo.appendChild(val)
        }
        })
        if(alltodo.innerHTML === ""){
            alltodo.innerHTML = "Record is not found"
        }
})




///pagination
const paginationalltodo = document.querySelectorAll("#alltodo tr")

let record_per_page = 5;
let pageNum = 1;
let total_record_length = paginationalltodo.length
let total_page = Math.ceil(total_record_length / record_per_page)

genaretPage()
pageRecord()
    function pageRecord(){
        let start_index = (pageNum - 1 ) * record_per_page;
        let end_index = start_index + (record_per_page - 1);
        let stateMent = "";
        for(i=start_index; i<= end_index; i++){
            stateMent += `<tr>${paginationalltodo[i].innerHTML}</tr>`
        }
        alltodo.innerHTML = stateMent
    }

    function genaretPage (){
        let prevBtn = `<li class="page-item" id="prevBtn"><a class="page-link" onclick="prevBtn()" href="#">Previous</a></li>`
        let nextBtn =  `<li class="page-item" id="nextBtn"><a class="page-link" onclick="nextBtn()" href="#">Next</a></li>`
        let buttons = '';
        let activeClass = "";
        for(i = 1; i <= total_page; i++){
            
            if(i =1){
                activeClass  = "active";
            }else{
                activeClass = "";
            }
            buttons += `<li class="page-item ${activeClass}"><a class="page-link" href="#">${i}</a></li>`
        }
        const pagenation = document.querySelector("#pagenation")
        pagenation.innerHTML = `${prevBtn}, ${buttons}, ${nextBtn}`
    }
    function nextBtn (){
        pageNum++;
        pageRecord()
    }
    function prevBtn (){
        pageNum--;
        pageRecord()
    }