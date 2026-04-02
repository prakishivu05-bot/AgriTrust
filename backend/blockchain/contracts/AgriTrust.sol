// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AgriTrust Core Smart Contract
 * @dev Handles identities, pooling clusters, and zero-dispute payments.
 */
contract AgriTrust {
    
    struct Farmer {
        address wallet;
        string fullName;
        string location;
        string[] cropsGrown;
        uint256 trustScore; // e.g. 100
        bool isVerified;
    }
    
    struct Vendor {
        address wallet;
        string businessName;
        string license;
        bool isVerified;
    }

    struct Cluster {
        uint256 id;
        string crop;
        uint256 totalWeight;
        uint256 value;
        bool isClosed;
        address[] participants;
        uint256[] contributions;
    }

    mapping(address => Farmer) public farmers;
    mapping(address => Vendor) public vendors;
    
    uint256 public clusterCount = 0;
    mapping(uint256 => Cluster) public clusters;

    // Events
    event FarmerRegistered(address indexed wallet, string name);
    event VendorRegistered(address indexed wallet, string businessName);
    event ClusterCreated(uint256 indexed clusterId, string crop, uint256 totalWeight);
    event EscrowExecuted(uint256 indexed clusterId, uint256 totalValue);

    // Identity Registration
    function registerFarmer(string memory _name, string memory _location, string[] memory _crops) public {
        require(!farmers[msg.sender].isVerified, "Farmer already registered");
        
        farmers[msg.sender] = Farmer({
            wallet: msg.sender,
            fullName: _name,
            location: _location,
            cropsGrown: _crops,
            trustScore: 100, // Starts perfect
            isVerified: true
        });
        
        emit FarmerRegistered(msg.sender, _name);
    }

    function registerVendor(string memory _businessName, string memory _license) public {
        require(!vendors[msg.sender].isVerified, "Vendor already registered");
        
        vendors[msg.sender] = Vendor({
            wallet: msg.sender,
            businessName: _businessName,
            license: _license,
            isVerified: true
        });
        
        emit VendorRegistered(msg.sender, _businessName);
    }

    // Advanced Feature: Community Pooling via Smart Contracts
    function createCluster(string memory _crop, address[] memory _participants, uint256[] memory _contributions) public returns (uint256) {
        require(_participants.length == _contributions.length, "Mismatched arrays");
        
        uint256 totalWeight = 0;
        for(uint i = 0; i < _contributions.length; i++) {
            totalWeight += _contributions[i];
        }

        clusterCount++;
        
        clusters[clusterCount] = Cluster({
            id: clusterCount,
            crop: _crop,
            totalWeight: totalWeight,
            value: 0,
            isClosed: false,
            participants: _participants,
            contributions: _contributions
        });

        emit ClusterCreated(clusterCount, _crop, totalWeight);
        return clusterCount;
    }

    // Execute Escrow - splits a single massive payment to all farmers instantly
    function executeEscrow(uint256 _clusterId) public payable {
        Cluster storage c = clusters[_clusterId];
        require(!c.isClosed, "Cluster already settled");
        require(msg.value > 0, "No funds provided");

        uint256 totalFunds = msg.value;
        c.value = totalFunds;
        c.isClosed = true;

        for(uint i = 0; i < c.participants.length; i++) {
            address payable farmerWallet = payable(c.participants[i]);
            uint256 share = (c.contributions[i] * totalFunds) / c.totalWeight;
            
            // Native blockchain transfer
            (bool sent, ) = farmerWallet.call{value: share}("");
            require(sent, "Failed to send Ether securely");
        }

        emit EscrowExecuted(_clusterId, totalFunds);
    }
}
