import * as handler from "./index.js"

const contentDiv = document.getElementById('allprojects');

const createProjectDiv = function(project){
    //stores project info
    var projectDiv = document.createElement('div');
    
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

        

        newTaskElement.appendChild(newTaskTitle);
        newTaskElement.appendChild(newTaskDescription);
        newTaskElement.appendChild(newTaskDueDate);
        projectDiv.appendChild(newTaskElement);
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
console.log("Hello!");
//test code
handler.projectHandler.createNewProject("Test Project Title");
var sampleProject = handler.projectHandler.getAllProjects()[0];
handler.projectHandler.addItemToProject(sampleProject, "Test Item", "This is a test description.", "Never", "4")
toDoListUIHandler.loadProjects(handler.projectHandler.getAllProjects());
