const { Router } = require("express");
const shortid = require("shortid");

const router = Router();

let todos = [
  {
    id: shortid.generate(),
    title: "learn nodejs",
    description: "learn about nodejs",
    completed: false,
  },
];

// READ
router.get("", (req, res) => {
  res.json(todos);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === id);
  if (!todo)
    return res.status(404).json({ message: `Todo with id ${id} not found` });
  res.json(todos);
});

// CREATE
router.post("", (req, res) => {
  const { title, description } = req.body;
  const newTodo = {
    id: shortid.generate(),
    title,
    description: description || "",
    completed: false,
  };
  res.status(201).json(newTodo);
});

// UPDATE
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const updateTodo = todos.find((todo) => todo.id === id);
  if (!updateTodo) {
    return res.status(404).json({ message: `Todo with id ${id} not found` });
  }

  updateTodo.title = title || updateTodo.title;
  updateTodo.description = description || updateTodo.description;
  updateTodo.completed = completed || updateTodo.completed;

  res.json(updateTodo);
});

// DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const deleteTodo = todos.find((todo) => todo.id === id);
  if (!deleteTodo)
    return res.status(404).json({ message: `Todo with id ${id} not found` });

  todos = todos.filter((todo) => todo.id !== id);

  // status(204).send() for not sending the content response
  res.json({ message: `Todo with id ${id} deleted successfully` });
});
