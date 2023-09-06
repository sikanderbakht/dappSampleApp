import React, { useState } from "react";
import "./UpdateTransaction.css"

function UpdateTransaction({ etherState }) {
  const [nodeData, setNodeData] = useState({
    id: "",
    name: "",
    location: "",
    temperature: "",
    humidity: "",
    weight: "",
    rfid: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNodeData({
      ...nodeData,
      [name]: value,
    });
  };

  async function updateNodeData() {
    const { contract } = etherState;
    try {
      const transaction = await contract.updateNodeData(
        nodeData.id,
        nodeData.name,
        nodeData.location,
        nodeData.temperature,
        nodeData.humidity,
        nodeData.weight,
        nodeData.rfid,
      );
      await transaction.wait();
      alert("Success");
      console.log("Transaction Done");
    } catch (error) {
      if (error.message.includes("Only the owner can call this function")) {
        alert("Only the owner can call this function");
      } else if (error.message.includes("Node not found")) {
        alert("Node not found");
      } else {
        alert("An error occurred while updating node data");
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateNodeData();
    setNodeData({
      id: "",
      name: "",
      location: "",
      temperature: "",
      humidity: "",
      weight: "",
      rfid: "",
    });
  };

  return (
    <div className="update-transaction-container">
      <h2 className="update-transaction-title">Update Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={nodeData.id}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={nodeData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={nodeData.location}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="temperature">Temperature:</label>
          <input
            type="text"
            id="temperature"
            name="temperature"
            value={nodeData.temperature}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="humidity">Humidity:</label>
          <input
            type="text"
            id="humidity"
            name="humidity"
            value={nodeData.humidity}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight:</label>
          <input
            type="text"
            id="weight"
            name="weight"
            value={nodeData.weight}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="rfid">RFID:</label>
          <input
            type="text"
            id="rfid"
            name="rfid"
            value={nodeData.rfid}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Transaction
        </button>
      </form>
    </div>
  );
}

export default UpdateTransaction;