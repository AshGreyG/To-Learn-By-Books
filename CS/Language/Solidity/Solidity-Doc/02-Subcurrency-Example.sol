// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract Coin {
    address public minter;

    // The keyword 'public' makes variables accessible from other
    // contracts. The 'address' type is a 160-bit (or 20-byte) value
    // that does not allow any arithmetic operations. It is suitable
    // for storing addresses of contracts, or a hash of the public
    // half of a key-pair.

    // 'public' keyword is equivalent to the following code

    function getMinter() external view returns (address) { return minter; }

    mapping(address => uint) public balances;

    // This 'mapping' type maps addresses to unsigned integers. The getter
    // function created by the 'public' keyword is more complex in the
    // case of a mapping. It looks like the following:

    function getBalances(address account) external view returns (uint) {
        return balances[account];
    }

    event Sent(address from, address to, uint amount);

    // It declares an event which is emitted in the last line of the function
    // 'send'. Ethereum clients such as web applications can listen for
    // these events emitted on the blockchain without much cost. As soon as
    // it's emitted, the listener receives the arguments 'from', 'to' and
    // 'amount', which makes it possible to track transactions.

    constructor() {
        minter = msg.sender;
    }

    // The constructor function is a special function that is executed during
    // the creation of the contract and cannot be called afterwards. In this
    // case, it permanently stores the address of the person creating the
    // contract. The 'msg' variable (together with 'tx' and 'block') is a
    // special global variable that contains properties which allow access to
    // the blockchain. 'msg.sender' is always the address where the current 
    // function call came from.

    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        balances[receiver] += amount;
    }

    // The mint function sends an amount of newly created coins to another
    // address. The 'require' function call defines conditions that reverts
    // all changes if not met. In this example, it ensures that only the
    // creator of the contract can call 'mint'.

    // Note that because of the default checked arithmetic, the transaction
    // would revert if the expression overflows.

    error InsufficientBalance(uint requested, uint available);

    // Errors allow you to provide more information to the caller about why
    // a condition or operation failed. 

    function send(address receiver, uint amount) public {
        require(
            amount <= balances[msg.sender],
            InsufficientBalance(amount, balances[msg.sender])
        );
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}