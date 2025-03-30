#!/bin/sh
# This is a comment without !

echo "Hello World!"             # Hello World!
echo "Hello * World!"           # Hello * World!
echo Hello * World!             # Hello 01-hello-world.sh World!
echo Hello        World!        # Hello World!
echo "Hello" World!             # Hello World!
echo Hello "       " World!     # Hello         World!
echo "Hello "*" World!"         # error
echo `Hello` World!             # `Hello` World!
echo `Hello` World!             # `Hello` World!