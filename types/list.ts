//数组类型
//在 TypeScript 中，数组类型有多种定义方式，比较灵活。


//「类型 + 方括号」表示法§
let fibonacci: number[] = [1, 1, 2, 3, 5];
/**
 * 数组的项中不允许出现其他的类型：

 let fibonacci: number[] = [1, '1', 2, 3, 5];

// Type 'string' is not assignable to type 'number'.

 * 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制：

let fibonacci: number[] = [1, 1, 2, 3, 5];
fibonacci.push('8');

// Argument of type '"8"' is not assignable to parameter of type 'number'.
上例中，push 方法只允许传入 number 类型的参数，但是却传了一个 "8" 类型的参数，所以报错了。

 */


//数组泛型
//使用数组泛型（Array Generic） Array < elemType > 来表示数组：

let fibonacci2: Array<number> = [1, 1, 2, 3, 5];


//用接口表示数组
//NumberArray 表示：只要索引的类型是数字时，那么值的类型必须是数字。
//一般不会这么做，因为这种方式比前两种方式复杂多了。
//不过有一种情况例外，那就是它常用来表示类数组。
interface NumberArray {
	[index: number]: number;
}
let fibonacci3: NumberArray = [1, 1, 2, 3, 5];


//类数组§
//类数组（Array - like Object）不是数组类型，比如 arguments：
//除了约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有 length 和 callee 两个属性。
function sum() {
	let args: {
		[index: number]: number;
		length: number;
		callee: Function;
	} = arguments;
}

/**
function sum() {
	let args: number[] = arguments;
}
// Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
//arguments 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口：

 * 事实上常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等：
function sum() {
    let args: IArguments = arguments;
}
IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}
 */

//any 在数组中的应用
let list: any[] = ['xcatliu', 25, { website: 'http://baidu.com' }];
