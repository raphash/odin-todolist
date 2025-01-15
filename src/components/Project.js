export function createProject(title) {
  return { title };
}

export function createProjectCard(project) {
  const projects = document.querySelector(".projects");
  const projectTab = document.createElement("div");
        projectTab.classList.add("project");
        
  projectTab.innerHTML = `<p class="title">${project.title}</p>          
                          <div class="buttons">
                            <box-icon name='edit' color="#a1a1aa" class="edit-project"></box-icon>
                            <box-icon name='trash-alt' color="#a1a1aa" class="delete-project"></box-icon>
                          </div>`;

  projects.appendChild(projectTab);
}