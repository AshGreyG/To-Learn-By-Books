// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract ValueTypes {
    address public testAddress = 0x00000000219ab540356cBB839Cbe05303d7705Fa;
    address payable public testPayableAddress = payable(testAddress);

    bytes32 testFixedArray = "MiniSolidity";
    bytes1 firstChar = testFixedArray[0];

    enum ActionSet {
        Buy,
        Hold,
        Sell
    }
    ActionSet action = ActionSet.Buy;

    function enumToUint() external view returns(uint) {
        return uint(action);
    }
}