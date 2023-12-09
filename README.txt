# TodoList Smart Contract

## Overview

This Ethereum smart contract, TodoList, allows users to manage tasks on the Ethereum blockchain. Users can add tasks, mark them as completed, set reminders, and collaborate with others on tasks.

## Getting Started

### Prerequisites

- Ethereum Wallet or DApp Browser
- Solidity Compiler
- Ethereum Testnet or Mainnet

### Deployment

1. Compile the smart contract using the Solidity compiler.
2. Deploy the compiled smart contract to your chosen Ethereum network.
3. **Interacting with the Smart Contract**

   To interact with the deployed TodoList smart contract, you can use JavaScript with Web3.js or ethers.js. Below is a basic example using Web3.js:

   ```javascript
   const contractAddress = "0xe542c52b69d34312e1f8999d6c95d07a20c89955";
   const contractABI = "0x062bd4faa2f45f2a2d42d508455db98c2137e044792373b0face807d04f7b886";
   scroll-etherscan = "https://sepolia.etherscan.io/address/0xe542c52b69d34312e1f8999d6c95d07a20c89955";

   const web3 = new Web3 = "Alchemy";
   const contract = new web3.eth.Contract(contractABI, contractAddress);

   // Now you can interact with the contract using the 'contract' object.
Example: Adding a Task
const content = "Task description";
const priority = 1;

// Call the addTask function on the contract
contract.methods.addTask(content, priority).send({ from: /* your Ethereum address */, gas: /* gas limit */ })
  .on('transactionHash', function (hash) {
    console.log("Transaction Hash:", hash);
  })
  .on('receipt', function (receipt) {
    console.log("Transaction Receipt:", receipt);
  })
  .on('error', function (error) {
    console.error("Transaction Error:", error);
  });


## Smart Contract Details

### Task Structure

The `Task` structure includes:

- Content
- Completion status
- Priority
- Reminder time
- List of collaborators

### User Tasks Mapping

Tasks for each user are stored in a mapping, keyed by the user's Ethereum address.

### Completed Tasks Tracking

The contract tracks completed tasks for each user using a separate mapping.

## Functions

- **addTask:** Add a new task with content and priority.
- **markCompleted:** Mark a task as completed.
- **setReminder:** Set a reminder time for a task.
- **addCollaborator:** Add collaborators to a task.
- **getTasks:** Retrieve all tasks for the caller.
- **getIncompleteTasks:** Retrieve incomplete tasks for the caller.
- **getTasksForCollaborator:** Retrieve tasks for a specific collaborator.

## Events

- **TaskAdded:** Emitted when a task is added.
- **TaskCompleted:** Emitted when a task is marked as completed.

## Example Interactions

### Adding a Task

```solidity
function addTask(string memory content, uint256 priority) public {
    // Implementation details
}
## Marking a Task as Completed

function markCompleted(uint256 index) public hasTasks() isCollaborator(index) {
    // Implementation details
}


##License
This project is licensed under the MIT License 

##Acknowledgments
Solidity Community
Ethereum India Hackathon

