import React, { useState, useEffect } from "react";

function TaskList({ tasks, markCompleted, showTaskDetails }) {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li key={index}>
          {task.content}
          {!task.completed && <button onClick={() => markCompleted(index)}>Mark Completed</button>}
          <button onClick={() => showTaskDetails(task)}>Details</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
