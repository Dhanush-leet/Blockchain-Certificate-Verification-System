import { ethers } from 'ethers';

// Contract Information (Must be updated after deployment)
const CONTRACT_ADDRESS = "";
const CONTRACT_ABI = [
    "function storeCertificate(string certId, string hash) public",
    "function verifyCertificate(string certId) public view returns (string)"
];

const LOCAL_RPC_URL = "http://127.0.0.1:7545"; // Ganache default

export const connectWallet = async () => {
    if (!window.ethereum) {
        throw new Error("No Ethereum wallet found. Please install MetaMask.");
    }

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        return { provider, signer: await provider.getSigner(), account: accounts[0] };
    } catch (err) {
        console.error("User denied account access", err);
        throw err;
    }
};

export const storeHashOnBlockchain = async (certId, hash) => {
    if (!CONTRACT_ADDRESS) {
        console.warn("Contract address not set in BlockchainService.js! Please deploy and update.");
        return "0x-PENDING-CONTRACT-DEPLOYMENT";
    }

    const { signer } = await connectWallet();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const tx = await contract.storeCertificate(certId, hash);
    const receipt = await tx.wait();
    return receipt.hash;
};

export const verifyHashOnBlockchain = async (certId) => {
    if (!CONTRACT_ADDRESS) {
        console.warn("Contract address not set! Please deploy and update.");
        return null;
    }

    const provider = new ethers.JsonRpcProvider(LOCAL_RPC_URL);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    try {
        const storedHash = await contract.verifyCertificate(certId);
        return storedHash;
    } catch (err) {
        console.error("Error verifying:", err);
        return null;
    }
};
