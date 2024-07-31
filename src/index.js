

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

const projectHandler = (function(){
    const removeItemFromProject = function(toDoItem){
        toDoItem = null;
    }

    const addItemToProject = function(project){
        var title =  prompt("Title: ");
        var description = prompt("Description: ");
        var dueDate = prompt("dueDate");
        var priority = prompt("Priority");

        var newItem = new toDoItem(title, description, dueDate, priority);
        project.addTask(newItem);
    }
    return{removeItemFromProject,addItemToProject}
})();


console.log("Hello!");

var sampleProject = new project("Sample");
/*
toDoItemHandler.addItemToProject(sampleProject);
for(let i = 0; i < sampleProject.tasks.length; i++){
    sampleProject.tasks[i].printItem();
}
*/
var loop = true;
var projects = []
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



