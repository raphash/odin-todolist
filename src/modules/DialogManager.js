import * as Project from "../components/Project.js";
import * as ProjectManager from "../modules/ProjectManager.js";
import * as LocalStorage from "../modules/LocalStorage.js";

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

export function setDialogProjectName(newName) {
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