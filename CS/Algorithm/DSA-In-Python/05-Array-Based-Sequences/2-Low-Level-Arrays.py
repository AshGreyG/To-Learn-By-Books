import copy
import sys
import ctypes
from array import *

# A computer's main memory performs as *random access memory* (RAM). That is,
# it is just easy a retrieve byte #8675309 as it is to retrieve #309. We say
# that any individual byte of memory can be stored or retrieved in O(1) time.

# A group of related variables can be stored one after another in a contiguous
# portion of the computer's memory. We will denote such a representation as an
# *array*.

# A string "ashgrey" is stored in memory as a continuous memory, each character
# is stored in two bytes.

test_string_array = ["Alice", "Bob", "Charlie", "David"]

# Python must adhere to the requirement that each cell of the array use the same
# number of bytes. Python could attempt to reserve enough space for each cell
# to hold the maximum length string, but that would be wasteful.

# Instead, Python represents a list or tuple instance using an internal storage
# mechanism of an array of object references. At the lowest level, what is stored
# is a consecutive sequence of memory addresses at which the elements of the 
# sequence reside.

test_string_array[1] = "AshGrey"
print(test_string_array)

# AshGrey

# 'test_string_array[1]' command doesn't change the existing integer object; it
# changes the reference in cell 1 of the list to reference a different object.

test_shallow = test_string_array
test_string_array[1] = "Huaier"
print(test_shallow)

# Huaier

# Making a new list as a copy of an existing one, with syntax like
#   1. 'test_shallow = test_string_array'
#   2. 'test_shallow = list(test_string_array)'

test_deep = copy.deepcopy(test_string_array)
test_string_array[1] = "AshGrey"
print(test_deep)

# Huaier

# Using 'copy.deepcopy' can create a new list with new elements.

test_counter = [8] * 8
print(test_counter)
print(sys.getsizeof(test_counter))          # 120

# All elements share the reference to the same object 5

test_counter_array = array("i", [8, 8, 8, 8, 8, 8, 8, 8])
print(sys.getsizeof(test_counter_array))    # 112

# Integers stored compactly as elements of a Python 'array', not just a list of int
# reference. The public interface for the 'array' class conforms mostly that of a
# Python list. The constructor for the 'array' class requires a **type code** as a
# first parameter.

# When creating a low-level array in a computer system, the pre-size of that array
# must be explicitly declared in order for the system to properly allocate a
# consecutive piece of memory for its storage.

# The system might dedicate neighboring memory locations to store other data, the
# capacity of an array cannot trivially be increased by expanding into subsequent cells.

# Instance of `tuple` and `str` are immutable, so the correct size for an underlying
# array can be fixed when the object is instantiated.

# Python list can add elements or delete elements, it relies on an algorithmic sleight
# of hand known as a **dynamic array**.

test_data = []

for k in range(20) :
    a = len(test_data)
    b = sys.getsizeof(test_data)
    print("Length: {0:3d}; Size in bytes: {1:4d}".format(a, b))
    test_data.append(None)

# Length:   0; Size in bytes:   56
# Length:   1; Size in bytes:   88  <- memory change #1 + 32
# Length:   2; Size in bytes:   88
# Length:   3; Size in bytes:   88
# Length:   4; Size in bytes:   88
# Length:   5; Size in bytes:  120  <- memory change #2 + 32
# Length:   6; Size in bytes:  120
# Length:   7; Size in bytes:  120
# Length:   8; Size in bytes:  120
# Length:   9; Size in bytes:  184  <- memory change #3 + 64
# Length:  10; Size in bytes:  184
# Length:  11; Size in bytes:  184
# Length:  12; Size in bytes:  184
# Length:  13; Size in bytes:  184
# Length:  14; Size in bytes:  184
# Length:  15; Size in bytes:  184
# Length:  16; Size in bytes:  184
# Length:  17; Size in bytes:  248  <- memory change #4 + 64
# Length:  18; Size in bytes:  248
# Length:  19; Size in bytes:  248

# An empty list instance already requires a certain number of bytes of memory

# -        `_n`: The number of actual elements currently stored in the list
# - `_capacity`: The maximum number of elements that could be stored in the
#                currently allocated array
#          `_A`: The reference to the currently allocated array (initially 
#                `None`)

class DynamicArray :
    """ A dynamic array class akin to a simplified Python list """

    def __init__(self) :
        """ Create an empty array """
        self._n : int = 0
        self._capacity : int = 1
        self._A = self._make_array(self._capacity)

    def __len__(self) :
        """ Return number of elements stored in the array. """
        return self._n

    def _make_array(self, c : int) :
        """ Return new array with capacity c. """
        return (c * ctypes.py_object)()
