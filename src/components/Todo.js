import uniqid from "uniqid";

export function createTodo(title, description, dueDate, priority) {
  return { title, description, dueDate, priority, id: uniqid() };
}