// TodoList.js

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import TaskDetails from "./components/TaskDetails";
import AddTask from "./components/AddTask";

const CONTRACT_ADDRESS = "0xe542c52b69d34312e1f8999d6c95d07a20c89955";
const CONTRACT_ABI = "0x062bd4faa2f45f2a2d42d508455db98c2137e044792373b0face807d04f7b886";

function TodoList() {
  const [web3, setWeb3] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    const connectWeb3 = async () => {
      if (!window.ethereum) {
        console.warn("Please install MetaMask!");
        return;
      }

      const web3Instance = new Web3(window.ethereum);
      await window.ethereum.enable();
      setWeb3(web3Instance);
    };

    connectWeb3();
  }, []);

  useEffect(() => {
    if (!web3) return;

    const getTasks = async () => {
      const smartContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      const userTasks = await smartContract.methods.getTasks().call({ from: window.ethereum.selectedAddress });
      setTasks(userTasks);
    };

    getTasks();
  }, [web3]);

  const markCompleted = async (taskIndex) => {
    const smartContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    await smartContract.methods.markCompleted(taskIndex).send({ from: window.ethereum.selectedAddress });
    const updatedTasks = tasks.map((task, index) => {
      if (index === taskIndex) {
        return { ...task, completed: true };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const showTaskDetails = (task) => {
    setActiveTask(task);
  };

  const addTask = async (taskContent, priority) => {
    const smartContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    await smartContract.methods.addTask(taskContent, priority).send({ from: window.ethereum.selectedAddress });
    const newTask = { content: taskContent, priority, completed: false };
    setTasks([...tasks, newTask]);
  };

  const addCollaborator = async (taskIndex, collaboratorAddress) => {
    const smartContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    await smartContract.methods.addCollaborator(taskIndex, collaboratorAddress).send({ from: window.ethereum.selectedAddress });
    // Update tasks state with new collaborator
  };

  return (
    <div className="todo-list">
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.content}
            {!task.completed && <button onClick={() => markCompleted(index)}>Mark Completed</button>}
            <button onClick={() => showTaskDetails(task)}>Details</button>
          </li>
        ))}
      </ul>
      {activeTask && <TaskDetails task={activeTask} onClose={() => setActiveTask(null)} addCollaborator={addCollaborator} />}
      <AddTask addTask={addTask} />
    </div>
  );
}

export default TodoList;
