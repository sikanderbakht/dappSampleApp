import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import Greeter from "./artifacts/contracts/SupplyChain.sol/SupplyChain.json";
import './App.css';
import AddTransaction from "./pages/AddTransaction";
import Home from "./pages/Home";
import UpdateTransaction from './pages/UpdateTransaction';

function App() {
  const [etherState, setEtherState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contractABI = Greeter.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setEtherState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Home etherState={etherState}/>} />
          <Route path="/add-transaction" element={<AddTransaction etherState={etherState}/>} />
          <Route path="/update-transaction" element={<UpdateTransaction etherState={etherState}/>} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
