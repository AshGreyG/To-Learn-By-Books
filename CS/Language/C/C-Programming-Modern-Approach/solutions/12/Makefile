# Each source file in the program must be compiled separately. Header files
# don't need to be compiled; the contents of a header file are automatically
# compiled whenever a source file that includes it is compiled. For each source
# file, the compiler generates a file containing object code. These files are
# known as *object files*, have the extension '.o' in UNIX and '.obj' in Windows.
#
# The linker combines the object files created in the previous step, along with
# code for library functions, to produce an executable file. The linker is
# responsible for resolving external references left behind
#
# gcc -o justify justify.c line.c word.c
#
# The three source files are first compiled into object code. The object files
# are then automatically passed to the linker, which combines them into a single
# file.

compiler = gcc
target = justify
sources = justify.c log.c word.c line.c
headers = $(sources:.c=.h)
objects = $(sources:.c=.o)

# sources are source files and objects are object code files.

$(target): $(objects)
	$(compiler) $(objects) -o $@

# Dependency 1, target is dependent with object code files.

%.o: %.c
	$(compiler) -c $< -o $@

clean:
	rm -f $(objects) $(target) *.log
