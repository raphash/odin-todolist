import * as Project from "../components/Project.js";
import * as DialogManager from "./DialogManager.js";
import * as LocalStorage from "./LocalStorage.js";

const projects = [];

export function initialSetup() {
  if (LocalStorage.getProjectCount() <= 0) {
    addProject(Project.createProject("Default"));
    LocalStorage.updateProjects();
    updateProjectsView();
  }
}

export function addProject(project) {
  projects.push(project);
}

export function removeProject(targetProject) {
  for (const project of projects) {
    if (project.id == targetProject.id) {
      projects.splice(projects.indexOf(project), 1);
    }
  }
}

export function setProjectTitle(id, title) {
  for (const project of getProjects()) {
    if (project.id == id) {
      project.title = title;
    }
  }
}

// Adds all localStorage projects to projects array
export function updateProjects() {
  clearProjects();

  for (const project of LocalStorage.getProjects()) {
    projects.push(project);
  }
}

export function getProjects() {
  return projects;
}

export function clearProjects() {
  projects.splice(0, projects.length);
}

export function clearProjectsView() {
  const projectsEl = document.querySelector(".projects");
  projectsEl.innerHTML = "";
}

// Update all projects components based on localStorage
export function updateProjectsView() {
  clearProjectsView();

  for (const project of LocalStorage.getProjects()) {
    Project.renderProjectCard(project);
  }
}

const ProjectManager = (function(){
  const addProject = document.querySelector(".add-project");
  
  addProject.addEventListener("click", ()=>{
    DialogManager.showCreateProject();
  });
})();