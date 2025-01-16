import * as Project from "../components/Project.js";
import * as ProjectManager from "../modules/ProjectManager.js";
import * as LocalStorage from "../modules/LocalStorage.js";
import * as DateFormat from "./DateFormat.js";
import * as TodoManager from "./TodoManager.js";

export function hideDialog() {
  let dialog = document.querySelector("dialog");

  if (dialog) dialog.remove();
}

export function showCreateProject() {

  // Dialog configuration.
  hideDialog();

  let cancelBtn;
  let editBtn;
  let projectName;

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

  main.appendChild(dialog);

  // Dialog items configuration.
  cancelBtn = dialog.querySelector(".cancel");
  editBtn = dialog.querySelector(".create");
  projectName = dialog.querySelector("#project-name");

  cancelBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    hideDialog();
    dialog.close();
  });

  editBtn.addEventListener("click", (e)=>{
    if (projectName.value) {
      ProjectManager.addProject(Project.createProject(projectName.value));
      LocalStorage.updateProjects();
      ProjectManager.updateProjectsView();
    }
  });
}

export function showEditProject() {

  // Dialog configuration.
  hideDialog();

  let cancelBtn;
  let editBtn;
  let projectName;

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

  main.appendChild(dialog);

  // Dialog items configuration.
  cancelBtn = dialog.querySelector(".cancel");
  editBtn = dialog.querySelector(".edit");
  projectName = dialog.querySelector("#project-name");

  cancelBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    hideDialog();
  });

  editBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    ProjectManager.setProjectTitle(getDialogProjectId(), projectName.value);

    LocalStorage.updateProjects(); 
    ProjectManager.updateProjectsView();

    hideDialog();
  });
}

export function seActiveProjectName(newName) {
  const projectName = document.querySelector("dialog #project-name");
  projectName.value = newName;
}

export function getDialogProjectId() {
  return document.querySelector("dialog").getAttribute("data-id");
}

export function setDialogProjectId(id) {
  const dialog = document.querySelector("dialog");
  dialog.setAttribute("data-id", id);
}

export function showCreateTodo() {

  // Dialog configuration.
  hideDialog();

  let cancelBtn;
  let createBtn;

  let todoName;
  let todoDescription;
  let todoDueDate;
  let todoPriority;

  const main = document.querySelector("main");  
  const dialog = document.createElement("dialog");
        dialog.setAttribute("open", "open");
        dialog.classList.add("todo-dialog");
  
  dialog.innerHTML = `<div class="header">
                      <box-icon type="solid" 
                                name="package"
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
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                      </div>

                      <div class="buttons">
                        <button class="cancel">Cancel</button>
                        <button class="create">Create</button>
                      </div>
                    </form>`

  todoName = dialog.querySelector("#todo-name");
  todoDescription = dialog.querySelector("#todo-description");
  todoDueDate = dialog.querySelector("#todo-dueDate");
  todoPriority = dialog.querySelector("#todo-priority");

  cancelBtn = dialog.querySelector(".cancel");
  createBtn = dialog.querySelector(".create");

  cancelBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    hideDialog();
    dialog.close();
  });

  createBtn.addEventListener("click", ()=>{
    return
  });

  main.appendChild(dialog);
}