//原始数据类型
//JavaScript 的类型分为两种：原始数据类型（Primitive data types）和对象类型（Object types）。
//
//原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol 和 ES10 中的新类型 BigInt。
//
//布尔值§
//布尔值是最基础的数据类型，在 TypeScript 中，使用 boolean 定义布尔值类型：

let isDone: boolean = false;

// 编译通过
// 后面约定，未强调编译错误的代码片段，默认为编译通过

/**
 * 注意，使用构造函数 Boolean 创造的对象不是布尔值：
let createdByNewBoolean: boolean = new Boolean(1);

// Type 'Boolean' is not assignable to type 'boolean'.
//   'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.

//事实上 new Boolean() 返回的是一个 Boolean 对象：

let createdByNewBoolean: Boolean = new Boolean(1);
//直接调用 Boolean 也可以返回一个 boolean 类型：

let createdByBoolean: boolean = Boolean(1);
//在 TypeScript 中，boolean 是 JavaScript 中的基本类型，而 Boolean 是 JavaScript 中的构造函数。其他基本类型（除了 null 和 undefined）一样，不再赘述。

 */

// //数值§
//使用 number 定义数值类型：

let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;

/**
编译结果：

var decLiteral = 6;
var hexLiteral = 0xf00d;
// ES6 中的二进制表示法
var binaryLiteral = 10;
// ES6 中的八进制表示法
var octalLiteral = 484;
var notANumber = NaN;
var infinityNumber = Infinity;

其中 0b1010 和 0o744 是 ES6 中的二进制和八进制表示法，它们会被编译为十进制数字。

 */

////字符串§
//使用 string 定义字符串类型：

let myName: string = "Tom";
let myAge: number = 25;

// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;

/**
编译结果：

var myName = 'Tom';
var myAge = 25;
// 模板字符串
var sentence = "Hello, my name is " + myName + ".
I'll be " + (myAge + 1) + " years old next month.";

其中` 用来定义 ES6 中的模板字符串，${expr} 用来在模板字符串中嵌入表达式。

 */

////空值§
//JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数：

function alertName(): void {
  alert("My name is Tom");
}

//声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null（只在--strictNullChecks 未指定时）：
let unusable: void = undefined;

////Null 和 Undefined§
//在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型：

let u: undefined = undefined;
let n: null = null;
//与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：

/**
 * 这样不会报错
let num: number = undefined;
 * 这样也不会报错
let u: undefined;
let num: number = u;

//而 void 类型的变量不能赋值给 number 类型的变量：
let u: void;
let num: number = u;
// Type 'void' is not assignable to type 'number'.

 */
