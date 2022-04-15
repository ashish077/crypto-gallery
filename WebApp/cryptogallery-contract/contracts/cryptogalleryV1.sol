pragma solidity >=0.4.22 <=0.6.0;
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
    
     
    function purchaseArt(uint artId, uint price) public payable{
        owner.transfer(price);
        artOwners[msg.sender].id = artId;
        artOwners[msg.sender].price = price;
    }

    function getbalance() public view returns (uint balance){
        return address(this).balance;
    }
    
}