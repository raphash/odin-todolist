import * as ProjectManager from "./ProjectManager.js";
import * as DialogManager from "./DialogManager.js";
import * as LocalStorage from "./LocalStorage.js";
import * as Todo from "../components/Todo.js";

const todos = [];

// Adds a todo to todos array of specific project.
export function addProjectTodo(projectId, todo) {
  const targetProject = ProjectManager.getProject(projectId);
  const isProjectsEmpty = ProjectManager.isProjectsEmpty();

  if (targetProject) {
    targetProject["todos"].push(todo);
  } 
  else if (!isProjectsEmpty) {
    ProjectManager.getProject(ProjectManager.getProjects()[0].id)["todos"].push(todo);
  }
  else  {
    ProjectManager.initialSetup();
    ProjectManager.getProject(LocalStorage.getCurrentProjectId())["todos"].push(todo);
  };
}

export function getProjectTodos(projectId) {
  const project = ProjectManager.getProject(projectId);
  if (project) return project.todos;
}

// Remove todo from project id and todoId.
export function removeProjectTodo(projectId, todoId) {
  const project = ProjectManager.getProject(projectId);
  const projectTodos = project.todos;

  if (project) {
    for (const todo of project.todos) {
      if (todo.id == todoId) {
        project["todos"].splice(projectTodos.indexOf(todo), 1);
      }
    }
  }
}

export function editProjectTodo(projectId, todoId, { title, description, dueDate, priority }) {
  const project = ProjectManager.getProject(projectId);

  if (project) {
    for (const todo of project.todos) {
      if (todo.id == todoId) {
        todo.title = title;
        todo.description = description;
        todo.dueDate = dueDate;
        todo.priority = priority;
      }
    }
  }
}

export function clearTodos() {
  todos.splice(0, todos.length);
}

// Get all todos of specific project and set it to todos array.
export function updateTodos(projectId) {
  function updateProjectTodos(id) {
    const projectTodos = ProjectManager.getProject(id).todos;
    clearTodos();
    todos.push(...projectTodos);
  }

  if (!ProjectManager.isProjectsEmpty()) {
    const project = ProjectManager.getProject(projectId) || ProjectManager.getProjects()[0];
    updateProjectTodos(project.id);
  }
}

export function getTodos() {
  return todos;
}

export function setHeaderTitle(projectId) {
  const headerTitle = document.querySelector(".currentProject .title");

  if (ProjectManager.isProjectsEmpty()) {
    headerTitle.textContent = "None";
    return;
  }

  const project = ProjectManager.getProject(projectId) || ProjectManager.getProjects()[0];

  headerTitle.textContent = project.title;
}

export function clearTodosView() {
  const todos = document.querySelector(".todos");
        todos.innerHTML = "";
}

export function updateTodosView(projectId) {
  clearTodosView();
  updateTodos(projectId);

  if (todos.length) {
    todos.map(todo => Todo.createCard(todo));
  }
}

const TodoManager = (function() {
  const addTodoBtn = document.querySelector(".add-todo");
  
  addTodoBtn.addEventListener("click", ()=>{
    DialogManager.showCreateTodoDialog();
  });
})();