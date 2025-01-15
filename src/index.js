import "./styles.css";
import "boxicons";

import * as Project from "./components/Project.js";
import * as ProjectManager from "./modules/ProjectManager.js";

ProjectManager.addProject(Project.createProject("Default"));
ProjectManager.updateProjectsView();
ProjectManager.showCreateProjectDialog();