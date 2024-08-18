

class toDoItem{
    
    constructor(title,  dueDate, priority){
        this.title = title;
        
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
        
        console.log("Due Date: " + this.dueDate);

    }

}

class project{
    constructor(projectTitle){
        this.projectTitle = projectTitle;
        
        this.tasks = [];
        this.tasksDom = [];
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

    removeItemFromProject(project, i){
        //delete project.tasks[i];
        project.tasks.splice(i, 1);
    }

    addItemToProject( title, dueDate, priority){
        var newItem = new toDoItem(title, dueDate, priority);
        this.addTask(newItem);
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
        var newproj = new project(title);
        projects.push(newproj);
        return newproj;
    }


    const getAllProjects = function(){
        return this.projects;
    }

    return{projects, getAllProjects, createNewProject}
})();


export {toDoItem as ItemClass ,project as ProjectClass,toDoItemHandler,projectHandler};



