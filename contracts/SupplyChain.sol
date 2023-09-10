// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract SupplyChain {
    struct NodeData {
        string id;
        string name;
        string location;
        string temperature;
        string humidity;
        string weight;
        string rfid;
        address nodeAddress;
        uint256 timestamp;
    }

    NodeData[] nodes;
    address public owner;
    address public reader;

    modifier onlyOwnerOrReader() {
        require(
            msg.sender == owner || msg.sender == reader,
            "Only the owner or reader can call this function"
        );
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier onlyReader() {
        require(msg.sender == reader, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
        reader = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
        nodes.push(
            NodeData(
                "Node1",
                "John Doe",
                "Karachi",
                "28\u00b0C",
                "60%",
                "10kg",
                "RFID123",
                msg.sender,
                block.timestamp
            )
        );
        nodes.push(
            NodeData(
                "Node2",
                "Jane Smith",
                "Lahore",
                "18\u00b0C",
                "55%",
                "8kg",
                "RFID456",
                msg.sender,
                block.timestamp
            )
        );
        nodes.push(
            NodeData(
                "Node3",
                "Alice Johnson",
                "Islamabad",
                "22\u00b0C",
                "70%",
                "12kg",
                "RFID789",
                msg.sender,
                block.timestamp
            )
        );
        nodes.push(
            NodeData(
                "Node4",
                "Bob Brown",
                "Peshawar",
                "25\u00b0C",
                "65%",
                "11kg",
                "RFID101",
                msg.sender,
                block.timestamp
            )
        );
        nodes.push(
            NodeData(
                "Node5",
                "Eva Davis",
                "Faisalabad",
                "21\u00b0C",
                "75%",
                "9kg",
                "RFID202",
                msg.sender,
                block.timestamp
            )
        );
        nodes.push(
            NodeData(
                "Node6",
                "Carlos Martinez",
                "Rawalpindi",
                "35\u00b0C",
                "80%",
                "15kg",
                "RFID303",
                msg.sender,
                block.timestamp
            )
        );
        nodes.push(
            NodeData(
                "Node7",
                "Olivia White",
                "Multan",
                "22\u00b0C",
                "63%",
                "13kg",
                "RFID404",
                msg.sender,
                block.timestamp
            )
        );
        nodes.push(
            NodeData(
                "Node8",
                "David Lee",
                "Gujranwala",
                "25\u00b0C",
                "68%",
                "14kg",
                "RFID505",
                msg.sender,
                block.timestamp
            )
        );
        nodes.push(
            NodeData(
                "Node9",
                "Sophia Adams",
                "Peshawar",
                "36\u00b0C",
                "72%",
                "16kg",
                "RFID606",
                msg.sender,
                block.timestamp
            )
        );
        nodes.push(
            NodeData(
                "Node10",
                "Jackson Wilson",
                "Sialkot",
                "32\u00b0C",
                "67%",
                "17kg",
                "RFID707",
                msg.sender,
                block.timestamp
            )
        );
    }

    function addData(
        string memory id,
        string memory name,
        string memory location,
        string memory temperature,
        string memory humidity,
        string memory weight,
        string memory rfid
    ) public {
        bool nodeExists = false;

        for (uint256 i = 0; i < nodes.length; i++) {
            if (
                keccak256(abi.encodePacked(bytes(nodes[i].id))) ==
                keccak256(abi.encodePacked(bytes(id)))
            ) {
                nodeExists = true;
                break;
            }
        }

        require(nodeExists, "Node with the given id does not exist");

        nodes.push(
            NodeData(
                id,
                name,
                location,
                temperature,
                humidity,
                weight,
                rfid,
                msg.sender,
                block.timestamp
            )
        );
    }

    function getNodeData() public view returns (NodeData[] memory) {
        return nodes;
    }

    function getFilteredNodeData(
        string memory targetNode
    ) public view onlyOwnerOrReader returns (NodeData[] memory) {
        uint256 count = 0;

        for (uint256 i = 0; i < nodes.length; i++) {
            if (
                keccak256(abi.encodePacked(bytes(nodes[i].id))) ==
                keccak256(abi.encodePacked(bytes(targetNode)))
            ) {
                count++;
            }
        }

        NodeData[] memory result = new NodeData[](count);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < nodes.length; i++) {
            if (
                keccak256(abi.encodePacked(bytes(nodes[i].id))) ==
                keccak256(abi.encodePacked(bytes(targetNode)))
            ) {
                result[currentIndex] = nodes[i];
                currentIndex++;
            }
        }

        return result;
    }

    function updateNodeData(
        string memory id,
        string memory name,
        string memory location,
        string memory temperature,
        string memory humidity,
        string memory weight,
        string memory rfid
    ) public onlyOwner {
        bool nodeExists = false;

        for (uint256 i = 0; i < nodes.length; i++) {
            if (
                keccak256(abi.encodePacked(bytes(nodes[i].id))) ==
                keccak256(abi.encodePacked(bytes(id)))
            ) {
                nodeExists = true;
                break;
            }
        }

        require(nodeExists, "Node with the given id does not exist");

        nodes.push(
            NodeData(
                id,
                name,
                location,
                temperature,
                humidity,
                weight,
                rfid,
                msg.sender,
                block.timestamp
            )
        );
    }

    function isOwner() public view returns (bool) {
        return msg.sender == owner;
    }
}
