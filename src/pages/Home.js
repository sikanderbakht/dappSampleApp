import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Nodes from "../components/Nodes";
import "./Home.css";

const Home = ({ etherState }) => {
  const [nodes, setNodes] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/update-transaction");
  };


  async function getNodes() {
    const { contract } = etherState;
    try {
      const nodes = await contract.getFilteredNodeData(selectedCity);
      // const nodes = await contract.getNodeData();
      // await nodes.wait();
      console.log("nodes app: " + nodes);
      setNodes(nodes);
    } catch (error) {
      alert("An error occurred while fetching data from the contract: " + "Only the owner can call this function");
    }
  }

  const citiesOfPakistan = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Gujranwala",
    "Peshawar",
    "Quetta",
    "Sialkot",
  ];
  return (
    <div className="App">
      <div className="App-header">
        <div className="description">
          <h1 className="title">SupplyChain.sol</h1>
          <h3 className="subtitle">Full stack dapp using ReactJS and Hardhat</h3>
        </div>

        <select
          onChange={(e) => setSelectedCity(e.target.value)}
          value={selectedCity}
          className="select-field"
        >
          <option value="">Select a City</option>
          {citiesOfPakistan.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <div className="custom-buttons">
        <button
            onClick={getNodes}
            className="custom-button primary"
            // style={{ backgroundColor: "#ccc" }}
          >
            Get Data
          </button>
          <button
            onClick={handleButtonClick}
            className="custom-button primary"
          >
            Update Data
          </button>
        </div>

        <div className="nodes-container">
          {nodes.length > 0 && <Nodes nodes={nodes} />}
        </div>
      </div>
    </div>
  );
}

export default Home;