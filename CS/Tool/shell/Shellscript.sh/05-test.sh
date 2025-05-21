#!/bin/sh

# 'test' is more frequently called as '[', '[' is a symbolic link to 'test',
# just to make shell programs more readable, so it must be surrounded by
# spaces

X=0

while [ -n "$X" ]; do
  echo "Enter some text (RETURN to quit)"
  read X
done

if [ "$X" -lt "0" ]; then
  echo "X is less than zero"
elif [ "$X" -gt "0" ]; then
  echo "X is greater than zero"
fi

[ $X -ne 0 ] && echo "X isn't zero" || echo "X is zero"