import * as handler from "./index.js"
import "./style.scss";
import pencil from "./img/pencil-outline.svg";
import {compareAsc, format} from "date-fns";

const contentDiv = document.getElementById('allprojects');
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const editForm = document.getElementById('editForm');
const closeModalBtn = document.querySelectorAll(".btn-close");

const titleModal = document.querySelector(".title");
const titleForm = document.getElementById("titleForm");

const newProjButton = document.getElementById("newProject");
const projModal = document.querySelector(".project");
const projForm = document.getElementById("projForm");


newProjButton.addEventListener("click", function(){
    openModal(projModal);
    projForm.addEventListener("submit",function onClick(e){
        e.preventDefault();
        const data = new FormData(e.target);
        if(data.get("title")){
            var newproj = handler.projectHandler.createNewProject(data.get("title"));
            
            toDoListUIHandler.addProject(newproj);
        }

    })
})




const resetContent = function(index){
    var divToReset = document.querySelector(`.project[projectnum="${index}"]`);
    
    while(divToReset.lastChild.className != "projectTitle"){
        
        if(divToReset.lastChild.getAttribute("id") == "edit"  ){
            divToReset.lastChild.removeEventListener('click', edit);
        }
        else if(divToReset.lastChild.getAttribute("id") == "delete"){
            divToReset.lastChild.removeEventListener('click', del);
        }
    
        
        divToReset.lastChild.remove();
        
        
    }
}
const changeTitle = function(project, projectNum){
    titleForm.addEventListener("submit", function onClick(e){
        e.preventDefault();
        const data = new FormData(e.target);
        if(data.get("title")){
            project.setTitle(data.get("title"));
            var projectDom = document.querySelector(`.project[projectNum="${projectNum}"]`);
            projectDom.childNodes[0].childNodes[0].innerHTML = data.get("title");
        }
        closeModal(titleModal);
        this.removeEventListener("submit", onClick);
    })

}


const openModal = function (modal) {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
const closeModal = function (modal) {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

const editFunc = function(project, i){
    openModal(modal);
    
    editForm.addEventListener("submit", function onClick(e){
        
        e.preventDefault();
        const data = new FormData(e.target);
        if(data.get("title")){
            project.tasksDom[i].childNodes[0].innerHTML = data.get("title");
            project.tasks[i].setTitle(data.get("title"));
            console.log(project.tasks[i]);
            
        }
        
        closeModal(modal);
        this.removeEventListener("submit", onClick);
        
    })
}
const deleteFunc = function(project, i, projectNum){
    project.removeItemFromProject(project, i);
    console.log(project.tasks);
    project.tasksDom[i].remove();
    //delete project.tasksDom[i];
    project.tasksDom = [];
    //console.log(project.tasksDom);

    resetContent(projectNum)
    var projectDiv = document.querySelector(`.project[projectnum="${projectNum}"]`);
    loadTasks(project,projectNum, projectDiv);
    
}


const completeFunc = function(project, task, index){
    task.setCompleted(true);
    console.log(project.tasksDom[index]);
    var taskNode = project.tasksDom[index];
    taskNode.parentNode.parentNode.appendChild(project.tasksDom[index].parentNode);
    taskNode.parentNode.classList.toggle("complete");
    
   
    

}
const loadTasks = function(project, index, projectDiv){
    
    
    for(let i = 0; i < project.tasks.length; i++){
            var taskBox = document.createElement('div');
            taskBox.classList.add("taskBox")

            var checkBox= document.createElement('input');
            checkBox.setAttribute('type', 'checkbox');
            checkBox.addEventListener('click', function complete(){
                completeFunc(project, project.tasks[i], i);
                
            })


            taskBox.appendChild(checkBox)


            var newTaskElement = document.createElement('div');
            var newTaskTitle = document.createElement('h4');
            var newTaskDueDate = document.createElement('div');

            newTaskDueDate.classList.add("dueDate");




    
            newTaskTitle.innerHTML = project.tasks[i].getTitle();
            newTaskDueDate.innerHTML = project.tasks[i].getDueDate();
    
            //create buttons
            var buttonDiv = document.createElement('div');
            buttonDiv.setAttribute('id', "toDoButtons");
    
    
            var editButton = document.createElement('button');
            editButton.setAttribute('id', "edit");
            editButton.innerHTML = "Edit";
            editButton.addEventListener('click', function edit(){
                
                editFunc(project, i);
            })
    
    
    
            var deleteButton = document.createElement('button');
            deleteButton.setAttribute('id', 'delete');
            deleteButton.innerHTML = "Delete";
            deleteButton.addEventListener('click', function(){
                deleteFunc(project, i, index); //look i may of renamed projectNum to index but it's fine
            })
    
    
    
            
    
    
            buttonDiv.append(editButton, deleteButton);
    
    
    
    
            
            
            newTaskElement.append(newTaskTitle, newTaskDueDate, buttonDiv);
            newTaskElement.classList.add("taskItem");
            taskBox.appendChild(newTaskElement);
            project.tasksDom.push(newTaskElement);
            
            projectDiv.appendChild(taskBox);
            
        
    }
}
const createProjectDiv = function(project, projectNum){
    //stores project info
    var projectDiv = document.createElement('div');
    projectDiv.classList.add("project");



    
    var projectTitle = document.createElement('div');
    var title = document.createElement("div");
    title.innerHTML = project.getTitle();
    projectTitle.appendChild(title);
    projectTitle.classList.add("projectTitle");
    

    var editTitleButton = document.createElement('button');
    const icon = new Image();
    icon.src = pencil;
    
    editTitleButton.addEventListener('click', function title(){
        openModal(titleModal);
        changeTitle(project, projectNum);
    })
    


    editTitleButton.appendChild(icon);
    projectTitle.appendChild(editTitleButton);

    projectDiv.appendChild(projectTitle);
    
    loadTasks(project, projectNum, projectDiv);

    projectDiv.setAttribute("projectNum", projectNum);
        
    
    return projectDiv;
}
const createTempProj = function(projectString){
    var tempProj = new handler.ProjectClass(projectString.projectTitle);
    if(projectString.tasks){
        for(let i = 0; i < projectString.tasks.length; i++){
            var task = projectString.tasks[i];
            
            tempProj.addItemToProject(task.title, task.dueDate, task.priority);
        }
    }

    return tempProj;
}
const toDoListUIHandler = (function(){
    const loadProjects = function(projectList){
        //load a project and all it's todo items
        var numProjects = projectList.length;
        console.log(projectList);
        console.log(numProjects);
        if(numProjects == 0){
            contentDiv.innerHTML = "There are no projects at this time";
            
            return;
        }
        for(let i = 0; i < numProjects; i++){
            var newProject = createTempProj(projectList[i]);
            var newProjectDiv = createProjectDiv(newProject, i + 1);
            
            contentDiv.appendChild(newProjectDiv);
        }
        
    }
    const addProject = function(project){
        var newProject = createTempProj(project);
        var newProjectDiv = createProjectDiv(newProject, handler.projectHandler.getAllProjects().length);
            
        contentDiv.appendChild(newProjectDiv);
    }
    return {loadProjects, addProject};
})();


for(let i = 0; i < closeModalBtn.length; i++){
    closeModalBtn[i].addEventListener('click', function(){
        closeModal(closeModalBtn[i].parentNode.parentNode)
    })
}




//test code

//update projects array from localStorage
var savedProjects = JSON.parse(localStorage.getItem("allProjects"));
console.log(savedProjects);
for(let i = 0 ; i < savedProjects.length; i++ ){
    var newproj = handler.projectHandler.createNewProject(savedProjects[i].projectTitle);
    for(let j = 0; j < savedProjects[i].tasks.length; j++){
        
        
        newproj.addItemToProject(savedProjects[i].tasks[j].title, savedProjects[i].tasks[j].dueDate, savedProjects[i].tasks[j].priority);
    }
}


// var testProj = handler.projectHandler.getAllProjects()[0];
// testProj.addItemToProject("Test title 1", format(new Date(2024, 10, 30), "MM/dd/yyyy"), 4)


console.log(localStorage.getItem("allProjects"));



toDoListUIHandler.loadProjects(handler.projectHandler.getAllProjects());
console.log(JSON.parse(localStorage.getItem("allProjects")).length);
//localStorage.setItem("allProjects", JSON.stringify(handler.projectHandler.getAllProjects()));