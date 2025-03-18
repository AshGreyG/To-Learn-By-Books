// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

// function <function name>([parameter types[, ...]])
// { | internal 
//   | external
//   | public
//   | private }
// [ | pure
//   | view
//   | payable ]
// [ | virtual 
//   | override ]
// [<modifiers>] [returns (<return type>)] {<function body>}

// + internal: Only this contract and the extended contract can access;
// + external: Only the outside of this contract can access, inside can use 
//   'this.<function name>' to invoke the function;
// + public: Both outside and inside can access;
// + private: Only this contact can access. The extended contract can't.

// Functions in contract should be specified one of these modifiers, it doesn't
// have default value.

// Variables can also be modified with these modifiers, and 'internal' is the
// default value. The 'public' modifier will generate a getter function with
// same name automatically.

// The state variables of contract are stored on the blockchain, changing them
// needs to pay gas fee for EVM. The 'pure' and 'view' function doesn't change
// state variables, so they don't need to pay the gas fee.

contract FunctionTypes {
    uint256 public testPublicNumber = 5;

    function addNumberPayable() external payable {
        testPublicNumber += 1;
        // This operation changes the state variable, so it is 'payable'
    }
    function addNumberPure(uint256 _number) external pure 
        returns(uint256 newNumber) {
        return _number + 1;
    }
    function addNumberView() external view returns(uint256 newNumber) {
        return testPublicNumber + 1;
    }

    function minusNumber() internal {
        testPublicNumber -= 1;
    }
    function minusNumberCall() external {
        minusNumber();
    }
    function minusNumberPayable() external payable
        returns(uint256 balance) {
        minusNumber();
        balance = address(this).balance;
    }

    function returnMultiple() public pure
        returns(
            uint256 returnNumber, 
            bool returnBoolean, 
            uint256[3] memory returnArray
        ) {
        return (1, true, [uint256(1), 2, 3]);

        // Here 'uint256[3]' declares a uint256 array whose length is 3. Because
        // the default type of '[1, 2, 3]' is 'uint8[3]', so we need use 'uint256'
        // conversion function to convert the type of first element to 'uint256'
    }

    // Destructure assignment:

    function readReturn() public pure {
        uint256 testReturnNumber;
        bool testReturnBoolean;
        uint256[3] memory testReturnArray;
        (testReturnNumber, testReturnBoolean, testReturnArray) = returnMultiple();
        
        // We can also ignore unnecessary return values:

        bool doNotNeedOthers;
        (, doNotNeedOthers, ) = returnMultiple();
    }

}