import "./styles.css";
import "boxicons";

import * as Project from "./components/Project.js";
import * as ProjectManager from "./modules/ProjectManager.js";
import * as DialogManager from "./modules/DialogManager.js";

ProjectManager.addProject(Project.createProject("Default"));
ProjectManager.updateProjectsView();
DialogManager.showCreateProject();