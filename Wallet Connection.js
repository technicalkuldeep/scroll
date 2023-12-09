const connectWallet = async () => {
  if (!window.ethereum) {
    console.warn("Please install MetaMask!");
    return;
  }

  try {
    await window.ethereum.enable();
  } catch (error) {
    console.error(error);
  }
};
