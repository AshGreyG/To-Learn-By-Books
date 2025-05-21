// The 'keyof' operator takes an object type and produces a string or
// numeric literal union of its keys.

type Point = {
  x: number;
  y: number;
};
type P = keyof Point; // P: "x" | "y"

// If the type has a 'string' or 'number' index signature, 'keyof' will
// return those types instead:

type SelfDefinedArrayLike = {
  [n: number]: unknown;
};
type A = keyof SelfDefinedArrayLike;  // A: number

type SelfDefinedMapLike = {
  [k: string]: boolean;
}
type M = keyof SelfDefinedMapLike;    // M: string | number

// This is because JavaScript object keys are always coerced to a
// string, so obj[0] is always the same as obj["0"]

let s = "Hello";
let n: typeof s;  // n: string

type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>; // K: boolean

function testTypeofFunction() {
  return { x: 10, y: 10 };
}

type F = ReturnType<typeof testTypeofFunction>
// type F = {
//   x: number;
//   y: number;
// }

type Person = {
  age: number;
  name: string;
  alive: boolean;
}
type I1 = Person["age"];              // I1: number
type I2 = Person["age" | "name"];     // I2: string | number
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];        // I3: string | boolean

// Another example of indexing with an arbitrary type is using 'number'
// to get the type of an array's elements. We can combine this with
// 'typeof' to conveniently 

const testForIndexed = [
  { name: "Alice", age: 15 },
  { name: "Bob",   age: 23 },
  { name: "Eve",   age: 38 }
];
type TestPerson = typeof testForIndexed[number];
// type TestPerson = {
//   name: string;
//   age: number;
// }

type TestAge = typeof testForIndexed[number]["age"];  // TestAge: number

interface Animal {
  live: () => void;
}
interface Dog extends Animal {
  woof: () => void;
}
type E1 
  = Dog extends Animal 
  ? number 
  : string;   // E1: number
type E2 
  = RegExp extends Animal 
  ? number 
  : string;   // E2: string

interface IdLabel {
  id: number;
}
interface NameLabel {
  name: string;
}

type NameOrId<T extends number | string> 
  = T extends number
  ? IdLabel
  : NameLabel;
declare function createLabel<T extends number | string>(idOrName: T): NameOrId<T>;

type MessageOf<T extends { message: unknown }> = T["message"];
interface Email {
  message: string;
}
type EmailMessageContents = MessageOf<Email>; // EmailMessageContents: string

type SafeMessageOf<T> 
  = T extends { message: unknown }
  ? T["message"]
  : never;

type Flatten<T>
  = T extends unknown[]
  ? T[number]
  : T;

type NArray = Flatten<number[]>; // NArray: number
type NType  = Flatten<number>;   // NType:  number

// Conditional types provide us with a way to infer from types we compare
// against in the true branch using the 'infer' keyword. We could have 
// inferred the element type in 'InferFlatten' instead of fetching it
// out manually with an indexed access type.

type InferFlatten<T>
  = T extends Array<infer Item>
  ? Item
  : T;

type GetReturnType<T>
  = T extends (...args: never[]) => infer Return
  ? Return
  : never;

type NumR = GetReturnType<() => number>;          // NumR: number
type StrR = GetReturnType<(x: string) => string>; // StrR: string

// When inferring from a type with multiple call signatures (such as the
// type of an overloaded function), inferences are made from the *last*
// signature.

declare function stringOrNumber(x: string): number;
declare function stringOrNumber(x: number): string;
declare function stringOrNumber(x: string | number): string | number;

type Overloaded = ReturnType<typeof stringOrNumber>;  // Overloaded: string | number

type ToArray<T>
  = T extends any
  ? T[]
  : never;

type StrArrOrNumArr = ToArray<string | number>; // StrArrOrNumber: string[] | number[]

// If we plug a union type into 'ToArray', then the conditional type
// will be applied to each member of that union. What happens here is
// that 'ToArray' distributes on 'string | number', and maps over each
// member type of the union, to what is effectively.

type MapStrOrNumToArray = ToArray<string> | ToArray<number>;

// Which leaves us with string[] | number[]

// Typically, distributivity is the desired behavior. To avoid that behavior, you
// can surround each side of the 'extends' keyword with square brackets

type ToArrayNonDist<T>
  = [T] extends [any]
  ? T[]
  : never;

// A mapped type is a generic type which uses a union of 'PropertyKey's
// to iterate through keys to create a type:

type OptionsFlags<T> = {
  [Property in keyof T]: boolean;
}

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
}

type FeatureOptions = OptionsFlags<Features>;
// type FeatureOptions = {
//   darkMode: boolean;
//   newUserProfile: boolean;
// }

type CreateMutable<T> = {
  -readonly [Property in keyof T]: T[Property];
}

type CreateImmutable<T> = {
  +readonly [Property in keyof T]: T[Property];
}

// There are two additional modifiers which can be applied during mapping:
// 'readonly' and '?' which affect mutability and optionality respectively.
// You can remove or add these modifiers by prefixing with '-' or '+'. If
// there is no prefix, then '+' is assumed.

type LockedAccount = {
  readonly id: string;
  readonly name: string;
}

type MapFromLockedAccount = CreateMutable<LockedAccount>;
// type MapFromLockedAccount = {
//   id: string;
//   name: string;
// }

type Concrete<T> = {
  [Property in keyof T]-?: T[Property];
}

type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
}

type User = Concrete<MaybeUser>;
// type User = {
//   id: string;
//   name: string;
//   age: number;
// }

// In TypeScript 4.1 and onwards, you can re-map keys in mapped types
// with an 'as' clause in a mapped type.

type Getters<T> = {
  [Property in keyof T as `get${Capitalize<string & Property>}`]: () => T[Property];
}

// Literal string type is the subtype of 'string', so 'string & property' can
// force the type of Property to 'string'.

type IsSubtype<T, U>
  = T extends U
  ? true
  : false;

type Is1 = IsSubtype<"Hello", string>;  // Is1: true
type Is2 = IsSubtype<string, "Hello">;  // Is2: false

interface PersonType {
  name: string;
  age: number;
  location: string;
}

type GetPerson = Getters<PersonType>;
// type GetPerson = {
//   getName: () => string;
//   getAge: () => number;
//   getLocation: () => string;
// }

type RemoveKindField<T> = {
  [Property in keyof T as Exclude<Property, "kind">]: T[Property];
}

interface Circle {
  kind: "circle";
  radius: number;
}

type WithoutKindCircle = RemoveKindField<Circle>;
// type WithoutKindCircle = {
//   radius: number;
// }

type ExtractPII<T> = {
  [Property in keyof T]: T[Property] extends { pii: true } ? true : false;
}

type DBFieldsPIITrue = {
  id: {
    format: "incrementing"
  };
  name: {
    type: string;
    pii: true;
  }
}
type DB1 = ExtractPII<DBFieldsPIITrue>;
// type DB1 = {
//   id: false;
//   name: true;
// }

type EmailLocaleIDs =
  | "welcome_email"
  | "email_heading";

type FooterLocaleIds =
  | "footer_title"
  | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIds}_id`;
// type AllLocaleIDs =
//   | "welcome_email_id"
//   | "email_heading_id"
//   | "footer_title_id"
//   | "footer_sendoff_id";

type PropEventSource1<T extends object> = {
  on: (
    eventname: `${string & keyof T}Changed`,
    callback: (newValue: any) => void
  ) => void;
}

declare function makeWatchedObject1<T extends object>(obj: T): T & PropEventSource1<T>;

// 'T' and 'PropEventSource<T>' are both object types, so if 'T' & 'PropEventSource1<T>'
// is denoted by 'R', then 'R extends T' and 'R extends PropEventSource1<T>' are
// both true

interface PersonNameAndAge {
  firstName: string;
  lastName: string;
  age: number;
}

let rawPerson: PersonNameAndAge = {
  firstName: "Saorise",
  lastName: "Ronan",
  age: 26
};
const person1 = makeWatchedObject1(rawPerson);

type Is3 = IsSubtype<typeof person1, PersonNameAndAge>;                  // Is3: true
type Is4 = IsSubtype<typeof person1, PropEventSource1<PersonNameAndAge>>; // Is4: true

person1.on("ageChanged", (newAge) => {
  console.log(`New age has been changed to ${newAge}`); // newAge is any
});

type PropEventSource2<T extends object> = {
  on: <K extends (string & keyof T)>(
    eventname: `${K}Changed`,
    callback: (newValue: T[K]) => void
  ) => void;
}

declare function makeWatchedObject2<T extends object>(obj: T): T & PropEventSource2<T>;

const person2 = makeWatchedObject2(rawPerson);

person2.on("ageChanged", (newAge) => {
  console.log(`New age has been changed to ${newAge}`); // newAge is number
});

interface TestFilterType {
  
}