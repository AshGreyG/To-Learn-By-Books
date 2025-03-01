class PointWithType {
  x: number;
  y: number;

  // A field declaration creates a public writeable property
  // on a class. As with other locations, the type annotation
  // is optional, but will be an implicit 'any' if not specified.
}

const pt: PointWithType = new PointWithType();
pt.x = pt.y = 0;

class PointWithInitializer {
  x: number = 0;
  y: number = 0;

  // Fields can also have initializers, these will run automatically
  // when the class is instantiated.
}

class PointWithConstructor {
  x: number;
  y: number;
  noError!: string;

  // If you intend to definitely initialize a field through means
  // other than the constructor, you can use the definite assign-
  // ment assertion operator !

  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

class Greeter {
  readonly name: string = "World";

  constructor(otherName?: string) {
    if (otherName !== undefined) {
      this.name = otherName;
    }
  }

  outsideConstructor() {
    // this.name = "Oh!";  // uncomment here
    //      ^^^^
    // Cannot assign to 'name' because it's a readonly property
  }
}

// Class constructors are very similar to functions. You can add
// parameters with type annotations, default values, and overloads.

class PointWithOverloads {
  x: number = 0;
  y: number = 0;

  constructor(x: number, y: number);
  constructor(xy: string);
  constructor(x: string | number, y: number = 0) {

  }

  // Constructor can't have type parameters
  // Constructor can't have return type annotations, the class instance
  // type is always what's returned.
}

class Base {
  k: number = 4;
}

class Derived extends Base {
  constructor() {
    super();

    // Just in JavaScript, if you have a base class, you'll need to call
    // 'super()' in your constructor body before using any 'this'

    console.log(this.k);
  }
}

class TestGettersAndSetters {
  _length: number = 0;

  get length(): number {
    return this._length;
  }

  set length(value: number) {
    this._length = value;
  }

  // If 'get' exists but no 'set', the property is automatically 'readonly'
  // If the type of the setter parameter is not specified, it is inferred
  // from the return type of the getter.
}

// Since TypeScript 4.3, it is possible to have accessors with different
// types for getting and setting:

class DifferentGettingAndSettingType {
  _size: number = 0;

  get size(): number {
    return this._size;
  }

  set size(
    value:
      | string
      | number
      | boolean
  ) {
    let num: number = Number(value);

    if (!Number.isFinite(num)) {
      this._size = 0;
      return;
    }

    this._size = num;
  }
}

class IndexSignatures {
  [s: string]: 
    | boolean
    | ((s: string) => boolean);
  
  check(s: string): boolean {
    return this[s] as boolean;
  }
}

// 'implements' clauses: You can use an 'implement' clause to check
// that a class satisfies a particular 'interface'. An error will be
// issued if a class fails to correctly implement it.

interface Pingable {
  ping: () => void;
}

class Sonar implements Pingable {
  ping() {
    console.log("Ping!");
  }
}

// Classes may also implement multiple interfaces like
// class C implements A, B {}

// An 'implements' clause is only a check that the class can be treated
// as the interface type. It doesn't change the type of the class or
// its methods at all.

interface Checkable {
  check: (name: string) => boolean;
}

class NameChecker implements Checkable {
  check(s: string): boolean {  // s: any
    return s.toLowerCase() === "ok";
  }
}

// Classes may 'extend' from a base class. A derived class has all the
// properties and methods of its base class, and can also define
// additional members.

class Animal {
  x: number = 0;
  y: number = 0;

  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }
}

class Dog extends Animal {
  woof(times: number) {
    for (let i: number = 0; i < times; ++i) {
      console.log("Woof!");
    }
  }
}

const dog: Dog = new Dog();
dog.move(3, 4); // Base class method
dog.woof(4);    // Derived class method

// A derived class can also override a base class field or property.
// You can use 'super.' syntax to access base class methods. Note that
// because JavaScript classes are a simple lookup object, there is no
// notion of a 'super field'

class UsingSuperBase {
  greet() {
    console.log("Hello, world!");
  }
}

class UsingSuperDerived extends UsingSuperBase {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}

// The order of class initialization, as defined by JavaScript, is
//   1. The base class fields are initialized;
//   2. The base class constructor runs;
//   3. The derived class fields are initialized;
//   4. The derived class constructor runs.

class Greeter1 {
  public greet() {
    console.log("Hello, world!");
  }
}

// 'public' is already the default visibility modifier, you don't ever
// need to write it on a class member.

class Greeter2 {
  public greet() {
    console.log("Hello, " + this.getName());
  }
  protected getName(): string {
    return "hi";
  }
}
class SpecialGreeter extends Greeter2 {
  public howdy() {
    console.log("Howdy, " + this.getName());
  }
}
const g: SpecialGreeter = new SpecialGreeter();
g.greet();    // Ok
// g.getName();  // Not ok, uncomment here

// 'private' is like 'protected', but doesn't allow access to the
// member even from subclasses. But TypeScript does allow cross-instance
// 'private' access.

class PrivateClass {
  private x: number = 0;
}
const testPrivate: PrivateClass = new PrivateClass();
// console.log(testPrivate.x); // uncomment here
//                         ^
// Property 'x' is private and only accessible with class 'PrivateClass'

class A {
  private x: number = 10;
  public sameAs(other: A): boolean {
    return other.x === this.x;
  }
}

// Classes may have 'static' members. These members aren't associated
// with a particular instance of the class. They can be accessed through
// the class constructor object itself. Static members are also inherited

class StaticClass {
  static x: number = 0;
  static printX() {
    console.log(this.x);
  }
}
console.log(StaticClass.x);
StaticClass.printX();

// It's generally not safe or possible to overwrite properties from the
// 'Function' prototype. Because classes are themselves functions that
// can be invoked with 'new', certain 'static' names can't be used. 
// Function properties like 'name', 'length' and 'call' aren't valid to
// define as 'static' members.

// Classes, much like interfaces, can be generic. When a generic class
// is instantiated with 'new', its type parameters are inferred the same
// way as in a function call:

class Box<T> {
  private contents: T;
  constructor(value: T) {
    this.contents = value;
  }
}
const box = new Box<string>("Hello!");  // box: Box<string>

// Type parameters in static members is not legal. Types are always fully
// erased. At runtime, there's only one 'Box.defaultValue' property slot.
// This means that setting 'Box<string>.defaultValue' would also change
// 'Box<number>.defaultValue', and that's not good. The 'static' member
// of a genetic class can never refer to the class's type parameters.

class StaticTypeParameter<T> {
  // static defaultValue: T; // uncomment here
  //                      ^
  // Static members cannot reference class type parameters.
}

class JavaScriptThis {
  private name: string = "MyClass";

  public getName(): string {
    return this.name;
  }
}
const testThis = new JavaScriptThis();
const obj = {
  name: "This is another object",
  getName: testThis.getName
}

console.log(obj.getName());

// Shortly speaking, the value of 'this' inside a function depends on *how
// the function was called*. In this example, because the function was called
// through the 'obj' reference, its value of 'this' was 'obj' rather than
// the class instance.

// If you have a function that will often be called in a way that loses its
// 'this' context, it can make sense to use an arrow function property
// instead of a method definition.

class JavaScriptRightThis {
  private name: string = "MyClass";

  public getName = (): string => {
    return this.name;
  }
}
const testRightThis = new JavaScriptRightThis();
const anotherObj = {
  name: "This is another object",
  getName: testRightThis.getName
}

console.log(anotherObj.getName());

// + The 'this' value is guaranteed to be correct at runtime, even
//   for code not checked with TypeScript;
// + This will use more memory, because each class instance will have
//   its own copy of each function defined this way;
// + You can't use 'super.getName' in a derived class, because there's
//   no entry in the prototype chain to fetch the base class method
//   from.

// In a method or function definition, an initial parameter named 'this'
// has special meaning in TypeScript. These parameters are erased during
// compilation.

function hasThisParameter<T>(this: T[], x: number) {
  console.log(this.length);
}
const testObj = {
  length: 3,
  func: hasThisParameter
}
// testObj.func<string>(["This", "Have", "This"], 3);  // uncomment here
//                                                ^
// Notice there is no 'this' in the final function

class JavaScriptUsingThis {
  private name: string = "MyClass";
  public getName(this: JavaScriptUsingThis): string {
    return this.name;
  }
}
const testUsingThis = new JavaScriptUsingThis();
testUsingThis.getName();

const gn = testUsingThis.getName;
// console.log(gn());  // uncomment here
//             ^^
// The 'this' context of type 'void' is not assignable to method's 'this'
// of type 'JavaScriptUsingThis'

const objUsingThis = {
  name: "This is another object",
  gn: testUsingThis.getName
}
// console.log(objUsingThis.gn()); // uncomment here 

// Using 'this' parameter, when losing 'this' context, TypeScript will warn us.

// In classes, a special type called 'this' refers 'dynamically' to the type of
// the current class.

class BoxUsingThis {
  protected _contents: string = ""
  public contents(value: string): this {
    this._contents = value;
    return this;  // this: this
  }
}

class ClearableBoxUsingThis extends BoxUsingThis {
  clear() {
    this._contents = "";
  }
}
const cb = new ClearableBoxUsingThis();
const anotherCB = cb.contents("Hello"); // anotherCB: ClearableBoxUsingThis

// You can use 'this is Type' in the return position for methods in classes
// and interfaces. When mixed with a type narrowing the type of the target
// object would be narrowed to the specified 'Type'

class BoxThisGuard<T> {
  private value?: T;
  public hasValue(): this is { value: T } {
    return this.value !== undefined;
  }
}

// TypeScript offers special syntax for turning a constructor parameter into
// a class property with the same name and value. These are called *parameter
// properties* and are created by prefixing a constructor argument with one of 
// the visibility modifiers 'public', 'private', 'protected' or 'readonly'

class ParameterProperties {
  constructor(
    public readonly x: number = 1,
    protected y: number,
    private z: number
  ) {
    // This is the constructor code
  }
}
const pp = new ParameterProperties(1, 2, 3);
console.log(pp.x);

class FileSystemObject {
  constructor(
    public path: string,
    private networked: boolean
  ) {}
  isFile(): this is FileRep {
    return this instanceof FileRep;
  }
  isDirectory(): this is Directory {
    return this instanceof Directory;
  }
  isNetworked(): this is Networked & this {
    return this.networked;
  }
}
class FileRep extends FileSystemObject {
  constructor(
    path: string,
    public content: string
  ) {
    super(path, false);
  }
}
class Directory extends FileSystemObject {
  children: FileSystemObject[];
}
interface Networked {
  host: string;
}

// Class expressions are very similar to class declarations. The only real difference
// is that class expressions don't need a name, though we can refer to them via
// whatever identifier they ended up bound to. And the type of class expressions are
// the type of class constructors.

type ClassType = new<T> (value: T) => { content: T; }

const someClass: ClassType = class<T> {
  content: T;
  constructor(value: T) {
    this.content = value;
  }
};

class CheckClass {
  content: string;
  constructor(value: string) {
    this.content = value;
  }
}
type CheckClassType = InstanceType<typeof CheckClass>;

function changeContent(obj: CheckClassType) {
  obj.content = "12";
}

// Classes, methods and fields in TypeScript may be abstract. An abstract
// methods or abstract field is one that hasn't had an implementation provided.
// These members must exist inside an abstract class, which cannot be directly
// instantiated.

// When a class doesn't have any abstract members, it is said to be concrete

abstract class AbstractBase {
  public abstract getName(): string;
  public printName() {
    console.log("Hello, " + this.getName());
  }
}

// We can make a derived class and implement the abstract members:

class NotAbstractDerived extends AbstractBase {
  public getName(): string {
    return "world";
  }
}
const de = new NotAbstractDerived();
de.printName();