var CryptogalleryV2 = artifacts.require("CryptogalleryV2");
const ERCToken = artifacts.require("ERC20CARAT.sol");

module.exports = function(deployer) {
  deployer.deploy(ERCToken, 1000000).then(function() {
    // Token price is 0.001 Ether
    var tokenPrice = 1000000000000000;
    return deployer.deploy(CryptogalleryV2, ERCToken.address, tokenPrice);
  });
};