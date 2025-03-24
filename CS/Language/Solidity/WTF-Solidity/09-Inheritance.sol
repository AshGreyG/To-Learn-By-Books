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

    modifier exactDividedBy2And3(uint a) virtual {
        require(a % 2 == 0 && a % 3 == 0);
        _;
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

    function getExactDividedBy2And3WithoutModifier(uint divided) public pure
        returns(uint, uint) {
        uint div2 = divided / 2;
        uint div3 = divided / 3;
        return (div2, div3);
    }

    function getExactDivided2And3(uint divided) public exactDividedBy2And3(divided) pure
        returns(uint, uint) {
        return getExactDividedBy2And3WithoutModifier(divided);
    }
}

contract MultipleDerived is Base, Derived {
    function testLog1() public virtual override(Base, Derived) {
        emit Log("MultipleDerived::testLog1");
    }
    function testLog2() public virtual override(Base, Derived) {
        emit Log("MultipleDerived::testLog2");
    }

    function testCallParent() public {
        Base.testLog1();
        Derived.testLog2();

        // Direct calling: The child component can directly call the parent's function with
        // 'parentContractName.functionName()'

        uint testResult;
        (, testResult) = super.getExactDividedBy2And3WithoutModifier(6);

        // 'super' keyword: The child contract can use the 'super.functionName()' to call
        // the function in the nearest parent contract iin the inheritance hierarchy.
        // Solidity inheritance is declared in a right-left order.
    }

    // Apply inheritance to those 2 functions explicitly
}