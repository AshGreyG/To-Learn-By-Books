// sourceURL: https://zhuanlan.zhihu.com/p/449762679?utm_psn=1887955820836259658
// author: di-xu-guang-50

type GetValueFromPromise<T> = T extends Promise<infer R> ? R : never;

type TestPromiseType = Promise<number[] | string>;

type Res1 = GetValueFromPromise<TestPromiseType>;  // Res1: number[] | string

// --------------------- Pop ---------------------

type Pop<T extends unknown[]>
  = T extends [...infer Rest, infer R]
  ? [...Rest]
  : never;

type TestPopType = [1, 3, 4, "12", 3];

type Res2 = Pop<TestPopType>; // Res2: [1, 3, 4, "12"]

// --------------------- Shift ---------------------

type Shift<T extends unknown[]>
  = T extends [infer R, ...infer Rest]
  ? Rest
  : never;

type TestShiftType = [true, false, "12", 3, 4, 5];

type Res3 = Shift<TestShiftType>; // Res3: [false, "12", 3, 4, 5]

// --------------------- TrimLeft ---------------------

type TrimLeft<S extends string>
  = S extends `${" " | "\n" | "\t"}${infer Rest}`
  ? TrimLeft<Rest>
  : S;

type TestTrimLeftType = "    \n\t   \n  1234";

type Res4 = TrimLeft<TestTrimLeftType>; // Res4: "1234"

// --------------------- TrimRight ---------------------

type TrimRight<S extends string>
  = S extends `${infer Rest}${" " | "\n" | "\t"}`
  ? TrimRight<Rest>
  : S;

type TestTrimRightType = "12ui    \n\t\n   ";

type Res5 = TrimRight<TestTrimRightType>; // Res5: "12ui"

// --------------------- Trim ---------------------

type Trim<S extends string> = TrimLeft<TrimRight<S>>;

type TestTrimType = "\n\t    12po  \n\t   \n";

type Res6 = Trim<TestTrimType>; // Res6: "12po"

// --------------------- Replace ---------------------

type Replace<
  S extends string,
  O extends string,
  R extends string
> = S extends `${infer Left}${O}${infer Right}`
  ? `${Left}${R}${Replace<Right, O, R>}`
  : S;

type TestReplaceType = "This is is is sentence has many is";

type Res7 = Replace<TestReplaceType, "is", "no">;
// Res7: "Thno no no no sentence has many no"

// --------------------- GetParamsType ---------------------

type GetParamsType<F extends Function>
  = F extends (...params: infer Params) => any
  ? Params
  : never;

type TestGetParamsType = (a: number, b: string[]) => boolean;

type Res8 = GetParamsType<TestGetParamsType>; // Res8: [a: number, b: string[]]

// --------------------- GetReturnType ---------------------

type GetReturnType<F extends Function>
  = F extends (...params: any) => infer Return
  ? Return
  : never;

type TestGetReturnType = (a: number) => [string, boolean];

type Res9 = GetReturnType<TestGetReturnType>; // Res9: [string, boolean]