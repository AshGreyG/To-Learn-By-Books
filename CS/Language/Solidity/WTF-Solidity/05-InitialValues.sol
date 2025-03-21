// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract InitialValues {
    bool    public testInitialBool;     // false
    string  public testInitialString;   // ""
    int     public testInitialInt;      // 0
    uint    public testInitialUint;     // 0
    address public testInitialAddress;  // 0x0000...000

    enum TestInitialEnum {
        Buy,
        Hold,
        Sell
    }
    TestInitialEnum public testInitialEnum; // first element 0

    function testInitialInternal() internal {}
    function testInitialExternal() external {}

    uint[8] public testInitialStaticArray;
    // A static array which all members set to their default values
    // [0, 0, 0, 0, 0, 0, 0, 0]
    uint[]  public testInitialDynamicArray;
    // []

    mapping(uint => address) public testInitialMapping;
    // A mapping which all members set to their default values

    struct Student {
        uint256 id;
        uint256 score;
    }
    Student public testInitialStruct;
    // A struct in which all members are set to their default values

    // 'delete' operator will change the value of variable to its initial value

    bool public testDeleteBool = true;

    function deleteBool() external {
        delete testDeleteBool;
    }
}