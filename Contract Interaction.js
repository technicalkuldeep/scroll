const Web3 = require("web3");

const CONTRACT_ABI = "0x062bd4faa2f45f2a2d42d508455db98c2137e044792373b0face807d04f7b886";
  // Replace with your actual smart contract ABI
];

const CONTRACT_ADDRESS = '0xe542c52b69d34312e1f8999d6c95d07a20c89955';

const web3 = new Web3(window.ethereum);

// Function to get all tasks
const getTasks = async () => {
  const smartContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  const tasks = await smartContract.methods.getTasks().call({ from: window.ethereum.selectedAddress });
  return tasks;
};

// Function to mark a task completed
const markCompleted = async (taskIndex) => {
  const smartContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  await smartContract.methods.markCompleted(taskIndex).send({ from: window.ethereum.selectedAddress });
};

// Function to add a task
const addTask = async (content, priority) => {
  const smartContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  await smartContract.methods.addTask(content, priority).send({ from: window.ethereum.selectedAddress });
};

// Function to add a collaborator to a task
const addCollaborator = async (taskIndex, collaboratorAddress) => {
  const smartContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  await smartContract.methods.addCollaborator(taskIndex, collaboratorAddress).send({ from: window.ethereum.selectedAddress });
};

// Function to fetch collaborators for a task
const getCollaborators = async (taskIndex) => {
  const smartContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  const collaborators = await smartContract.methods.getCollaborators(taskIndex).call({ from: window.ethereum.selectedAddress });
  return collaborators;
};
