// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

// The 'error' statement is a new feature in solidity 0.8. It saves gas
// and informs users why the operation failed. It is the recommended
// way to throw errors in Solidity. Custom errors are defined using the
// error statement, which can be used inside and outside of contracts.

contract TestError {
    error TransferNotOwner();

    mapping(uint256 => address) owners;

    function transferOwner1(uint256 tokenID, address newOwner) public {
        if (owners[tokenID] != msg.sender) {
            revert TransferNotOwner();
        }
        owners[tokenID] = newOwner;
    }

    // 'transferOwner1()' function will check if the caller is the owner of
    // the token; if not, it will throw a `TransferNotOwner` error and
    // revert the transaction.

    // The 'require' statement was the most commonly used method for error
    // handling prior to solidity 0.8.

    function transferOwner2(uint256 tokenID, address newOwner) public {
        require(owners[tokenID] == msg.sender, "Transfer not owner");
        owners[tokenID] = newOwner;
    }

    // The 'assert' statement is generally used for debugging purposes because
    // it does not include an error message to inform the user. If the condition
    // is not met, an error will be thrown

    function transferOwner3(uint256 tokenID, address newOwner) public {
        assert(owners[tokenID] == msg.sender);
        owners[tokenID] = newOwner;
    }
}