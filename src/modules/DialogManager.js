import * as Project from "../components/Project.js";
import * as ProjectManager from "../modules/ProjectManager.js";
import * as LocalStorage from "../modules/LocalStorage.js";
import * as DateFormat from "./DateFormat.js";
import * as TodoManager from "./TodoManager.js";
import * as Todo from "../components/Todo.js";

export function removeDialog() {
  let dialog = document.querySelector("dialog");
  if (dialog) dialog.remove();
}

export function showCreateProjectDialog() {

  // Dialog configuration.
  removeDialog();

  const main = document.querySelector("main");  
  const dialog = document.createElement("dialog");
        dialog.setAttribute("open", "open");
        dialog.classList.add("project-dialog");
  
  dialog.innerHTML = `<div class="header">
                      <box-icon type="solid" 
                                name="package"
                                size="md"
                                color="#5c73f6"></box-icon>
                      
                      <p class="title">Create Project</p>
                      <p class="subtitle">
                        Here you can create a new project
                        for this you need to select a title!
                      </p>
                    </div>

                    <form method="dialog">
                      <div class="row">
                        <label for="project-name">Project</label>
                        <input type="text"
                              name="project-name"
                              id="project-name"
                              autocomplete="off"
                              required>
                      </div>

                      <div class="buttons">
                        <button class="cancel">Cancel</button>
                        <button class="create">Create</button>
                      </div>
                    </form>`

  // Dialog items configuration.
  let cancelBtn = dialog.querySelector(".cancel");
  let createBtn = dialog.querySelector(".create");
  let projectName = dialog.querySelector("#project-name");

  cancelBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    removeDialog();
    dialog.close();
  });

  createBtn.addEventListener("click", (e)=>{
    if (projectName.value) {
      ProjectManager.addProject(Project.createProject(projectName.value));
      LocalStorage.updateProjects();
      ProjectManager.updateProjectsView();
    }
  });

  main.appendChild(dialog);
}

export function showEditProjectDialog() {

  // Dialog configuration.
  removeDialog();

  const main = document.querySelector("main");  
  const dialog = document.createElement("dialog");
        dialog.setAttribute("open", "open");
        dialog.classList.add("project-dialog");
  
  dialog.innerHTML = `<div class="header">
                      <box-icon type="solid" 
                                name="edit"
                                size="md"
                                color="#f65c5c"></box-icon>
                      
                      <p class="title">Edit Project</p>
                      <p class="subtitle">
                        Here you can edit a project
                        for this you need to select a new title!
                      </p>
                    </div>

                    <form method="dialog">
                      <div class="row">
                        <label for="project-name">Project</label>
                        <input type="text"
                              name="project-name"
                              id="project-name"
                              autocomplete="off"
                              required>
                      </div>

                      <div class="buttons">
                        <button class="cancel">Cancel</button>
                        <button class="edit">Edit</button>
                      </div>
                    </form>`

  // Dialog items configuration.
  let cancelBtn = dialog.querySelector(".cancel");
  let editBtn = dialog.querySelector(".edit");
  let projectName = dialog.querySelector("#project-name");

  cancelBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    removeDialog();
  });

  editBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    // Update project title, view and header.
    ProjectManager.setProjectTitle(getDialogProjectId(), projectName.value);
    TodoManager.setHeaderTitle(LocalStorage.getCurrentProjectId()); 
    ProjectManager.updateProjectsView();

    removeDialog();
  });

  main.appendChild(dialog);
}

export function setEditDialogInfo(name) {
  const projectName = document.querySelector("dialog #project-name");
  projectName.value = name;
}

export function getDialogProjectId() {
  return document.querySelector("dialog").getAttribute("data-id");
}

export function setDialogTargetId(id) {
  const dialog = document.querySelector("dialog");
  dialog.setAttribute("data-id", id);
}

export function showCreateTodoDialog() {
  removeDialog();

  const main = document.querySelector("main");  
  const dialog = document.createElement("dialog");
        dialog.setAttribute("open", "open");
        dialog.classList.add("todo-dialog");
  
  dialog.innerHTML = `<div class="header">
                      <box-icon name="task"
                                size="md"
                                color="#5c73f6"></box-icon>
                      
                      <p class="title">Create Todo</p>
                      <p class="subtitle">
                        Here you can create a new todo
                        for this you need to select a title,
                        description, dueDate and priority!
                      </p>
                    </div>

                    <form method="dialog">
                      <div class="inputs">
                        <div class="row">
                          <label for="todo-name">Todo</label>
                          <input type="text"
                                name="todo-name"
                                id="todo-name"
                                autocomplete="off"
                                required>
                        </div>

                        <div class="row">
                          <label for="todo-description">Description</label>
                          <input type="text"
                                name="todo-description"
                                id="todo-description"
                                autocomplete="off"
                                required>
                        </div>

                        <div class="row">
                          <label for="todo-dueDate">Due Date</label>
                          <input type="date"
                                  name="todo-dueDate"
                                  id="todo-dueDate"
                                  min="${DateFormat.getFullDate()}"
                                  required>
                        </div>

                        <div class="row">
                          <label for="todo-priority">Priority</label>
                          <select name="todo-priority" id="todo-priority">
                            <option value="low-priority">Low</option>
                            <option value="medium-priority">Medium</option>
                            <option value="high-priority">High</option>
                          </select>
                        </div>
                      </div>

                      <div class="buttons">
                        <button class="cancel">Cancel</button>
                        <button class="create">Create</button>
                      </div>
                    </form>`

  const info = {
    todoTitle: dialog.querySelector("#todo-name"),
    todoDescription: dialog.querySelector("#todo-description"),
    todoDueDate: dialog.querySelector("#todo-dueDate"),
    todoPriority: dialog.querySelector("#todo-priority")
  };
  
  let cancelBtn = dialog.querySelector(".cancel");
  let createBtn = dialog.querySelector(".create");

  cancelBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    removeDialog();
    dialog.close();
  });

  createBtn.addEventListener("click", ()=>{
    // Checks if all inputs is not empty.
    for (const input in info) {
      if (!info[input].value) {
        return;
      }
    }

    const todo =  Todo.createTodo(
      info["todoTitle"].value,
      info["todoDescription"].value,
      info["todoDueDate"].value,
      info["todoPriority"].value
    );

    TodoManager.setHeaderTitle(LocalStorage.getCurrentProjectId());
    TodoManager.addProjectTodo(LocalStorage.getCurrentProjectId(), todo);
    Todo.createCard(todo);
    TodoManager.updateTodos(LocalStorage.getCurrentProjectId());
    LocalStorage.updateProjects();
  });

  main.appendChild(dialog);
}

export function showEditTodoDialog(targetTodo) {
  removeDialog();

  const main = document.querySelector("main");  
  const dialog = document.createElement("dialog");
        dialog.setAttribute("open", "open");
        dialog.classList.add("todo-dialog");
  
  dialog.innerHTML = `<div class="header">
                      <box-icon name="task"
                                size="md"
                                color="#f65c5c"></box-icon>
                      
                      <p class="title">Edit Todo</p>
                      <p class="subtitle">
                        Here you can edit a todo
                        for this you need to select a title,
                        description or due date, etc.
                      </p>
                    </div>

                    <form method="dialog">
                      <div class="inputs">
                        <div class="row">
                          <label for="todo-name">Todo</label>
                          <input type="text"
                                name="todo-name"
                                id="todo-name"
                                autocomplete="off"
                                required>
                        </div>

                        <div class="row">
                          <label for="todo-description">Description</label>
                          <input type="text"
                                name="todo-description"
                                id="todo-description"
                                autocomplete="off"
                                required>
                        </div>

                        <div class="row">
                          <label for="todo-dueDate">Due Date</label>
                          <input type="date"
                                  name="todo-dueDate"
                                  id="todo-dueDate"
                                  required>
                        </div>

                        <div class="row">
                          <label for="todo-priority">Priority</label>
                          <select name="todo-priority" id="todo-priority">
                            <option value="low-priority">Low</option>
                            <option value="medium-priority">Medium</option>
                            <option value="high-priority">High</option>
                          </select>
                        </div>
                      </div>

                      <div class="buttons">
                        <button class="cancel">Cancel</button>
                        <button class="edit">Edit</button>
                      </div>
                    </form>`

  const info = {
    todoTitle: dialog.querySelector("#todo-name"),
    todoDescription: dialog.querySelector("#todo-description"),
    todoDueDate: dialog.querySelector("#todo-dueDate"),
    todoPriority: dialog.querySelector("#todo-priority")
  };

  let cancelBtn = dialog.querySelector(".cancel");
  let editBtn = dialog.querySelector(".edit");

  info["todoTitle"].value = targetTodo.title;
  info["todoDescription"].value = targetTodo.description;
  info["todoDueDate"].value = targetTodo.dueDate;
  info["todoPriority"].value =targetTodo.priority;
  
  cancelBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    removeDialog();
    dialog.close();
  });

  editBtn.addEventListener("click", ()=>{
    const currentProjectId = LocalStorage.getCurrentProjectId();
    
    TodoManager.editProjectTodo(currentProjectId, targetTodo.id, {
      title: info["todoTitle"].value,
      description: info["todoDescription"].value,
      dueDate: info["todoDueDate"].value,
      priority: info["todoPriority"].value
    });

    TodoManager.updateTodos(currentProjectId);
    LocalStorage.updateProjects();
    TodoManager.updateTodosView()
  });

  main.appendChild(dialog);
}