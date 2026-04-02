import { ethers } from 'ethers';

// This ABI would ideally be imported directly from our Hardhat deployment
// We use a simplified mock ABI representing the AgriTrust.sol functions for MVP display
const CONTRACT_ABI = [
  "function registerFarmer(string _name, string _location, string[] _crops) public",
  "function registerVendor(string _businessName, string _license) public",
  "function createCluster(string _crop, address[] _participants, uint256[] _contributions) public returns (uint256)",
  "function executeEscrow(uint256 _clusterId) public payable"
];

// Provide your local Hardhat Deployment Address here after running `npx hardhat deploy`
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
// Hardhat's default test account #1 Private Key (used for demo fallback interactions without MetaMask)
const LOCAL_HACKATHON_PK = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

export const connectWallet = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      return { provider, signer, address: await signer.getAddress(), system: "MetaMask" };
    } catch (error) {
      console.warn("User rejected wallet connection, trying seamless hardhat injection:", error);
    }
  } 
  
  // DEMO / HACKATHON OVERRIDE
  // Connect silently to the Local Hardhat Node and fund with the developer test key.
  console.log("🟢 MetaMask not detected or rejected. Activating Seamless Hardhat Dev Wallet.");
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const signer = new ethers.Wallet(LOCAL_HACKATHON_PK, provider);
  return { provider, signer, address: await signer.getAddress(), system: "Hardhat Node" };
};

export const getContract = (signer) => {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

/**
 * Fallback Web3 Mocking class ensures the UI doesn't crash during Hackathon Demos 
 * if MetaMask or the local Hardhat Node is turned off. It routes back to `localStorage`.
 */
export const HybridBlockchain = {
  
  async deployFarmerIdentity(formData) {
    try {
      const { signer, system } = await connectWallet();
      const contract = getContract(signer);
      console.log(`Writing Farmer to Smart Contract via ${system}...`);
      const tx = await contract.registerFarmer(
        formData.name, 
        formData.location, 
        formData.cropsGrown || []
      );
      const receipt = await tx.wait();
      
      const profileData = {
        ...formData,
        blockchainId: receipt.hash || tx.hash,
        verifiedLevel: 'Tier 1 (Smart Contract)',
      };
      localStorage.setItem('farmer_profile', JSON.stringify(profileData));
      
      return receipt.hash || tx.hash;
    } catch (err) {
      console.warn("⚠️ Web3 Node Disconnected. Falling back to LocalStorage Mock Ledger.", err);
      const profileData = {
        ...formData,
        blockchainId: '0x' + Math.random().toString(16).substring(2, 18),
        verifiedLevel: 'Tier 1 (Fallback)',
      };
      localStorage.setItem('farmer_profile', JSON.stringify(profileData));
      return profileData.blockchainId;
    }
  },

  async deployVendorIdentity(formData) {
    try {
      const { signer, system } = await connectWallet();
      const contract = getContract(signer);
      console.log(`Writing Vendor to Smart Contract via ${system}...`);
      const tx = await contract.registerVendor(
        formData.businessName, 
        formData.license || "N/A"
      );
      const receipt = await tx.wait();
      
      const profileData = {
        ...formData,
        blockchainId: receipt.hash || tx.hash,
        verifiedLevel: 'Tier 1 (Smart Contract)',
      };
      localStorage.setItem('vendor_profile', JSON.stringify(profileData));
      
      return receipt.hash || tx.hash;
    } catch (err) {
      console.warn("⚠️ Web3 Node Disconnected. Falling back to LocalStorage Mock Ledger.", err);
      const profileData = {
        ...formData,
        blockchainId: '0x' + Math.random().toString(16).substring(2, 18),
        verifiedLevel: 'Tier 1 (Fallback)',
      };
      localStorage.setItem('vendor_profile', JSON.stringify(profileData));
      return profileData.blockchainId;
    }
  }
};
