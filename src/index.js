import "./styles.css";
import "boxicons";

import * as Project from "./components/Project.js";
import * as ProjectManager from "./modules/ProjectManager.js";
import * as DialogManager from "./modules/DialogManager.js";

ProjectManager.initialSetup();
ProjectManager.updateProjects();
ProjectManager.updateProjectsView();