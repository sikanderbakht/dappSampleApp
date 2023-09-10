import React, { useState } from "react";
import "./AddTransaction.css"; 

function AddTransaction({etherState}) {
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

  async function addNodeData() {
    const { contract } = etherState;
    const transaction = await contract.addData(
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
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const temperature = parseFloat(nodeData.temperature);
    if (temperature < 20 || temperature > 40) {
      alert("Temperature must be a numeric value between 20 and 40.");
      return;
    }
    addNodeData();
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
    <div className="container-fluid mt-4">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={nodeData.id}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={nodeData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={nodeData.location}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Temperature:</label>
          <input
            type="number"
            name="temperature"
            value={nodeData.temperature}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Humidity:</label>
          <input
            type="text"
            name="humidity"
            value={nodeData.humidity}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Weight:</label>
          <input
            type="text"
            name="weight"
            value={nodeData.weight}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>RFID:</label>
          <input
            type="text"
            name="rfid"
            value={nodeData.rfid}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;