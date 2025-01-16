import * as ProjectManager from "./ProjectManager.js";
import * as DialogManager from "./DialogManager.js";

const todos = [];

// Adds a todo to todos array of specific project.
export function addTodo(projectId, todo) {
  if (ProjectManager.getProject(projectId)) {
    ProjectManager.getProject(projectId)["todos"].push(todo);
  }
}

export function clearTodos() {
  todos.splice(0, todos.length);
}

// Get all todos of specific project and set it to todos array.
export function updateTodos(projectId) {
  if (ProjectManager.getProject(projectId)) {
    const projectTodos = ProjectManager.getProject(projectId).todos;
    
    clearTodos();

    for (const todo of projectTodos) {
      todos.push(todo);
    }
  }
}

export function getTodos() {
  return todos;
}

export function setCurrentProjectViewTitle(projectId) {
  const title = document.querySelector(".currentProject .title");
        title.textContent = ProjectManager.getProject(projectId).title;
}

const TodoManager = (function() {
  const addTodo = document.querySelector(".add-todo");
  
  addTodo.addEventListener("click", ()=>{
    DialogManager.showCreateTodo();
  });
})();