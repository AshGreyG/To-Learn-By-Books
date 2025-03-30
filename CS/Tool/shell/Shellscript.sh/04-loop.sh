#!/bin/sh

for i in 1 2 3 4 5
do
  echo "Looping >>> number $i"
done

for i in hello 1 * 2 goodbye
do
  echo "Looping ... i is set to $i"
done

# The * is expand to the files in the current directory

INPUT_STRING="hello"

while [ "$INPUT_STRING" != ".exit" ]
do
  echo "Please type something in (.exit to quit)"
  read INPUT_STRING
  echo "You typed: $INPUT_STRING"
done

while read INPUT_TEXT
do
  case $INPUT_TEXT in
    hello)        echo "English"    ;;
    howdy)        echo "American"   ;;
    gday)         echo "Australian" ;;
    bonjour)      echo "French"     ;;
    "guten tag")  echo "German"     ;;
    *)            echo "Unknown language: $INPUT_TEXT"
      ;;
  esac
done < myfile.txt