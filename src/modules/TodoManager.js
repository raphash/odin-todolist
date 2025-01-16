import * as ProjectManager from "./ProjectManager.js";
import * as DialogManager from "./DialogManager.js";
import * as LocalStorage from "./LocalStorage.js";
import * as Todo from "../components/Todo.js";

const todos = [];

// Adds a todo to todos array of specific project.
export function addTodo(projectId, todo) {
  const project = ProjectManager.getProject(projectId);

  if (project) {
    project["todos"].push(todo);
    return;
  } 

  if (!project && !ProjectManager.isProjectsEmpty()) {
    ProjectManager.getProject(ProjectManager.getProjects()[0].id)["todos"].push(todo);
  }

  // Add the todo to target project if it exists.
  if (ProjectManager.isProjectsEmpty()) {
    ProjectManager.initialSetup();
    ProjectManager.getProject(LocalStorage.getCurrentProjectId())["todos"].push(todo);
    return;
  };
}

// Clear all temporary saved todos.
export function clearTodos() {
  todos.splice(0, todos.length);
}

// Get all todos of specific project and set it to todos array.
export function updateTodos(projectId) {
  function updateTodos(projectId) {
    const projectTodos = ProjectManager.getProject(projectId).todos;
    
    clearTodos();

    for (const todo of projectTodos) {
      todos.push(todo);
    }
  }

  // Set the first project todos if project with projectId does exists.
  if (!ProjectManager.isProjectsEmpty() &&
      !ProjectManager.getProject(projectId)) {
        updateTodos(ProjectManager.getProjects()[0].id);
        return;
  }

  if (ProjectManager.getProject(projectId)) {
    updateTodos(projectId);
    return;
  }
}

export function getTodos() {
  return todos;
}

export function setHeaderTitle(projectId) {
  const headerTitle = document.querySelector(".currentProject .title");

  if (!ProjectManager.isProjectsEmpty() &&
      !ProjectManager.getProject(projectId)) {
      headerTitle.textContent = ProjectManager.getProjects()[0].title;
      return;
  }

  if (ProjectManager.isProjectsEmpty()) {
    headerTitle.textContent = "None"
    return;
  }

  headerTitle.textContent = ProjectManager.getProject(projectId).title;
}

export function clearTodosView() {
  const todos = document.querySelector(".todos");
        todos.innerHTML = "";
}

// Render all todos in html.
export function updateTodosView(projectId) {
  clearTodosView();
  updateTodos(projectId);

  if (todos.length > 0) {
    for (const todo of todos) {
      Todo.createCard(todo);
    }
  }
}

const TodoManager = (function() {
  const addTodoBtn = document.querySelector(".add-todo");
  
  addTodoBtn.addEventListener("click", ()=>{
    DialogManager.showCreateTodoDialog();
  });
})();