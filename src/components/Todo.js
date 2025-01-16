import uniqid from "uniqid";

export function createTodo(title, description, dueDate, priority) {
  return { title, description, dueDate, priority, id: uniqid() };
}

export function createCard(todo) {
  const todos = document.querySelector(".todos");  
  const todoCard = document.createElement("div");
        todoCard.classList.add("todo");
        todoCard.classList.add(todo.priority);
  
  todoCard.innerHTML = `<div class="header">
                          <p class="title">${todo.title}</p>
                          <p class="description">${todo.description}</p>
                        </div>

                        <div class="footer">
                          <p class="time">
                            <time datetime="${todo.dueDate}">${todo.dueDate}</time>
                          </p>
                          <div class="buttons">
                            <box-icon name='edit' color="#6fed72" class="edit-todo"></box-icon>
                            <box-icon name='trash-alt' color="#5c73f6" class="delete-todo"></box-icon>
                          </div>
                        </div>`

  todos.appendChild(todoCard);
}