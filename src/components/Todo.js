import uniqid from "uniqid";
import * as LocalStorage from "../modules/LocalStorage.js";
import * as TodoManager from "../modules/TodoManager.js";
import * as DialogManager from "../modules/DialogManager.js";
import * as ProjectManager from "../modules/ProjectManager.js";

export function createTodo(title, description, dueDate, priority) {
  return { title, description, dueDate, priority, id: uniqid() };
}

export function createCard(todo) {
  const todos = document.querySelector(".todos");  
  const todoCard = document.createElement("div");
        todoCard.classList.add("todo");
        todoCard.classList.add(todo.priority);
        todoCard.setAttribute("data-id", todo.id);
  
  todoCard.innerHTML = `<div class="header">
                          <p class="title">${todo.title}</p>
                          <p class="description">${todo.description}</p>
                        </div>

                        <div class="footer">
                          <p class="time">
                            <time datetime="${todo.dueDate}">${todo.dueDate}</time>
                          </p>
                          <div class="buttons">
                            <box-icon name='show' color="#e2e8f0" class="view-todo" title="View Todo"></box-icon>
                            <box-icon name='edit' color="#5c73f6" class="edit-todo" title="Edit Todo"></box-icon>
                            <box-icon name='trash-alt' color="#f65c5c" class="delete-todo" title="Delete Todo"></box-icon>
                          </div>
                        </div>`

  const deleteTodoBtn = todoCard.querySelector(".delete-todo");
  const editTodoBtn = todoCard.querySelector(".edit-todo");
  const viewTodoBtn = todoCard.querySelector(".view-todo");
  
  // Deletes the todoCard and update view and storage.
  deleteTodoBtn.addEventListener("click", ()=>{
    const currentProjectId = LocalStorage.getCurrentProjectId();
    
    TodoManager.removeProjectTodo(currentProjectId, todo.id); 
    TodoManager.updateTodos(currentProjectId);
    LocalStorage.updateProjects();
    TodoManager.updateTodosView();
  });

  editTodoBtn.addEventListener("click", ()=>{
    DialogManager.showEditTodoDialog(todo);
  });

  viewTodoBtn.addEventListener("click", ()=>{
    DialogManager.showViewTodoDialog(todo);
  });

  todos.appendChild(todoCard);
}