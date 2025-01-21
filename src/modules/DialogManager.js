import * as Project from "../components/Project.js";
import * as ProjectManager from "../modules/ProjectManager.js";
import * as LocalStorage from "../modules/LocalStorage.js";
import * as DateFormat from "./DateFormat.js";
import * as TodoManager from "./TodoManager.js";
import * as Todo from "../components/Todo.js";
import * as Utils from "./Utils.js";

export function openDialog(dialog) {
  const main = document.querySelector("main");
  main.appendChild(dialog);
}

export function closeDialog() {
  let dialog = document.querySelector("dialog");
  if (dialog) dialog.remove();
}

export function createDialog(dialogType) {
  closeDialog();

  const dialog = document.createElement("dialog");
        dialog.setAttribute("open", "open");
        dialog.classList.add(dialogType);

  return dialog;
}

export function showCreateProjectDialog() {

  const dialog = createDialog("project-dialog");
  
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
  const cancelBtn = dialog.querySelector(".cancel");
  const createBtn = dialog.querySelector(".create");
  const projectName = dialog.querySelector("#project-name");
  const form = dialog.querySelector("form");

  cancelBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    closeDialog();
  });

  createBtn.addEventListener("click", (e)=>{
    if (projectName.checkValidity()) {
      ProjectManager.addProject(Project.createProject(projectName.value));
      LocalStorage.updateProjects();
      ProjectManager.updateProjectsView();
    }
  });

  openDialog(dialog);
}

export function showEditProjectDialog() {

  const dialog = createDialog("project-dialog");
  
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
  const cancelBtn = dialog.querySelector(".cancel");
  const editBtn = dialog.querySelector(".edit");
  const projectName = dialog.querySelector("#project-name");

  cancelBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    closeDialog();
  });

  editBtn.addEventListener("click", (e)=>{
    e.preventDefault();;

    // Update project title, view and header.
    ProjectManager.setProjectTitle(getDialogProjectId(), projectName.value);
    TodoManager.setHeaderTitle(LocalStorage.getCurrentProjectId()); 
    ProjectManager.updateProjectsView();

    closeDialog();
  });

  openDialog(dialog);
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

  const dialog = createDialog("todo-dialog");
  
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
                          <textarea name="todo-description"
                                    id="todo-description"
                                    required></textarea>
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

  const form = dialog.querySelector("form");
  const title = dialog.querySelector("#todo-name");
  const description = dialog.querySelector("#todo-description");
  const dueDate = dialog.querySelector("#todo-dueDate");
  const priority = dialog.querySelector("#todo-priority");
  const cancelBtn = dialog.querySelector(".cancel");
  const createBtn = dialog.querySelector(".create");

  const inputs = [ title, description, dueDate, priority ];

  cancelBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    closeDialog();
  });

  createBtn.addEventListener("click", (e)=>{
    const currentProjectId = LocalStorage.getCurrentProjectId();

    if (form.checkValidity()) {
      const todo = Todo.createTodo(
        title.value,
        description.value,
        dueDate.value,
        priority.value
      );
  
      TodoManager.setHeaderTitle(currentProjectId);
      TodoManager.addProjectTodo(currentProjectId, todo);
      Todo.createCard(todo);
      TodoManager.updateTodos(currentProjectId);
      LocalStorage.updateProjects();
    }
  });

  openDialog(dialog);
}

export function showEditTodoDialog(targetTodo) {

  const dialog = createDialog("todo-dialog");
  
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
                          <textarea name="todo-description"
                                    id="todo-description"
                                    required></textarea>
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

  const title = dialog.querySelector("#todo-name");
  const description = dialog.querySelector("#todo-description");
  const dueDate = dialog.querySelector("#todo-dueDate");
  const priority = dialog.querySelector("#todo-priority");
  const cancelBtn = dialog.querySelector(".cancel");
  const editBtn = dialog.querySelector(".edit");

  title.value = targetTodo.title;
  description.value = targetTodo.description;
  dueDate.value = targetTodo.dueDate;
  priority.value = targetTodo.priority;
  
  cancelBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    closeDialog();
  });

  editBtn.addEventListener("click", (e)=>{
    const currentProjectId = LocalStorage.getCurrentProjectId();
    
    TodoManager.editProjectTodo(currentProjectId, targetTodo.id, {
      title: title.value,
      description: description.value,
      dueDate: dueDate.value,
      priority: priority.value
    });

    TodoManager.updateTodos(currentProjectId);
    LocalStorage.updateProjects();
    TodoManager.updateTodosView()
  });

  openDialog(dialog);
}

export function showViewTodoDialog(targetTodo) {
  const dialog = createDialog("view-dialog");

  dialog.innerHTML = `<div class="header">
                      <box-icon name="show"
                                size="md"
                                color="#f65c5c"></box-icon>
                      
                      <p class="title">View Todo</p>
                      <p class="subtitle">
                        Here you can view a view
                        information better!
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
                                disabled>
                        </div>

                        <div class="row">
                          <label for="todo-description">Description</label>
                          <textarea name="todo-description"
                                    id="todo-description"
                                    disabled></textarea>
                        </div>

                        <div class="row">
                          <label for="todo-dueDate">Due Date</label>
                          <input type="date"
                                  name="todo-dueDate"
                                  id="todo-dueDate"
                                  disabled>
                        </div>

                        <div class="row">
                          <label for="todo-priority">Priority</label>
                          <input name="todo-priority" id="todo-priority" disabled>
                        </div>
                      </div>

                      <div class="buttons">
                        <button class="cancel">Close</button>
                      </div>
                    </form>`

  const title = dialog.querySelector("#todo-name");
  const description = dialog.querySelector("#todo-description");
  const dueDate = dialog.querySelector("#todo-dueDate");
  const priority = dialog.querySelector("#todo-priority");

  title.value = targetTodo.title;
  description.value = targetTodo.description;
  dueDate.value = targetTodo.dueDate;
  priority.value = Utils.capitalize(targetTodo.priority);

  openDialog(dialog);
}