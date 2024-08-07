import { Fragment, useState } from "react";
const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  const handleEdit = (id)=>{
    fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({description})
    }).then((res)=>{
        if(res.ok){
            res.json()
            console.log("Todo was updated successfully");  
            window.location = "/"
        }
        else{
            console.error("Failed to add todo:", res.statusText);
        }
    }).catch((err)=>{
        console.log(err);
    })
  }

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      <div className="modal" id={`id${todo.todo_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4
                className="modal-title"
               
              >
                Edit
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
                onClick={() => handleEdit(todo.todo_id)}
              >
                Save changes
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
