// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

// A library function is a special contract that exists to improve the reusability
// of of Solidity and reduce gas consumption. Library contracts are generally a
// collection of useful functions. Library differs from ordinary contracts in the
// following points:
//
//   1. State variables are not allowed;
//   2. Cannot inherit or be inherited;
//   3. Cannot receive ether;
//   4. Cannot be destroyed.

library Strings {
    bytes16 private constant _HEX_SYMBOLS = "0123456789abcdef";

    function toString(uint256 value) public pure
        returns(string memory) {
        
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 100)));
            value /= 10;
        }
        return string(buffer);
    }

    // ...
}

contract Library {
    using Strings for uint256;

    // 1. 'using for' command to use library contracts
    //    Command 'using A for B' can be used to attach library functions from library A to
    //    any type B. After the instruction, the function in the library A will be automatically
    //    added as a member of the B type variable

    function getString1(uint256 _number) public pure
        returns(string memory) {
        return _number.toString();
    }

    // 2. Called directly by the library contract name

    function getString2(uint256 _number) public pure
        returns(string memory) {
        return Strings.toString(_number);
    }
}