import * as handler from "./index.js"

const contentDiv = document.getElementById('allprojects')

const createProjectDiv = function(project){
    //stores project info
    var projectDiv = document.createElement('div');
    
    var projectTitle = document.createElement('h2');
    projectTitle.innerHTML = project.getTitle();
    //load tasks
    for(let i = 0; i < project.tasks.length; i++){
        var newTaskElement = document.createElement('div');
        var newTaskTitle = document.createElement('h4');
        var newTaskDescription = document.createElement('p');
        var newTaskDueDate = document.createElement('h3');

        newTaskTitle.innerHTML = project.tasks[i].getTitle();
        newTaskDescription.innerHTML = project.tasks[i].getDescription();
        newTaskDueDate.innerHTML = project.tasks[i].getDueDate();

        newTaskElement.appendChild(newTaskTitle, newTaskDescription, newTaskDueDate);
        projectDiv.appendChild(newTaskElement);
    }
    projectDiv.appendChild(projectTitle);

    return projectDiv;
}

const toDoListUIHandler = (function(){
    const loadProjects = function(projectList){
        //load a project and all it's todo items
        var numProjects = projectList.length;
        for(let i = 0; i < numProjects; i++){
            var newProjectDiv = createProjectDiv();
            
        }


        
    }
})();
console.log("Hello!");
//let handler = new logicHandler();
