import { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";
const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      res.json();
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    });
  };
  const getTodos = (e) => {
    // e.preventDefault();
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => {
        console.log("Error fetching todos :", err);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <Fragment>
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>{<EditTodo todo={todo}/>}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default ListTodo;
