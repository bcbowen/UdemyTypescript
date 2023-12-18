import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = req.body.text as string;
  const newTodo: Todo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);

  res
    .status(201)
    .json({ message: "Created new todo, dude. ", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id;
  const updatedText = (req.body as { text: string }).text;
  res.json({ todos: TODOS });
  const todoIndex = TODOS.findIndex((todo) => todo.id === id);
  if (todoIndex < 0) {
    throw new Error("TODO not found, dickface");
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);
  res.json({ message: "Updated!", updatedTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id;
  res.json({ todos: TODOS });
  const todoIndex = TODOS.findIndex((todo) => todo.id === id);
  if (todoIndex < 0) {
    throw new Error("TODO not found, dickface");
  }

  TODOS.splice(todoIndex, 1);
  res.json({ message: "Deleted!", index: todoIndex });
};
