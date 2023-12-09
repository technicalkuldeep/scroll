import React, { useState, useEffect } from "react";

function TaskDetails({ task, onClose, addCollaborator, collaborators }) {
  const [collaboratorAddress, setCollaboratorAddress] = useState("");

  const handleCollaboratorAdd = async () => {
    await addCollaborator(task.index, collaboratorAddress);
  };

  return (
    <div className="task-details">
      <h2>Task Details</h2>
      <p>Content: {task.content}</p>
      <p>Priority: {task.priority}</p>
      <p>Completed: {task.completed ? "Yes" : "No"}</p>
      <h3>Collaborators:</h3>
      <ul>
        {collaborators.map((collaborator) => (
          <li key={collaborator}>{collaborator}</
