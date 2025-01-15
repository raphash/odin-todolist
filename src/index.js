import "./styles.css";
import "boxicons";

import * as ProjectManager from "./modules/ProjectManager.js";

ProjectManager.initialSetup();
ProjectManager.updateProjects();
ProjectManager.updateProjectsView();