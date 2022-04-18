pragma solidity ^0.6.2;
contract CryptogalleryV1 {

    address payable public owner;
    struct artDetails {                  
        uint id;
        address artistAddress;
        string artistName;
        string description;
        uint price;
    }

    struct artDetailsTemp {                  
        uint id;
        uint price;
    }
    
    mapping(address => artDetailsTemp) public artOwners;
    mapping(address => uint) public Buyers;


    constructor () public  {
        owner = msg.sender;
    }
    
     
    function purchaseArt(uint artId) payable external{
        owner.transfer(msg.value);
        artOwners[msg.sender].id = artId;
        artOwners[msg.sender].price = msg.value;
    }

    function getbalance() public view returns (uint balance){
        return owner.balance;
    }
    
}