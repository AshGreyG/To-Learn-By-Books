// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract DataStorage {
    // The data of Solidity stores in three locations:
    //    1. storage: The storage data is stored on the blockchain. Modifying them
    //       needs more gas fee;
    //    2. memory: Function parameters and temporary variables are stored in
    //       memory, and they don't push to the blockchain. Especially if the returned
    //       data is variable-length, like 'string', 'bytes', 'array' and user-defined
    //       data structure. Must use 'memory' modifier.
    //    3. calldata: Similar to 'memory', stored in memory, and they don't push to
    //       the blockchain. The difference is that 'calldata' is immutable. Usually
    //       it's used in function parameters.

    function usingCalldata(uint[] calldata _x)
        public
        pure
        returns(uint[] calldata returnImmutable) {

        // If we change the value of _x like _x[0] = 0, then it will raise an error.
        return (_x);
    }

    // Storage -> storage: Creates a reference, change the new value will also change
    // the old value.

    uint[] testStorageReference = [1, 2, 3];

    function testStorageChangeRef() public payable {
        uint[] storage newStorage = testStorageReference;
        newStorage[0] = 100;
    }

    // Memory -> memory:  Creates a reference

    struct TestMemoryRef {
        uint256 value;
    }

    function testMemoryChangeRef() public pure
        returns(uint256, uint256, bool) {
        TestMemoryRef memory data1;
        data1.value = 10;

        TestMemoryRef memory data2 = data1;
        data2.value = 100;

        return (data1.value, data2.value, data1.value == data2.value);
    }

    // Other assignments won't change the original value.

    // There are three variable scopes:
    //   + State variables
    //   + Local variables
    //   + Global variables

    string public testStateVariables = "This is a state variable";

    function testLocalVariablesFn() external pure returns(uint) {
        uint testX = 1;
        uint testY = 3;
        uint testZ = testX + testY;
        return testZ;
        // They are local variables
    }

    // Global variables are the variable working globally, they are keywords of
    // Solidity. They can be used in function without declaration:

    function testGlobalVariablesFn() external view
        returns(address, uint, bytes memory) {
        address globalSender = msg.sender;
        uint blockNum = block.number;
        bytes memory globalData = msg.data;
        return (globalSender, blockNum, globalData);
    }

    // Solidity doesn't have float number, it uses 'wei' as its minimum uint:
    //    + wei: 1
    //    + gwei: 1e9 = 1000000000
    //    + ether: 1e18 = 1000000000000000000

    function testWeiUnit() external pure returns(uint) {
        assert(1 wei == 1e0);
        assert(1 wei == 1);
        return 1 wei;
    }
    function testGweiUnit() external pure returns(uint) {
        assert(1 gwei == 1e9);
        assert(1 gwei == 1000000000);
        return 1 gwei;
    }
    function testEtherUnit() external pure returns(uint) {
        assert(1 ether == 1e18);
        assert(1 ether == 1000000000000000000);
        return 1 ether;
    }

    // We can use time unit to define an operation must be executed during a period
    // of time, such as 1 week, 1 month etc.

    function secondsUnit() external pure returns(uint) {
        assert(1 seconds == 1);
        return 1 seconds;
    }
    function minutesUnit() external pure returns(uint) {
        assert(1 minutes == 60);
        assert(1 minutes == 60 seconds);
        return 1 minutes;
    }
    function hoursUnit() external pure returns(uint) {
        assert(1 hours == 3600);
        assert(1 hours == 60 minutes);
        return 1 hours;
    }
    function daysUnit() external pure returns(uint) {
        assert(1 days == 86400);
        assert(1 days == 24 hours);
        return 1 days;
    }
    function weeksUnit() external pure returns(uint) {
        assert(1 weeks == 604800);
        assert(1 weeks == 7 days);
        return 1 weeks;
    }

    // Array and Struct of Solidity:

    uint256[] public storageArray;

    function testArrays() external payable
        returns(
            uint[] memory returnArray1,
            bytes memory returnArray2,
            uint256[3] memory returnArray3
        ) {

        uint[] memory testArray1 = new uint[](5);
        bytes memory testArray2 = new bytes(9);
        // Using 'new' operator to declared 'unfixed length array', the array can't
        // change its size, so it can't use 'pop' and 'push' method actually.
        uint256[3] memory testArray3 = [uint256(1), 2, 3];
        // This is the fixed length array.

        uint length1 = returnArray1.length;
        // Every array has a property called 'length'
        storageArray.push(3);
        // Dynamic arrays declared inside a function can't invoke their 'pop' or 'push' method.
        // Because when we declare a 'memory' variable inside a function, we need to specify
        // its memory size.
        // We can only invoke the 'pop' or 'push' method of 'storage' dynamic array.

        return (testArray1, testArray2, testArray3);
    }

    struct Student {
        uint256 id;
        uint256 score;
    }

    Student student;

    function initStudent1() external payable {
        Student storage testStudent = student;
        testStudent.id = 11;
        testStudent.score = 100;
    }
    function initStudent2() external payable {
        student.id = 11;
        student.score = 100;
    }
    function initStudent3() external payable {
        student = Student(11, 100);
    }
    function initStudent4() external payable {
        student = Student({ id: 11, score: 100 });
    }
}