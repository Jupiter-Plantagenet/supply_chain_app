// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SupplyChain is Ownable {
    uint256 public productCount;

    struct Product {
        uint256 id;
        string name;
        string origin;
        address owner;
        uint256 status;
        uint256 timestamp;
    }

    mapping(uint256 => Product) public products;
    mapping(uint256 => Product[]) public productHistory;
    mapping(address => bool) public authorizedEntities;

    event ProductAdded(uint256 indexed id, string name, string origin, address indexed owner);
    event StatusUpdated(uint256 indexed id, uint256 status, address indexed updater);
    event ProductOwnershipTransferred(uint256 indexed id, address indexed previousOwner, address indexed newOwner);

    modifier onlyAuthorized() {
        require(authorizedEntities[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }

    constructor() {
        authorizedEntities[msg.sender] = true;
    }

    function addAuthorizedEntity(address entity) external onlyOwner {
        authorizedEntities[entity] = true;
    }

    function removeAuthorizedEntity(address entity) external onlyOwner {
        authorizedEntities[entity] = false;
    }

    function addProduct(string memory name, string memory origin) external onlyAuthorized {
        productCount++;
        products[productCount] = Product(productCount, name, origin, msg.sender, 0, block.timestamp);
        productHistory[productCount].push(products[productCount]);
        emit ProductAdded(productCount, name, origin, msg.sender);
    }

    function updateStatus(uint256 id, uint256 status) external onlyAuthorized {
        Product storage p = products[id];
        p.status = status;
        p.timestamp = block.timestamp;
        productHistory[id].push(p);
        emit StatusUpdated(id, status, msg.sender);
    }

    function transferProductOwnership(uint256 id, address newOwner) external onlyAuthorized {
        Product storage p = products[id];
        address previous = p.owner;
        p.owner = newOwner;
        p.timestamp = block.timestamp;
        productHistory[id].push(p);
        emit ProductOwnershipTransferred(id, previous, newOwner);
    }

    function getProductHistory(uint256 id) external view returns (Product[] memory) {
        return productHistory[id];
    }

    function getProduct(uint256 id) external view returns (Product memory) {
        return products[id];
    }
}
