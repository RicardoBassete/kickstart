// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.4.17;

contract Campaing {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint apprrovalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;
    Request[] public requests;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaing(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient) public restricted {
        require(approvers[msg.sender]);
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            apprrovalCount: 0
        });
        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.apprrovalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(!request.complete);
        require(request.apprrovalCount > (approversCount / 2));
        request.recipient.transfer(request.value);
        request.complete = true;
    }
}

contract CampaingFactory{
    address[] public deployedCampaings;

    function createCampaing(uint minimum) public {
        address newCampaing = new Campaing(minimum, msg.sender);
        deployedCampaings.push(newCampaing);
    }

    function getDeployedCampaigns() public view returns(address[]){
        return deployedCampaings;
    }

}


