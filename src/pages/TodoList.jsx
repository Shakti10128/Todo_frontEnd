import React from "react";

const TodoList = ({title,description,isCompleted,id,updateHandler,deleteHandler}) => {
  return (
    <div className="TodoItems">
      <div className="tasks">
        <h1 className="taskTitle">{title}</h1>
        <h1 className="taskDescription">{description}</h1>
      </div>
      <div className="buttons">
        <input
        onChange={()=>{
            updateHandler(id)
        }}
          className="taskCheckbox"
          type="checkbox"
          checked={isCompleted}
        />
        <button onMouseDown={()=>{deleteHandler(id)}} className="taskDelete">Delete</button>
      </div>
    </div>
  );
};

export default TodoList;
