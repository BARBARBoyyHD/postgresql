import { Fragment, useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    })
      .then((res) => {
        if (res.ok) {
          setDescription(""); // Reset the input field after submission
          window.location = "/"; // Redirect after successful submission
        } else {
          console.error("Failed to add todo:", res.statusText);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <div>
        <h1 className="text-center mt-5">Pern Todo List</h1>
        <form className="d-flex mt-5" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Add Todo"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="btn btn-success">Add</button>
        </form>
      </div>
    </Fragment>
  );
};

export default InputTodo;
