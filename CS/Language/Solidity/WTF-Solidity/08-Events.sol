// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Event {
    mapping(address => uint256) public balances;

    event Transfer(address indexed from, address indexed to, uint256 value);

    // The events are declared with the 'event' keyword, followed by the event
    // name, and then the type and name of each parameter to be recorded.
    // 'Transfer' event records three parameters: 'from', 'to' and 'value',
    // which correspond to the address where the tokens are sent, the receiving
    // address, and the number of tokens being transferred. 'from' and 'to'
    // are marked with 'indexed' keywords, which will be stored in a special
    // data structure known as 'topics' and easily queried by programs.

    function emitTransfer(address from, address to, uint256 amount) external {
        balances[from] = 1000000;
        balances[from] -= amount;
        balances[to] += amount;

        emit Transfer(from, to, amount);
    }

    // EVM uses 'log' to store Solidity events. Each log contains two parts:
    // 'topics' and 'data'.
    //
    // 'Topics' is used to describe events. Each event contains a maximum of 4
    // 'topics'. Typically, the first 'topic' is the event hash: the hash of the
    // event signature:
    //
    //    keccak256("Transfer(address,address,uint256)")
    //
    // Besides event hash, 'topics' can include 3 'indexed' parameters, such as
    // the 'from' and 'to' parameters in the 'Transfer' event. The anonymous
    // event is special: it does not have an event name and can have 4 'indexed'
    // parameters at maximum.

    // 'indexed' parameters can be understood as the indexed "key" for events, 
    // which can be easily queried by programs. The size of each 'indexed' parameter
    // is 32 bytes. For the parameters larger than 32 bytes, such as 'array' and
    // 'string', the hash of the underlying data is stored.

    // Non-indexed parameters will be stored in the 'data' section of the log. They
    // can be interpreted as the value of the event and can't be retrieved directly.
    // But they can store data with larger sizes. Therefore, the 'data' section can
    // be used to store complex data structures, such as 'array' and'string'. 'data'
    // consumes less gas compared to 'topic'
}