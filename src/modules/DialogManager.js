export function hideCreateProject() {
  let dialog = document.querySelector("dialog");

  if (dialog) dialog.remove();
}

export function showCreateProject() {

  // Dialog configuration.
  hideCreateProject();

  const main = document.querySelector("main");
  
  const dialog = document.createElement("dialog");
        dialog.setAttribute("open", "open");
        dialog.classList.add("project-dialog");

  let cancelBtn;
  let createBtn;
  
  dialog.innerHTML = `<div class="header">
      <box-icon type="solid" 
                name="package"
                size="md"
                color="#5c73f6"></box-icon>
      
      <p class="title">Create Project</p>
      <p class="subtitle">
        Here you can create a new project
        for this you need to select a title!
      </p>
    </div>

    <form method="dialog">
      <div class="row">
        <label for="project-name">Project</label>
        <input type="text"
              name="project-name"
              id="project-name"
              autocomplete="off"
              required>
      </div>

      <div class="buttons">
        <button class="cancel">Cancel</button>
        <button class="create">Create</button>
      </div>
    </form>`

  main.appendChild(dialog);

  // Dialog items configuration.
  cancelBtn = dialog.querySelector(".cancel");

  cancelBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    hideCreateProject();
    dialog.close();
  });
}