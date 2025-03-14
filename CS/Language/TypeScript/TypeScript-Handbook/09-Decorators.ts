// Decorators provide a way to add both annotations and a meta-
// programming syntax for class declarations and members

// Decorators use the form '@expression', where 'expression' must
// evaluate to a function that will be called at runtime with information
// about the decorated declaration.

// A *Decorator Factory* is simply a function that returns the expression
// that will be called by the decorator at runtime

function color(value: string): (target: any) => void {
  // This is the decorator factory, it sets the returned decorator function
  return function (target: any) {
    // This is the decorator do something with 'target' and 'value'
  }
}

// 1. The expression for each decorators are evaluated top-to-bottom
// 2. The results are then called as functions from bottom-to-top

// Decorators need tsconfig.json to enable these features:
// {
//   "compilerOptions": {
//     "experimentalDecorators": true,
//     "emitDecoratorMetadata": true
//   }
// }

function first(): (
  target: any, 
  propertyKey: string, 
  descriptor: PropertyDescriptor
) => void {
  console.log("first(): factory evaluated");
  return function(
    target: any, 
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("first(): called");
  }
}

function second(): (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => void {
  console.log("second(): factory evaluated");
  return function(
    target: any, 
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("second(): called");
  }
}

class ExampleClass {
  @first()
  @second()
  method() {}
}

// A *Class Decorator* is declared just before a class declaration. The class
// decorator is applied to the constructor of the class and can be used to
// observe, modify, or replace a class definition. A class decorator cannot
// be used in a declaration file, or in any other ambient context.

function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class BugReport {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }
}