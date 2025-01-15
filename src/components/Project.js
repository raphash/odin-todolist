import * as ProjectManager from "../modules/ProjectManager.js";
import * as LocalStorage from "../modules/LocalStorage.js";
import uniqid from 'uniqid';

export function createProject(title) {
  return { 
    title,
    id: uniqid()
   };
}

export function renderProjectCard(project) {
  let deleteBtn;
  
  const projects = document.querySelector(".projects");
  const projectCard = document.createElement("div");
        projectCard.classList.add("project");
        
  projectCard.innerHTML = `<p class="title">${project.title}</p>          
                          <div class="buttons">
                            <box-icon name='edit' color="#a1a1aa" class="edit-project"></box-icon>
                            <box-icon name='trash-alt' color="#a1a1aa" class="delete-project"></box-icon>
                          </div>`;

  projects.appendChild(projectCard);

  deleteBtn = projectCard.querySelector(".delete-project");
  
  deleteBtn.addEventListener("click", ()=>{
    ProjectManager.removeProject(project);
    LocalStorage.updateProjects();
    ProjectManager.updateProjectsView();
  });
}