import * as handler from "./index.js"
import "./style.scss";

const contentDiv = document.getElementById('allprojects');
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const editForm = document.getElementById('editForm');
const closeModalBtn = document.querySelector(".btn-close");

// class projectDom extends handler.ProjectClass{
//     constructor(title){
//         handler.projectHandler.createNewProject(title);
//         this.toDoListItems = [];
//     }
// }


const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

const editFunc = function(item, i){
    openModal();
    editForm.addEventListener("submit", function onClick(e){
        console.log("hi");
        e.preventDefault();
        const data = new FormData(e.target);
        if(data.get("title")){
            item.childNodes[0].innerHTML = data.get("title");
            
        }
        closeModal();
        this.removeEventListener("submit", onClick);
        
    })
}

const createProjectDiv = function(project){
    //stores project info
    var projectDiv = document.createElement('div');
    projectDiv.classList.add("project");


    
    var projectTitle = document.createElement('h2');
    projectTitle.innerHTML = project.getTitle();
    //load tasks
    projectDiv.appendChild(projectTitle);
    for(let i = 0; i < project.tasks.length; i++){
        var newTaskElement = document.createElement('div');
        var newTaskTitle = document.createElement('h4');
        var newTaskDescription = document.createElement('p');
        var newTaskDueDate = document.createElement('h3');

        newTaskTitle.innerHTML = project.tasks[i].getTitle();
        newTaskDescription.innerHTML = project.tasks[i].getDescription();
        newTaskDueDate.innerHTML = project.tasks[i].getDueDate();

        //create buttons
        var buttonDiv = document.createElement('div');
        buttonDiv.setAttribute('id', "toDoButtons");


        var editButton = document.createElement('button');
        editButton.setAttribute('id', "edit");
        editButton.innerHTML = "Edit";
        editButton.addEventListener('click', function(){
            
            editFunc(project.tasksDom[i], i);
        })



        var deleteButton = document.createElement('button');
        deleteButton.setAttribute('id', 'delete');
        deleteButton.innerHTML = "Delete";
        var completeButton = document.createElement('button');
        completeButton.setAttribute('id', "complete");
        completeButton.innerHTML = "Complete";


        buttonDiv.append(editButton, deleteButton, completeButton);




        
        
        newTaskElement.append(newTaskTitle, newTaskDescription, newTaskDueDate, buttonDiv);
        project.tasksDom.push(newTaskElement);
        
        projectDiv.appendChild(newTaskElement);
        console.log(project.tasksDom);
    }
    

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
            var newProjectDiv = createProjectDiv(projectList[i]);
            contentDiv.appendChild(newProjectDiv);
        }
        
    }
    return {loadProjects};
})();

const findtoDoItem = function(project, index){
    return project.tasks[index];
}

closeModalBtn.addEventListener('click', closeModal);




//test code
handler.projectHandler.createNewProject("Test Project Title");
var sampleProject = handler.projectHandler.getAllProjects()[0];
sampleProject.addItemToProject("Test title", "Test description", "Never", 4);
toDoListUIHandler.loadProjects(handler.projectHandler.getAllProjects());
