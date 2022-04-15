pragma solidity >=0.4.22 <=0.6.0;
contract Cryptogallery {

    address payable public owner;
    uint uid;

    struct artDetails {
        uint id;
        address payable artistAddress;
        string artistName;
        string description;
        uint price;
        address owner;
    }
    
    mapping(uint => artDetails) artData;
    mapping(uint => bool) artsSold;

    mapping(address => uint[]) public artOwners; //Mapping to hold the list of uids bought by a buyer.
    mapping(address => uint[]) public artSellers; //Mapping to hold the list of uids sold by an artist.

    mapping(address => string) public userNames;
    mapping(address => int) public users;

    modifier onlyRegisteredUser {
        require(users[msg.sender] == 1);
        _;
    }

    modifier onlyArtist (uint artId) {
        require(artData[artId].artistAddress == msg.sender);
        _;
    }


    constructor () public  {
        owner = msg.sender; // Deployer of the application.
        uid = 0;
    }

    function register(string memory name) public {
        require(users[msg.sender] != 1, "This user is already registered.");
        users[msg.sender] = 1;
        userNames[msg.sender] = name;
    }
    
    function addArt(string memory description, uint price) public onlyRegisteredUser returns(uint artuid) {
        artDetails memory art;
        art.id = uid; // Generates a unique identifier for the art being added
        art.artistAddress = msg.sender;
        art.artistName = userNames[msg.sender];
        art.description = description;
        art.price = price;
        art.owner = msg.sender;
        artData[uid] = art;

        uid = uid + 1; // Increment uid for future additions.
        // uid = artData.length + 1; // Check this later
        return uid; // Return the unique id created for the art.
    }

    function purchaseArt(uint artId) external onlyRegisteredUser payable  returns(bool success){
        // Check if there is sufficient balance for the purchase
        require(msg.value == artData[artId].price);
        require(msg.value <= address(msg.sender).balance);

        artData[artId].artistAddress.transfer(msg.value);

        artOwners[msg.sender].push(artId);

        return true;
    }

    function getbalance() public view returns (uint balance){
        return address(this).balance;
    }

    function manageArt(uint artId, uint updatedPrice) external onlyArtist(artId) returns(bool success){
        require(artsSold[artId] == false);
        artData[artId].price = updatedPrice;
        return true;
    }
    
}