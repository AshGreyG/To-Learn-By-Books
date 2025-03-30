#!/bin/sh

MY_MESSAGE="Hello World"
echo $MY_MESSAGE

# There is no difference between string and integer in shell.

echo "What is your name?"
read MY_NAME
echo "Hello $MY_NAME - hope you're well"

# 'read' comment automatically places quotes around its input
# If we try to read an undeclared variable, the result iss the empty
# string. You get no warnings or errors

# I put this sentence `TEST_INPUT="hello"` to the interactive shell
# $ TEST_INPUT="hello"
echo "TEST_INPUT is: $TEST_INPUT"   # TEST_INPUT is: 
TEST_INPUT="hi here"
echo "TEST_INPUT is: $TEST_INPUT"   # TEST_INPUT is: hi here

# When we call this shell script in the interactive shell, the shebang
# `#!/bin/sh` will let a new shell spawned to run the script

# Notice: use 'source' command will load the source code to the shell,
# to reproduce the phenomenon, we should use 'bash' command or chmod its
# permission and run it. If we do this, we can still use 'export' to fix.

# $ TEST_INPUT="hello"
# $ export TEST_INPUT
# $ bash ./Shellscript.sh/02-variables-part1.sh

# Once the shell script exits, its environment is destroyed. In order to
# receive environment changes back from the script, we mus 'source' the
# script. We can also source a script via the '.' command

echo "What is your name?"
read USER_NAME
echo "Hello $USER_NAME"
echo "I will create you a file called ${USER_NAME}_profile"
touch "${USER_NAME}_profile"

# Think about touch '${USER_NAME}_profile':
# If the user entered a string that has space like 'S H', then the arguments passed
# to 'touch' would be 'S' and 'H_profile'