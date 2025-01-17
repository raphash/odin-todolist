import * as ProjectManager from "../modules/ProjectManager.js";
import * as LocalStorage from "../modules/LocalStorage.js";
import * as DialogManager from "../modules/DialogManager.js";
import * as TodoManager from "../modules/TodoManager.js";

import uniqid from 'uniqid';

export function createProject(title) {
  return { title, todos: [], id: uniqid() };
}

export function createCard(project) {
  const projects = document.querySelector(".projects");
  const projectCard = document.createElement("div");
        projectCard.classList.add("project");
        projectCard.setAttribute("data-id", project.id);
        
  projectCard.innerHTML = `<p class="title">${project.title}</p>          
                          <div class="buttons">
                            <box-icon name='edit' color="#5c73f6" class="edit-project" title="Edit Project"></box-icon>
                            <box-icon name='trash-alt' color="#f65c5c" class="delete-project" title="Delete Project"></box-icon>
                          </div>`;

  projects.appendChild(projectCard);

  let deleteBtn = projectCard.querySelector(".delete-project");
  let editBtn = projectCard.querySelector(".edit-project");
  let projectId = projectCard.getAttribute("data-id");

  // User projectCard interface interaction listeners.
  projectCard.addEventListener("click", (e)=>{
    e.stopPropagation();

    LocalStorage.saveCurrentProjectId(projectId);
    TodoManager.setHeaderTitle(LocalStorage.getCurrentProjectId());
    TodoManager.updateTodosView(projectId);
  });
  
  deleteBtn.addEventListener("click", (e)=>{
    e.stopPropagation();

    TodoManager.clearTodos();
    TodoManager.clearTodosView();

    ProjectManager.removeProject(project);

    TodoManager.setHeaderTitle(LocalStorage.getCurrentProjectId());
    TodoManager.updateTodos(LocalStorage.getCurrentProjectId());
    TodoManager.updateTodosView(LocalStorage.getCurrentProjectId());
    
    ProjectManager.updateProjectsView();
  });

  editBtn.addEventListener("click", (e)=>{
    e.stopPropagation();

    DialogManager.showEditProjectDialog();
    DialogManager.setEditDialogInfo(project.title);
    DialogManager.setDialogTargetId(project.id);
  });
}