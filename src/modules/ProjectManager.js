import { createProjectCard } from "../components/Project.js";

const projects = [];

export function addProject(project) {
  projects.push(project);
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

export function updateProjectsView() {
  clearProjectsView();

  for (const project of projects) {
    createProjectCard(project);
  }
}