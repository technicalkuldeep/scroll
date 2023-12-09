// Function to check if user is connected
const isConnected = () => {
  return window.ethereum && window.ethereum.isConnected();
};

// Function to get currently connected address
const getAccount = async () => {
  if (!isConnected()) return null;
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  return accounts[0];
};
