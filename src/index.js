

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
        console.log("Due Date: " + this.date);

    }

}

class project{
    constructor(projectTitle){
        this.projectTitle = projectitle;
    }
}


const toDoItemHandler = (function(){
    const addItemToProject = function(project){
        var title =  prompt("Title: ");
        var description = prompt("Description: ");
        var dueDate = prompt("dueDate");
        var priority = prompt("Priority");

        var newItem = toDoItem(title, description, dueDate, priority);
        project.addTask(newItem);
    }


})();

console.log("Hello!");