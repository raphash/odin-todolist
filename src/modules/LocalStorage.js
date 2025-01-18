import * as ProjectManager from "./ProjectManager.js";

export function initialSetup() {
  if (!localStorage.getItem("projects")) {
    localStorage.setItem("projects", JSON.stringify([]));
  }
}

export function saveCurrentProjectId(projectId) {
  localStorage.setItem("currentProjectId", projectId);
}

export function getCurrentProjectId() {
  return localStorage.getItem("currentProjectId");
}

export function getProjects() {
  return JSON.parse(localStorage.getItem("projects"));
}

export function getProjectCount() {
  if (localStorage.getItem("projects")) {
    return JSON.parse(localStorage.getItem("projects")).length;
  }
}

export function isProjectsEmpty() {
  return getProjectCount() < 1;
}

// Update all projects saved in localStorage based on ProjectManager
export function updateProjects() {
  localStorage.setItem("projects", JSON.stringify(
    ProjectManager.getProjects()
  ));
}