// SPDX-License-Identifier: GPL-3.0


pragma solidity >=0.7.0 <0.9.0;

//declare variable here




contract Testbadge {
    event badgeAttached(address indexed _from, string userId);
    
      mapping (address => string) public userId;  

    constructor (){}

    function discordId(string memory _newUser) external {
        
        userId[msg.sender]= _newUser;
        emit badgeAttached(msg.sender, _newUser);
        
    }

    

}