pragma solidity ^0.6.2;
// SPDX-License-Identifier: UNLICENSED
import "./ERC20CARAT.sol";

contract CryptogalleryV2 {

    address payable public owner;
    uint uid;
    ERC20CARAT public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    struct artDetails {        
        address artistAddress;
        address owner;
        string description;
        uint price;
        uint id;
    }
    
    mapping(uint => artDetails) public artData;
    mapping(uint => bool) public artOnSale;
    mapping(address => int) public users;

    modifier onlyRegisteredUser {
        require(users[msg.sender] == 1, "This user is not registered.");
        _;
    }

    modifier onlyArtist (uint artId) {
        require(artData[artId].artistAddress == msg.sender);
        _;
    }


    constructor (ERC20CARAT _tokenContract, uint256 _tokenPrice) public  {
        owner = msg.sender; // Deployer of the application.
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
        uid = 100;
    }

    function register() external {
        require(users[msg.sender] != 1, "This user is already registered.");
        users[msg.sender] = 1;
        tokenContract.transferFrom(owner, msg.sender, 10000);
    }
    
    function addArt(uint id, string calldata description, uint price) external onlyRegisteredUser returns(uint artuid) {
        artDetails memory art;
        art.id = id;
        art.artistAddress = msg.sender;
        art.description = description;
        art.price = price;
        art.owner = msg.sender;
        artData[id] = art;

        artOnSale[id] = true;

        uid = uid + 1; // Increment uid for future additions.
        return id; // Return the unique id created for the art.
    }

    function purchaseArt(uint artId, uint price) external onlyRegisteredUser payable  returns(bool success){
        // Check if there is sufficient balance for the purchase
        // require(msg.value <= address(msg.sender).balance);

        address artist = artData[artId].artistAddress;
        tokenContract.transferFrom(msg.sender, artist, price);
        // payable(artist).transfer(msg.value);
        
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