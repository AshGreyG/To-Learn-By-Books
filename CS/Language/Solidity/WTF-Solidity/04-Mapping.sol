// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Mapping {
    // With 'mapping' type people can query the corresponding 'Value' by using a 'Key'.
    // For example, a person's wallet address can be queried by their 'id'
    // 
    // `mapping(_KeyType => _ValueType)`

    mapping(uint => address) public idToAddress;
    mapping(address => address) public swapPair;

    // 1. The '_KeyType' should be selected among default types in Solidity such as
    //    'uint', 'address', etc. No custom 'struct' can be used. However, '_ValueType'
    //    can be any custom type.

    struct Student {
        uint256 id;
        uint256 score;
    }
    
    // mapping(Student => uint) public testFromStructToDefault;    // uncomment here
    // Only elementary types, user defined value types, contract types or enums 
    // are allowed as mapping keys

    mapping(uint => Student) public testFromDefaultToStruct;

    // 2. The storage location of the mapping must be storage: it can serve as
    //    the state variable or the 'storage' variable inside the function. But
    //    it can't be used in arguments or return results of 'public' function

    // 3. If the mapping is declared as 'public' then Solidity will automatically
    //    create a 'getter' function for you to query for the 'Value' by the 'Key'

    // 4. The syntax of adding a key-value pair to a mapping is
    //    `_MappingName[_Key] = _Value`

    function writeStudentMap(uint _key, uint256 studentID, uint256 studentScore) public {
        testFromDefaultToStruct[_key] = Student({
            id: studentID,
            score: studentScore
        });
    }
}