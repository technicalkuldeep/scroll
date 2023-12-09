// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoList {

    // Structure to store task information
    struct Task {
        string content;
        bool completed;
        uint256 priority; // 0 = low, 1 = medium, 2 = high
        uint256 reminder;
        address[] collaborators; // List of collaborators for the task
    }

    // Mapping to store tasks for each user
    mapping(address => Task[]) public tasks;

    // Mapping to track completed tasks for each user
    mapping(address => mapping(uint256 => bool)) public completedTasks;

    // Event emitted when a task is added
    event TaskAdded(address indexed user, string content, uint256 index);

    // Event emitted when a task is marked as completed
    event TaskCompleted(address indexed user, uint256 index);

    // Modifier to check if the caller has tasks
    modifier hasTasks() {
        require(tasks[msg.sender].length > 0, "No tasks found");
        _;
    }

    // Modifier to check if the caller is a collaborator
    modifier isCollaborator(uint256 index) {
        bool isCollaboratorOnTask = false;
        for (uint256 j = 0; j < tasks[msg.sender][index].collaborators.length; j++) {
            if (tasks[msg.sender][index].collaborators[j] == msg.sender) {
                isCollaboratorOnTask = true;
                break;
            }
        }
        require(isCollaboratorOnTask, "Not authorized");
        _;
    }

    // Function to add a new task
    function addTask(string memory content, uint256 priority) public {
        Task memory newTask = Task(content, false, priority, 0, new address[](0));
        tasks[msg.sender].push(newTask);
        emit TaskAdded(msg.sender, content, tasks[msg.sender].length - 1);
    }

    // Function to mark a task as completed
    function markCompleted(uint256 index) public hasTasks() isCollaborator(index) {
        tasks[msg.sender][index].completed = true;
        completedTasks[msg.sender][index] = true;
        emit TaskCompleted(msg.sender, index);
    }

    // Function to set a reminder for a task
    function setReminder(uint256 index, uint256 reminderTime) public hasTasks() {
        tasks[msg.sender][index].reminder = block.timestamp + reminderTime;
    }

    // Function to add a collaborator to a task
    function addCollaborator(uint256 index, address collaborator) public hasTasks() {
        tasks[msg.sender][index].collaborators.push(collaborator);
    }

    // Function to get all tasks for a user
    function getTasks() public view returns (Task[] memory) {
        return tasks[msg.sender];
    }

    // Function to get incomplete tasks for a user
    function getIncompleteTasks() public view returns (Task[] memory) {
        Task[] memory incompleteTasksList = new Task[](tasks[msg.sender].length);
        uint256 incompleteTaskCount = 0;
        for (uint256 i = 0; i < tasks[msg.sender].length; i++) {
            if (!completedTasks[msg.sender][i]) {
                incompleteTasksList[incompleteTaskCount] = tasks[msg.sender][i];
                incompleteTaskCount++;
            }
        }
        return incompleteTasksList;
    }

    // Function to get tasks for a specific collaborator
    function getTasksForCollaborator(address collaborator) public view returns (Task[] memory) {
        Task[] memory collaboratorTasksList = new Task[](tasks[collaborator].length);
        uint256 collaboratorTaskCount = 0;
        for (uint256 i = 0; i < tasks[collaborator].length; i++) {
            bool isCollaboratorOnTask = false;
            for (uint256 j = 0; j < tasks[collaborator][i].collaborators.length; j++) {
                if (tasks[collaborator][i].collaborators[j] == msg.sender) {
                    isCollaboratorOnTask = true;
                    break;
                }
            }
            if (isCollaboratorOnTask) {
                collaboratorTasksList[collaboratorTaskCount] = tasks[collaborator][i];
                collaboratorTaskCount++;
            }
        }
        return collaboratorTasksList;
    }
}