import * as ProjectManager from "./ProjectManager.js";

export function getProjects() {
  return JSON.parse(localStorage.getItem("projects"));
}

export function getProjectCount() {
  if (localStorage.getItem("projects")) {
    return localStorage.getItem("projects").length;
  } 

  return 0;
}

// Update all projects saved in localStorage based on ProjectManager
export function updateProjects() {
  localStorage.setItem("projects", JSON.stringify(ProjectManager.getProjects()));
}