import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Nodes from "../components/Nodes";
import "./Home.css";

const Home = ({ etherState }) => {
  const [nodes, setNodes] = useState([]);
  const [sampeNode, setSampleNode] = useState("");
  const navigate = useNavigate();


  async function handleButtonClick() {
    const { contract } = etherState;
    try {
      const isOwner = await contract.isOwner();
      if (isOwner) {
        navigate("/update-transaction");
      } else {
        alert("Error: Only the owner can call this function");
      }
    } catch(error) {
      alert("Error: " + error);
    }
  };

  async function getNodes() {
    const { contract } = etherState;
    try {
      const nodes = await contract.getFilteredNodeData(sampeNode);
      console.log("nodes app: " + nodes);
      setNodes(nodes);
    } catch (error) {
      alert("Error: Only the owner can call this function");
    }
  }

  const sampleNodes = [
    "Node1",
    "Node2",
    "Node3",
    "Node4",
    "Node5",
    "Node6",
    "Node7",
    "Node8",
    "Node9",
    "Node10",
  ];
  return (
    <div className="App">
      <div className="App-header">
        <div className="description">
          <h1 className="title">SupplyChain.sol</h1>
          <h3 className="subtitle">Full stack dapp using ReactJS and Hardhat</h3>
        </div>

        <select
          onChange={(e) => setSampleNode(e.target.value)}
          value={sampeNode}
          className="select-field"
        >
          <option value="">Select a Node</option>
          {sampleNodes.map((city) => (
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