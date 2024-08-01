

class toDoItem{
    
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = false;
    }

    //getter and setters

    getTitle(){
        return this.title;
    }
    setTitle(newTitle){
        this.title = newTitle;
    }
    
    getDescription(){
        return this.description;
    }
    setDescription(newDesc){
        this.description = newDesc;
    }

    getDueDate(){
        return this.dueDate;
    }

    setDueDate(newDate){
        this.dueDate = newDate;
    }

    isComplete(){
        return this.isDone;
    }

    setCompleted(isComplete){
        isComplete ? this.isDone = true : this.isDone = false;
    }

    printItem(){
        console.log(this.title);
        console.log(this.description);
        console.log("Due Date: " + this.dueDate);

    }

}

class project{
    constructor(projectTitle){
        this.projectTitle = projectTitle;
        
        this.tasks = [];
    }
    
    addTask(newItem){
        this.tasks.push(newItem);
    }
    getTitle(){
        return this.projectTitle;
    }
    setTitle(newTitle){
        this.projectTitle = newTitle;
    }

    getTasks(){
        return this.tasks;
    }
    
}


const toDoItemHandler = (function(){
    const completeItem = function(item){
        item.setCompleted(true);
    }
    const uncompleteItem = function(item){
        item.setCompleted(false);
    }
    const deleteItem = function(item){
        item = null;
    }
    return{ completeItem, uncompleteItem, deleteItem};
})();
//The projectHandler deals with creating new projects, removing items from a project, and adding items to a project
const projectHandler = (function(){
    
    const projects = [];
    
    const createNewProject = function(title){
        projects.push(new project(title));
    }


    const removeItemFromProject = function(toDoItem){
        toDoItemHandler.deleteItem(toDoItem);
    }

    const addItemToProject = function(project){
        var title =  prompt("Title: ");
        var description = prompt("Description: ");
        var dueDate = prompt("dueDate");
        var priority = prompt("Priority");

        var newItem = new toDoItem(title, description, dueDate, priority);
        project.addTask(newItem);
    }

    const getAllProjects = function(){
        return this.projects;
    }

    return{getAllProjects, createNewProject,removeItemFromProject,addItemToProject}
})();

//console.log("Hello!");

/*
toDoItemHandler.addItemToProject(sampleProject);
for(let i = 0; i < sampleProject.tasks.length; i++){
    sampleProject.tasks[i].printItem();
}
*/

/*
while(loop){
    let enter = prompt("Enter a project name: ");
    var newProject = new project(enter);
    projects.push(newProject);

    let addNew = prompt("Would you like to add a new to-do item?: ");
    if(addNew == "No"){
        break;
    }else if(addNew == "Yes"){
        projectHandler.addItemToProject(newProject);
        break;
    }
}
*/
export {toDoItem as ItemClass ,project as ProjectClass,toDoItemHandler,projectHandler};



