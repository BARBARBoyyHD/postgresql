const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const port = 5000;

// middleware
app.use(cors());
app.use(express.json());

// ROUTES

// CREATE TODO
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(description) VALUES($1) RETURNING *",
      [description]
    );
    res.status(201).json(newTodo.rows[0]); // Changed to res.status(201)
  } catch (error) {
    console.error(error.message);
    res.status(400).send("An error occurred while creating the todo");
  }
});

// GET ALL TODO
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred while fetching todos");
  }
});

// GET SINGLE TODO
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred while fetching the todo");
  }
});

// UPDATE TODO
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.status(200).json("Todo was updated successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred while updating the todo");
  }
});

// DELETE TODO
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.status(200).json("Todo was deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred while deleting the todo");
  }
});

app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});
