import * as Project from "../components/Project.js";
import * as DialogManager from "./DialogManager.js";
import * as LocalStorage from "./LocalStorage.js";
import * as TodoManager from "./TodoManager.js";
import * as Todo from "../components/Todo.js";
import * as DateFormat from "./DateFormat.js";

const projects = [];

function createInitialProject() {
  const project = Project.createProject("Default");
    
  addProject(project);

  TodoManager.addTodo(project.id, Todo.createTodo(
    "Some Task",
    "Some Description ...",
    "2025-01-01",
    "low-priority"
  ));

  TodoManager.addTodo(project.id, Todo.createTodo(
    "Some Task",
    "Some Description ...",
    "2025-02-01",
    "medium-priority"
  ));

  TodoManager.addTodo(project.id, Todo.createTodo(
    "Some Task",
    "Some Description ...",
    "2025-03-01",
    "high-priority"
  ));

  LocalStorage.saveCurrentProjectId(project.id); // Sets project as current project
  LocalStorage.updateProjects();
}

export function initialSetup() {
  if (LocalStorage.isProjectsEmpty()) {
    createInitialProject();
  }

  updateProjects();
  updateProjectsView();
  TodoManager.setHeaderTitle(LocalStorage.getCurrentProjectId());
  TodoManager.updateTodosView(LocalStorage.getCurrentProjectId());
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

// Modify an existing project title
export function setProjectTitle(id, title) {
  for (const project of getProjects()) {
    if (project.id == id) {
      project.title = title;
    }
  }
}

export function getProject(id) {
  for (const project of projects) {
    if (project.id == id) {
      return project;
    }
  }

  return 0;
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

export function isProjectsEmpty() {
  return projects.length < 1;
}

// Clear temporary array.
export function clearProjects() {
  projects.splice(0, projects.length);
}

// Remove all html project elements.
export function clearProjectsView() {
  const projectsEl = document.querySelector(".projects");
  projectsEl.innerHTML = "";
}

// Update all projects components based on localStorage
export function updateProjectsView() {
  clearProjectsView();

  LocalStorage.updateProjects();

  for (const project of LocalStorage.getProjects()) {
    Project.createCard(project);
  }
}

const ProjectManager = (function(){
  const addProject = document.querySelector(".add-project");
  
  addProject.addEventListener("click", ()=>{
    DialogManager.showCreateProjectDialog();
  });
})();