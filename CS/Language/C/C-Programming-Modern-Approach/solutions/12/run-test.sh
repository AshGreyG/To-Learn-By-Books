# Run the make to generate executable program

echo ">> Clean the last made executable program and remake"

make clean
make

echo ">> "

# Run all the tests

for file in ./test/*; do
  echo ">> Processing $file, and here is the results: "
  echo ">> "
  ./justify < $file
  echo ">> "
done
