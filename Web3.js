// Web3.js
const Web3 = require('web3');

// Smart Contract ABI definition
const CONTRACT_ABI = "0x062bd4faa2f45f2a2d42d508455db98c2137e044792373b0face807d04f7b886";
];

// Deployed contract address
const CONTRACT_ADDRESS = '0xe542c52b69d34312e1f8999d6c95d07a20c89955';

// Create a new Web3 instance with MetaMask provider
const web3 = new Web3(window.ethereum);

// Function to get all tasks from the smart contract
const getTasks = async () => {
  const smartContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  const tasks = await smartContract.methods.getTasks().call({ from: await getAccount() });
  return tasks;
};

// Function to mark a task as completed
const markCompleted = async (taskIndex) => {
  const smartContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  await smartContract.methods.markCompleted(taskIndex).send({ from: await getAccount() });
};

// Function to add a new task
const addTask = async (content, priority) => {
  const smartContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  await smartContract.methods.addTask(content, priority).send({ from: await getAccount() });
};

// Function to add a collaborator to a task
const addCollaborator = async (taskIndex, collaboratorAddress) => {
  const smartContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  await smartContract.methods.addCollaborator(taskIndex, collaboratorAddress).send({ from: await getAccount() });
};

// Function to connect the wallet using MetaMask
const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      console.warn('Please install MetaMask!');
      return;
    }
    await window.ethereum.enable();
  } catch (error) {
    console.error(error);
  }
};

// Function to check if the user is connected
const isConnected = () => {
  return window.ethereum && window.ethereum.isConnected();
};

// Function to get the currently connected account
const getAccount = async () => {
  if (!isConnected()) return null;
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  return accounts[0];
};
