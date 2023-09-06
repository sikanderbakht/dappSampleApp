import { useState, useEffect } from "react";
import "./Nodes.css"

const Nodes = ({ nodes }) => {

  useEffect(() => {
    console.log("nodesasd:" + nodes);
  }, [nodes]);
  return (
    <div>
      <p className="node-title">Node Data</p>
      <div className="container">
        <table className="node-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Weight</th>
              <th>RFID</th>
              <th>Node Address</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node, index) => (
              <tr key={index}>
                <td>{node.id}</td>
                <td>{node.name}</td>
                <td>{node.location}</td>
                <td>{node.temperature}</td>
                <td>{node.humidity}</td>
                <td>{node.weight}</td>
                <td>{node.rfid}</td>
                <td>{node.nodeAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Nodes;