/**
 * @flow
 */

function truthy(a: ?string, b: ?string): boolean {
  // prettier-ignore
  return (
    a !== null &&
    a !== undefined &&
    b !== null &&
    b !== undefined
  );
}

// $FlowExpectedError[incompatible-return]
function concat(a: ?string, b: ?string): string {
  if (truthy(a, b)) {
    // $FlowExpectedError[unsafe-addition]
    return a + b;
  }
}

// Type guard functions

// Flow lets you define functions whose return expression encodes some type
// predicate over a parameter `param`. This `predicate` is annotated in place
// of a return type annotation like `param is PredicateType`. It declares that
// if the function returns `true` then `param` is of type `PredicateType`.

type A = {
  type: "A";
  data: string;
};
type B = {
  type: "B";
  data: number;
};
type AorB = A | B;

function isA(value: AorB): value is A {
  return value.type === "A";
}

// Functions that have a declared type guard can be used to refine values in
// conditionals. In the example above, we can use `isA` to refine a variable
// of type `AorB` to just `A`

function testTypeGuardFunctions(value: AorB) {
  if (isA(value)) {
    const a = value;  // type: A
    const stringData = value.data;  // type: string
  }
}

// One-side type guards, where we annotate as `implies param is PredicateType`