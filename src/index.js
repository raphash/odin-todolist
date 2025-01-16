import "./styles.css";
import "boxicons";

import * as ProjectManager from "./modules/ProjectManager.js";
import * as TodoManager from "./modules/TodoManager.js";
import * as Todo from "./components/Todo.js";
import * as LocalStorage from "./modules/LocalStorage.js";

ProjectManager.initialSetup();
ProjectManager.updateProjects();
ProjectManager.updateProjectsView();