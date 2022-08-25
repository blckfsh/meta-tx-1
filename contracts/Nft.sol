// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/metatx/MinimalForwarder.sol";
// import "hardhat/console.sol";

contract Nft is ERC721, ERC2771Context {
    mapping(uint => address) public tokenOwners;
    constructor(MinimalForwarder _minimalForwarder, string memory _name, string memory _symbol) 
        ERC721(_name, _symbol) 
        ERC2771Context(address(_minimalForwarder)) 
    {}

    function mint(address _receiver, uint _tokenId) public {        
        tokenOwners[_tokenId] = _receiver;
        _mint(_receiver, _tokenId);
    }

    function _msgSender() internal view override(Context, ERC2771Context)
      returns (address sender) {
      sender = ERC2771Context._msgSender();
    }

    function _msgData() internal view override(Context, ERC2771Context)
        returns (bytes calldata) {
        return ERC2771Context._msgData();
    }
}