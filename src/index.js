import "./styles.css";
import "boxicons";

import * as ProjectManager from "./modules/ProjectManager.js";

const app = (function(){
  document.addEventListener("DOMContentLoaded", ()=>{
    ProjectManager.initialSetup();
  });
})();