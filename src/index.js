import "./styles.css";
import "boxicons";

import * as ProjectManager from "./modules/ProjectManager.js";
import * as LocalStorage from "./modules/LocalStorage.js";

const app = (function(){
  document.addEventListener("DOMContentLoaded", ()=>{
    ProjectManager.initialSetup();
  });
})();