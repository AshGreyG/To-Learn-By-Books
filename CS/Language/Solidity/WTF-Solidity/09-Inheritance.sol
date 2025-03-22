// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Base {
    // There are two keywords for inheritance in Solidity:
    //   + 'virtual': If the function in the parent contract are expected to be
    //     overridden in its child contracts, they should be declared as 'virtual'
    //   + 'override': If the function in the child contract override the functions
    //     in its parent contract, they should be declared as 'override'

    // If a function both overrides and is expected to be overridden, it should be
    // labelled as 'virtual override'. 
    // If a 'public' state variable is labelled as 'override', its 'getter' function
    // will be overridden.

    event Log(string message);

    function testLog1() public virtual {
        emit Log("Base::testLog1");
    }
    function testLog2() public virtual {
        emit Log("Base::testLog2");
    }
    function base() public virtual {
        emit Log("Base::base");
    }
}

contract Derived is Base {
    function testLog1() public virtual override {
        emit Log("Derived::testLog1");
    }
    function testLog2() public virtual override {
        emit Log("Derived::testLog2");
    }
    function derived() public virtual {
        emit Log("Derived::derived");
    }
}

contract MultipleDerived is Base, Derived {
    function testLog1() public virtual override(Base, Derived) {
        emit Log("MultipleDerived::testLog1");
    }
    function testLog2() public virtual override(Base, Derived) {
        emit Log("MultipleDerived::testLog2");
    }

    // Apply inheritance to those 2 functions explicitly
}