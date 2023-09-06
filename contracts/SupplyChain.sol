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
    }

    NodeData[] nodes;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;

        nodes.push(
            NodeData(
                "Node1",
                "John Doe",
                "Karachi",
                "28\u00b0C",
                "60%",
                "10kg",
                "RFID123",
                msg.sender
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
                msg.sender
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
                msg.sender
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
                msg.sender
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
                msg.sender
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
                msg.sender
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
                msg.sender
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
                msg.sender
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
                msg.sender
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
                msg.sender
            )
        );
        nodes.push(
            NodeData(
                "Node11",
                "Lucas Harris",
                "Quetta",
                "31\u00b0C",
                "71%",
                "18kg",
                "RFID808",
                msg.sender
            )
        );
        nodes.push(
            NodeData(
                "Node12",
                "Sarah Miller",
                "Rawalpindi",
                "29\u00b0C",
                "58%",
                "11kg",
                "RFID909",
                msg.sender
            )
        );
        nodes.push(
            NodeData(
                "Node13",
                "Michael Johnson",
                "Lahore",
                "20\u00b0C",
                "62%",
                "9.5kg",
                "RFID010",
                msg.sender
            )
        );
        nodes.push(
            NodeData(
                "Node14",
                "Emily Davis",
                "Karachi",
                "27\u00b0C",
                "64%",
                "11.5kg",
                "RFID111",
                msg.sender
            )
        );
        nodes.push(
            NodeData(
                "Node15",
                "Daniel Clark",
                "Faisalabad",
                "24\u00b0C",
                "66%",
                "10.8kg",
                "RFID212",
                msg.sender
            )
        );
        nodes.push(
            NodeData(
                "Node16",
                "Sophia Anderson",
                "Multan",
                "23\u00b0C",
                "59%",
                "12.2kg",
                "RFID313",
                msg.sender
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
        nodes.push(
            NodeData(
                id,
                name,
                location,
                temperature,
                humidity,
                weight,
                rfid,
                msg.sender
            )
        );
    }

    function getNodeData() public view returns (NodeData[] memory) {
        return nodes;
    }

    function getFilteredNodeData(
        string memory targetLocation
    ) public view onlyOwner returns (NodeData[] memory) {
        uint256 count = 0;

        for (uint256 i = 0; i < nodes.length; i++) {
            if (
                keccak256(abi.encodePacked(bytes(nodes[i].location))) ==
                keccak256(abi.encodePacked(bytes(targetLocation)))
            ) {
                count++;
            }
        }

        NodeData[] memory result = new NodeData[](count);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < nodes.length; i++) {
            if (
                keccak256(abi.encodePacked(bytes(nodes[i].location))) ==
                keccak256(abi.encodePacked(bytes(targetLocation)))
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
        bool nodeFound = false;

        for (uint256 i = 0; i < nodes.length; i++) {
            if (
                keccak256(abi.encodePacked(bytes(nodes[i].id))) ==
                keccak256(abi.encodePacked(bytes(id)))
            ) {
                nodes[i].name = name;
                nodes[i].location = location;
                nodes[i].temperature = temperature;
                nodes[i].humidity = humidity;
                nodes[i].weight = weight;
                nodes[i].rfid = rfid;
                nodeFound = true;
                break;
            }
        }

        require(nodeFound, "Node not found");
    }
}
