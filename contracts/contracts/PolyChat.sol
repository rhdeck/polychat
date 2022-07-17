/** 
  NXKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKXNW   
W0dlllllllllllllllllllllccclllllllllllllllllllllllllllllllllllllllllllllld0W  
Xdcccccccccccccccccccc;'....,:ccccccccccccccccccccccccccccccccccccccccccccdX  
Kdcccccccccccccccc:,..        .';:ccccccccccccccccccccccccccccccccccccccccoK  
Kdccccccccccccc;'.       .       ..,:cccccccccccccccccccccccccccccccccccccoK  
Kdcccccccccc:,.      ..,:::;'.       .,:ccccccccccccccccccccccccccccccccccdK  
Kdcccccccccc;.    .';ccccccccc;'.     .'ccccccccccccccccccccccccccccccccccdK  
Kdcccccccccc;.   .:ccccccccccccc:.     'ccccccccccccccccccccccccccccccccccdK  
Kdcccccccccc;.   .:cccccccccccccc'   .';ccc:;'....,:ccccccccccccccccccccccdK  
Kdcccccccccc;.   .:cccccccccccccc;'';ccc:,..       ..,;cccccccccccccccccccdK  
Kdcccccccccc;.   .:cccccccccccccccc:;'..               .';:cccccccccccccccdK  
Kdcccccccccc;.   .,:cccccccccccc:,..       ..,:::,..      .':cccccccccccccdK  
Kdcccccccccc:.     ..,:cccccc;'.        .';cccccccc:;'.     ,cccccccccccccdK  
Kdccccccccccc:'.      ..',,..      ..,;:cccccccccccccc:.    'cccccccccccccdK  
Kdcccccccccccccc:,..            .';:cc:cccccccccccccccc.    'cccccccccccccdK  
Kdccccccccccccccccc:;'.     ..,:cc:,...'ccccccccccccccc.    'cccccccccccccdK  
Kdccccccccccccccccccccc;,'';:cccc;.    .ccccccccccccccc.    'cccccccccccccdK  
Kdccccccccccccccccccccccccccccccc,     .;ccccccccccccc,.    'cccccccccccccdK  
Kdccccccccccccccccccccccccccccccc;.      .';:ccccc:;'.     .,cccccccccccccdK  
Kdcccccccccccccccccccccccccccccccc;..       ..','..      ..,ccccccccccccccdK  
Kdcccccccccccccccccccccccccccccccccc:;,'.             .';:ccccccccccccccccoK  
Kdccccccccccccccccccccccccccccccccccccccc:,..     ..';ccccccccccccccccccccdK  
Nklccccccccccccccccccccccccccccccccccccccccc:;''',:cccccccccccccccccccccclkN  
 N0kkxxxxxxxxxxoccccccccccccccccldxxxxkxxxxkxxxxkxxxxxxxxxxxxxxxxxxxxxkkk0N   
            WWKdccccccccccccclok0NWWW  WWW    W   W                           
             Nklcccccccccccox0XW                                              
            W0occcccccccldOXW                                                 
            XdccccccclokKN                                                    
           Nklcccccox0NW                                                      
          W0occcldOXW                                                         
          XxcldkKN                                                            
         NOdx0NW                                                              
         NKXW                                                                 

                                  PolyChat
 */
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PolyChat is Ownable {
    mapping(address => bytes) private publicKeys;
    mapping(address => string[]) private _messages;
    mapping(address => uint256) private _messagingFee;
    mapping(address => mapping(address => uint256))
        private _messagingFeeWhiteList;
    uint256 private _globalMessagingFee;

    constructor() {
        _globalMessagingFee = 10**15; //1 finney
        emit NewGlobalMessagingFee(_globalMessagingFee);
    }

    event Message(address _sender, address indexed _recepient, string _message);
    event NewPublicKey(address indexed _account, bytes _publicKey);
    event NewGlobalMessagingFee(uint256 _messagingFee);
    event NewMessagingFee(address indexed _account, uint256 _messagingFee);
    event NewWhitelistMessagingFee(
        address indexed _account,
        address fromAccount,
        uint256 _messagingFee
    );

    function setGlobalMessagingFee(uint256 _newMessagingFee) public onlyOwner {
        _globalMessagingFee = _newMessagingFee;
        emit NewGlobalMessagingFee(_newMessagingFee);
    }

    function setPublicKey(bytes memory _public_key) public {
        publicKeys[msg.sender] = _public_key;
        emit NewPublicKey(msg.sender, _public_key);
    }

    function publicKeyOf(address _address) public view returns (bytes memory) {
        return publicKeys[_address];
    }

    function setMessagingFee(uint256 _newFee) public {
        _messagingFee[msg.sender] = _newFee;
        emit NewMessagingFee(msg.sender, _newFee);
    }

    function setWhiteListFee(address _from, uint256 _newFee) public {
        _messagingFeeWhiteList[msg.sender][_from] = _newFee;
        emit NewWhitelistMessagingFee(msg.sender, _from, _newFee);
    }

    function messagingFeeFor(address _address) public view returns (uint256) {
        if (_messagingFeeWhiteList[_address][msg.sender] > 0) {
            return
                _messagingFeeWhiteList[_address][msg.sender] +
                _globalMessagingFee;
        } else if (_messagingFee[_address] > 0) {
            return _messagingFee[_address] + _globalMessagingFee;
        } else {
            return _globalMessagingFee;
        }
    }

    function globalMessagingFee() public view returns (uint256) {
        return _globalMessagingFee;
    }

    function sendMessageTo(string memory _message, address payable _address)
        public
        payable
    {
        require(
            bytes(publicKeys[_address]).length > 0,
            "Recipient public key not added"
        );
        require(
            bytes(publicKeys[msg.sender]).length > 0,
            "Sender public key not added"
        );
        if (_messagingFeeWhiteList[_address][msg.sender] > 0) {
            require(
                msg.value ==
                    _messagingFeeWhiteList[_address][msg.sender] +
                        _globalMessagingFee,
                "Incorrect messaging fee"
            );
        } else if (_messagingFee[_address] > 0) {
            require(
                msg.value == _messagingFee[_address] + _globalMessagingFee,
                "Incorrect messaging fee"
            );
        } else {
            require(
                msg.value == _globalMessagingFee,
                "Incorrect messaging fee"
            );
        }
        _address.transfer(msg.value - _globalMessagingFee);
        emit Message(msg.sender, _address, _message);
    }

    // function removeMessage(uint _index) public {
    //     delete _messages[msg.sender][_index];
    //     messageCount[msg.sender]--;
    // }

    // function messages() public view returns (string[] memory) {
    //     return _messages[msg.sender];
    // }

    function withdraw(address payable _address, uint256 _amount)
        public
        onlyOwner
    {
        _address.transfer(_amount);
    }
}
