pragma solidity ^0.6.2;
// SPDX-License-Identifier: UNLICENSED
contract CryptogalleryV2 {

    address payable public owner;
    uint uid;

    struct artDetails {        
        address artistAddress;
        address owner;
        string artistName;
        string description;
        uint price;
        uint id;
    }
    
    mapping(uint => artDetails) public artData;
    mapping(uint => bool) public artOnSale;

    mapping(address => uint[]) public artOwners; //Mapping to hold the list of uids bought by a buyer.
    mapping(address => uint[]) public artSellers; //Mapping to hold the list of uids sold by an artist.

    // mapping(address => string) public userNames;
    mapping(address => int) public users;

    modifier onlyRegisteredUser {
        require(users[msg.sender] == 1, "This user is not registered.");
        _;
    }

    modifier onlyArtist (uint artId) {
        require(artData[artId].artistAddress == msg.sender);
        _;
    }


    constructor () public  {
        owner = msg.sender; // Deployer of the application.
        uid = 100;
    }

    function register() external {
        require(users[msg.sender] != 1, "This user is already registered.");
        users[msg.sender] = 1;
    }
    
    function addArt(uint id, string calldata description, uint price) external onlyRegisteredUser returns(uint artuid) {
        artDetails memory art;
        art.id = id; // Generates a unique identifier for the art being added
        art.artistAddress = msg.sender;
        art.description = description;
        art.price = price;
        art.owner = msg.sender;
        artData[id] = art;

        artOnSale[id] = true;

        uid = uid + 1; // Increment uid for future additions.
        return id; // Return the unique id created for the art.
    }

    function purchaseArt(uint artId) external onlyRegisteredUser payable  returns(bool success){
        // Check if there is sufficient balance for the purchase
        // require(msg.value == artData[artId].price);
        require(msg.value <= address(msg.sender).balance);

        address artist = artData[artId].artistAddress;
        // artData[artId].artistAddress.transfer(msg.value);
        payable(artist).transfer(msg.value);

        artOwners[msg.sender].push(artId);
        artOnSale[artId] = false;

        return true;
    }

    function getbalance() external view returns (uint balance){
        return address(this).balance;
    }

    function manageArt(uint artId, uint8 updatedPrice) external onlyArtist(artId) returns(bool success){
        require(artOnSale[artId] == true);
        artData[artId].price = updatedPrice;
        return true;
    }
    
}