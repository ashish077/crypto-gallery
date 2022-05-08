pragma solidity ^0.6.2;
// SPDX-License-Identifier: UNLICENSED
import "./ERC20CARAT.sol";


contract CryptogalleryV2 {

    string public name;
    address payable public admin;
    uint public uid;
    ERC20CARAT public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    struct artDetails {
        address owner;
        address artistAddress;
        string description;
        uint price;
        uint id;
    }

    event artAdded(
        uint id,
        uint price,
        address owner
    );

    event artPurchased(
        uint id,
        address owner,
        address artistAddress,
        bool success
    );

    event artUpdated(
        uint id,
        address owner,
        bool success
    );
    
    mapping(uint => artDetails) public artData;
    mapping(uint => bool) public artOnSale;

    mapping(address => int) public users;

    modifier onlyRegisteredUser {
        require(users[msg.sender] == 1, "This user is not registered.");
        _;
    }

    modifier onlyArtist (uint artId) {
        require(artData[artId].owner == msg.sender);
        _;
    }


    constructor (ERC20CARAT _tokenContract, uint256 _tokenPrice) public  {
        admin = msg.sender; // Deployer of the application.
        name = "Crypto Gallery Marketplace";
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
        uid = 100;
    }

    function register() external {
        require(users[msg.sender] != 1, "This user is already registered.");
        users[msg.sender] = 1;
    }
    
    function addArt(string calldata description, uint price) external onlyRegisteredUser returns(uint artuid) {
        artDetails memory art;
        uid = uid + 1;
        art.id = uid; // Generates a unique identifier for the art being added
        art.description = description;
        art.price = price;
        art.owner = msg.sender;
        art.artistAddress = msg.sender;
        artData[uid] = art;

        artOnSale[uid] = true;
        emit artAdded(uid, price, msg.sender);
        return art.id;
    }

    function purchaseArt(uint artId) external onlyRegisteredUser payable  returns(bool success){
        // Check if there is sufficient balance for the purchase
        // require(msg.value <= address(msg.sender).balance);
        require(artData[artId].owner != msg.sender, "Buyer is already the owner of this Art.");
        require(artOnSale[artId]);

        address artist = artData[artId].owner;
        payable(artist).transfer(msg.value);
        
        artOnSale[artId] = false;
        artData[artId].owner = msg.sender;

        emit artPurchased(artId, msg.sender, artData[artId].artistAddress, true);
        return true;
    }

    function getbalance() external view returns (uint balance){
        return address(this).balance;
    }

    function manageArt(uint artId, uint8 updatedPrice) external onlyArtist(artId) returns(bool success){
        require(artOnSale[artId] == true);
        artData[artId].price = updatedPrice;
        emit artUpdated(artId, msg.sender, true);
        return true;
    }
    
}