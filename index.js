//Tasks array containing the id, name and status of the task
//Status of a task indicates the completion status of the task
const tasks = [
    {
        id: 1,
        name:"Wake up at 6 AM",
        status: false
    },
    {
        id: 2,
        name:"Drink Coffee",
        status: false
    },
    {
        id: 3,
        name:"Watch a Movie",
        status: false
    }
]


//Function to update the length of the completed tasks
function updateTaskLength(){
    cid = document.getElementById("taskCount");
    let listt = document.getElementById("task-list").childNodes;
    let count = 0;
    for(let i = 0; i < tasks.length; i++){
        if(!listt[i+1].childNodes[0].childNodes[0].checked){
            count++;
        }
    }
    cid.innerHTML = count;
}

//Function to Render the list of tasks
function onload(){
    for(let task of tasks){
        updateList(task.name, task.id);
    }   
    updateTaskLength()
}

//Keypress event to get the input from the user
let input = document.getElementById("task");
input.addEventListener("keypress", function(event){
    if(event.key == "Enter"){
        if(input.value != ""){
            tasks.push({
                id: tasks.length + 1,
                name: input.value,
                status: false
            });

            updateList(input.value, tasks.length + 1);
        }
        input.value = ""
    }
})

//Funtion to add a new task to the list
function updateList(str, id){

    let list = document.getElementById("task-list");
    let div1 = document.createElement("div");
    div1.className = "task-item";
    div1.id = "select-task"

    let div2 = document.createElement("div");
    div2.className = "task";

    let ip = document.createElement("input");
    ip.type = "checkbox";
    ip.id = "checkbox";
    ip.className = "strikethrough"
    ip.onclick = function(){
        //onclick event handeling the indication of completion of a task
        for(let task of tasks){
            if(task.name == str){
                if(task.status){
                    div2.className = "task"
                    task.status = false;
                }
                else{
                    div2.className = "task strikethrough"
                    task.status = true;
                }
            } 
            updateTaskLength()
        }
    }
    let sp = document.createElement("span");
    sp.innerHTML = str;
    div2.appendChild(ip)
    div2.appendChild(sp)
    div1.appendChild(div2)

    let div3 = document.createElement("div");
    div3.className = "delete";
    div3.id = "del";
    div3.onclick = function(){
        //onclick event handeling the deletion of the task
        for(let task of tasks){
            if(task.name == str){
                delFunc(str)
            } 
        }
    };

    let i = document.createElement("i");
    i.className = "fa-sharp fa-solid fa-circle-xmark";

    div3.appendChild(i);
    div1.appendChild(div3)
    list.appendChild(div1);

    cid = document.getElementById("taskCount");
    cid.innerHTML = tasks.length;
}

//function called when delete button is clicked
function delFunc(task){
    idx = tasks.findIndex(item => {return item.name == task});
    tasks.splice(idx, 1);
    let listt = document.getElementById("task-list").childNodes;
    listt[idx+1].remove();
    updateTaskLength();
}

//function called when a task is "check" marked for completion
function checkTask(completedTask){
    let idx = tasks.findIndex(item => {return item.id == completedTask.id});
    tasks[idx].status = true
    let listt = document.getElementById("task-list").childNodes;
    listt[idx+1].childNodes[0].childNodes[0].checked = true
    updateTaskLength()
}
//implementation of "Check All Tasks" functionality
function checkAllTasks(){
    for(let task of tasks){
        checkTask(task);
    }
}

//implementation of "Delete Completed Tasks" functionality
function deleteCompleted(){
    let c = 0;
    for(let task of tasks){
        if(task.status == true){
            c++;
        }
    }
    while(c--){
        for(let task of tasks){
            if(task.status == true){
                delFunc(task.name);
                
            }
        }
    }
    updateTaskLength()
}

//function called when "Completed" tab is clicked
function completed(){
    let listt = document.getElementById("task-list").childNodes;
    btn = document.getElementById("btn4").style.fontWeight = 700;
    btn = document.getElementById("btn3").style.fontWeight = 300;
    btn = document.getElementById("btn5").style.fontWeight = 300;
    for(let i = 0; i <= listt.length; i++){
        if(!listt[i+1].childNodes[0].childNodes[0].checked){
            listt[i+1].childNodes[0].className = "hide";
        }
        if(listt[i+1].childNodes[0].childNodes[0].checked){
            listt[i+1].childNodes[0].className = "task";
        }
    }
    
}

//function called when "UnCompleted" tab is clicked
function unCompleted(){
    let listt = document.getElementById("task-list").childNodes;

    btn = document.getElementById("btn4").style.fontWeight = 300;
    btn = document.getElementById("btn3").style.fontWeight = 300;
    btn = document.getElementById("btn5").style.fontWeight = 700;


    for(let i = 0; i <= listt.length; i++){
        if(listt[i+1].childNodes[0].childNodes[0].checked){
            listt[i+1].childNodes[0].className = "hide";
        }
        if(!listt[i+1].childNodes[0].childNodes[0].checked){
            listt[i+1].childNodes[0].className = "task";
        }
    }
}

//function called when "Display All" tab is clicked
function displayAll(){
    let listt = document.getElementById("task-list").childNodes;

    btn = document.getElementById("btn4").style.fontWeight = 300;
    btn = document.getElementById("btn3").style.fontWeight = 700;
    btn = document.getElementById("btn5").style.fontWeight = 300;


    for(let i = 0; i <= listt.length; i++){
        listt[i+1].childNodes[0].classList.remove("hide");
        listt[i+1].childNodes[0].className = "task";
    }
}