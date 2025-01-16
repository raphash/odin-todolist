import * as ProjectManager from "../modules/ProjectManager.js";
import * as LocalStorage from "../modules/LocalStorage.js";
import * as DialogManager from "../modules/DialogManager.js";
import * as TodoManager from "../modules/TodoManager.js";

import uniqid from 'uniqid';

export function createProject(title) {
  return { 
    title,
    id: uniqid(),
    todos: []
   };
}

export function renderProjectCard(project) {
  let deleteBtn;
  let editBtn;
  
  const projects = document.querySelector(".projects");
  const projectCard = document.createElement("div");
        projectCard.classList.add("project");
        projectCard.setAttribute("data-id", project.id);
        
  projectCard.innerHTML = `<p class="title">${project.title}</p>          
                          <div class="buttons">
                            <box-icon name='edit' color="#6fed72" class="edit-project"></box-icon>
                            <box-icon name='trash-alt' color="#5c73f6" class="delete-project"></box-icon>
                          </div>`;

  projects.appendChild(projectCard);

  deleteBtn = projectCard.querySelector(".delete-project");
  editBtn = projectCard.querySelector(".edit-project");

  // User projectCard interface interaction listeners.
  projectCard.addEventListener("click", (e)=>{
    e.stopPropagation();

    const projectId = projectCard.getAttribute("data-id");

    LocalStorage.saveCurrentProjectId(projectId);
    TodoManager.setCurrentProjectViewTitle(projectId);
    TodoManager.updateTodos(LocalStorage.getCurrentProjectId());
  });
  
  deleteBtn.addEventListener("click", (e)=>{
    e.stopPropagation();

    ProjectManager.removeProject(project);
    LocalStorage.updateProjects();
    ProjectManager.updateProjectsView();
  });

  editBtn.addEventListener("click", (e)=>{
    e.stopPropagation();

    DialogManager.showEditProject();
    DialogManager.seActiveProjectName(project.title);
    DialogManager.setDialogProjectId(project.id);
  });
}