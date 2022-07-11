// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract IPFS_Chat is Ownable{
    mapping (address => string) public publicKeys;
    mapping (address => string[]) private _messages;
    mapping (address => uint) public messageCount;

    event Message(address _sender, address indexed _recepient, string _message);

    // constructor() {
    //     publicKeys[msg.sender] = msg.sender.toString();
    // }
    function setPublicKey(string memory _public_key) public {
        publicKeys[msg.sender] = _public_key;
    }

    function publicKeyOf(address _address) public view returns (string memory) {
        return publicKeys[_address];
    }

    function sendMessageTo(string memory _message, address _address) public {
        // _messages[_address].push(_message);
        // messageCount[_address]++;
        emit Message(msg.sender, _address, _message);
    }

    // function removeMessage(uint _index) public {
    //     delete _messages[msg.sender][_index];
    //     messageCount[msg.sender]--;
    // }

    // function messages() public view returns (string[] memory) {
    //     return _messages[msg.sender];
    // }

}
