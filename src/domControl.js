import * as handler from "./index.js"
import "./style.scss";
import pencil from "./img/pencil-outline.svg";

const contentDiv = document.getElementById('allprojects');
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const editForm = document.getElementById('editForm');
const closeModalBtn = document.querySelector(".btn-close");


const resetContent = function(index){
    var divToReset = document.querySelector(`.project[projectnum="${index}"]`);
    
    while(divToReset.lastChild.className != "projectTitle"){
        
        if(divToReset.lastChild.getAttribute("id") == "edit"  ){
            divToReset.lastChild.removeEventListener('click', edit);
        }
        else if(divToReset.lastChild.getAttribute("id") == "delete"){
            divToReset.lastChild.removeEventListener('click', del);
        }
        else if(divToReset.lastChild.getAttribute("id") == "complete"){
            divToReset.lastChild.removeEventListener('click', check);
        }
        
        divToReset.lastChild.remove();
        
        
    }
}
const changeTitle = function(project, newtitle){
    project.setTitle(newtitle);

}


const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

const editFunc = function(project, i){
    openModal();
    editForm.addEventListener("submit", function onClick(e){
        
        e.preventDefault();
        const data = new FormData(e.target);
        if(data.get("title")){
            project.tasksDom[i].childNodes[0].innerHTML = data.get("title");
            project.tasks[i].setTitle(data.get("title"));
            console.log(project.tasks[i]);
            
        }
        
        closeModal();
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
    console.log(task);
    var taskNode = project.tasksDom[index];
    taskNode.parentNode.appendChild(project.tasksDom[index]);
    taskNode.classList.toggle("complete");
    
   
    

}
const loadTasks = function(project, index, projectDiv){
    
    
    for(let i = 0; i < project.tasks.length; i++){
        
            var newTaskElement = document.createElement('div');
            var newTaskTitle = document.createElement('h4');
            
            var newTaskDueDate = document.createElement('h3');
    
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
    
    
    
            var completeButton = document.createElement('button');
            completeButton.setAttribute('id', "complete");
            completeButton.innerHTML = "Complete";
            completeButton.addEventListener('click', function check(){
                completeFunc(project, project.tasks[i], i);
            })
    
    
            buttonDiv.append(editButton, deleteButton, completeButton);
    
    
    
    
            
            
            newTaskElement.append(newTaskTitle, newTaskDueDate, buttonDiv);
            project.tasksDom.push(newTaskElement);
            
            projectDiv.appendChild(newTaskElement);
            
        
    }
}
const createProjectDiv = function(project, projectNum){
    //stores project info
    var projectDiv = document.createElement('div');
    projectDiv.classList.add("project");



    
    var projectTitle = document.createElement('div');
    projectTitle.innerHTML = project.getTitle();
    projectTitle.classList.add("projectTitle");

    var editTitleButton = document.createElement('button');
    const icon = new Image();
    icon.src = pencil;
    editTitleButton.addEventListener('click', function title(){
        changeTitle();
    })


    editTitleButton.appendChild(icon);
    projectTitle.appendChild(editTitleButton);

    projectDiv.appendChild(projectTitle);
    
    loadTasks(project, projectNum, projectDiv);

    projectDiv.setAttribute("projectNum", projectNum);
        
    console.log(project.tasksDom);
    return projectDiv;
}

const toDoListUIHandler = (function(){
    const loadProjects = function(projectList){
        //load a project and all it's todo items
        var numProjects = projectList.length;
        console.log(numProjects);
        if(numProjects == 0){
            contentDiv.innerHTML = "There are no projects at this time";
            return;
        }
        for(let i = 0; i < numProjects; i++){
            var newProjectDiv = createProjectDiv(projectList[i], i + 1);
            
            contentDiv.appendChild(newProjectDiv);
        }
        
    }
    return {loadProjects};
})();


closeModalBtn.addEventListener('click', closeModal);




//test code
handler.projectHandler.createNewProject("Test Project Title");
handler.projectHandler.createNewProject("Another Project");
var sampleProject = handler.projectHandler.getAllProjects()[0];
var sampleProject2 = handler.projectHandler.getAllProjects()[1];
sampleProject.addItemToProject("Test title", "Test description", "Never", 4);
sampleProject.addItemToProject("Test title 2", "Test description 2", "Never 2", 4);

sampleProject2.addItemToProject("another test", "cool description", "soon?", 3);
toDoListUIHandler.loadProjects(handler.projectHandler.getAllProjects());
