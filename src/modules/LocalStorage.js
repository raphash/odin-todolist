import * as ProjectManager from "./ProjectManager.js";

export function getProjects() {
  return JSON.parse(localStorage.getItem("projects"));
}

export function getProjectCount() {
  return JSON.parse(localStorage.getItem("projects")).length;
}

export function updateProjects() {
  localStorage.setItem("projects", JSON.stringify(ProjectManager.getProjects()));
}