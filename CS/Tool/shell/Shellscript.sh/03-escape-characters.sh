#!/bin/sh

# Most characters like *, ' are not interpreted, they are
# taken literally by means of placing them in double quotes.

echo *      # list all files in the current directory
echo "*"    # display *

# However ", $, \ are still interpreted by the shell, even when they're
# in double quotes

echo "A quote is \", backslash is \\, backtick is \`."