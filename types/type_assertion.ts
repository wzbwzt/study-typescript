//类型断言
//类型断言（Type Assertion）可以用来手动指定一个值的类型。
//语法§: 值 as 类型(建议使用)(在 tsx 语法（React 的 jsx 语法的 ts 版）中必须使用)
//或 < 类型 > 值(在 tsx 中表示的是一个 ReactNode，在 ts 中除了表示类型断言之外，也可能是表示一个泛型。)

//类型断言的用途

//1.将一个联合类型断言为其中一个类型§
interface Cat {
	name: string;
	run(): void;
}
interface Fish {
	name: string;
	swim(): void;
}

function isFish(animal: Cat | Fish) {
	if (typeof (animal as Fish).swim === 'function') {
		return true;
	}
	return false;
}
/**
 * 需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误：
 */
function swim(animal: Cat | Fish) {
	(animal as Fish).swim();
}

const tom5: Cat = {
	name: 'Tom',
	run() { console.log('run') }
};
swim(tom5);
//编译时不会报错，但在运行时会报错
//原因是 (animal as Fish).swim() 这段代码隐藏了 animal 可能为 Cat 的情况，将 animal 
//直接断言为 Fish 了，而 TypeScript 编译器信任了我们的断言，故在调用 swim() 时没有编译错误
// Uncaught TypeError: animal.swim is not a function`

//2.将一个父类断言为更加具体的子类
//当类之间有继承关系时，类型断言也是很常见的
class ApiError extends Error {
	code: number = 0;
}
class HttpError extends Error {
	statusCode: number = 200;
}

function isApiError(error: Error) {
	if (typeof (error as ApiError).code === 'number') {
		return true;
	}
	return false;
}
//在这个例子中有一个更合适的方式来判断是不是 ApiError，那就是使用 instanceof：
//因为 ApiError 是一个 JavaScript 的类，能够通过 instanceof 来判断 error 是否是它的实例。
//if (error instanceof ApiError) {
//       return true;
//   }

/**
 * 但是有的情况下 ApiError 和 HttpError 不是一个真正的类，而只是一个 TypeScript 的接口
 * （interface），接口是一个类型，不是一个真正的值，它在编译结果中会被删除，当然就无法使用 instanceof 来做运行时判断了

interface ApiError extends Error {
    code: number;
}
interface HttpError extends Error {
    statusCode: number;
}

function isApiError(error: Error) {
    if (error instanceof ApiError) {
	return true;
    }
    return false;
}

// index.ts:9:26 - error TS2693: 'ApiError' only refers to a type, but is being used as a value here.
 */

interface ApiError extends Error {
	code: number;
}
interface HttpError extends Error {
	statusCode: number;
}

function isApiError2(error: Error) {
	if (typeof (error as ApiError).code === 'number') {
		return true;
	}
	return false;
}

//3.将任何一个类型断言为 any
//它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 as any。
(window as any).foo = 1;

/**
window.foo = 1;

// index.ts:1:8 - error TS2339: Property 'foo' does not exist on type 'Window & typeof globalThis'.
 */

//4.将 any 断言为一个具体的类型
//在日常的开发中，我们不可避免的需要处理 any 类型的变量，它们可能是由于第三方库未能定义好自己的类型，
//也有可能是历史遗留的或其他人编写的烂代码，还可能是受到 TypeScript 类型系统的限制而无法精确定义类型的场景。
//遇到 any 类型的变量时，我们可以选择无视它，任由它滋生更多的 any。
//我们也可以选择改进它，通过类型断言及时的把 any 断言为精确的类型，亡羊补牢，使我们的代码向着高可维护性的目标发展。
function getCacheData(key: string): any {
	return (window as any).cache[key];
}

interface Cat {
	name: string;
	run(): void;
}

const tom6 = getCacheData('tom') as Cat;
tom6.run();

//5.类型断言的限制§
//是不是任何一个类型都可以被断言为任何另一个类型呢？
//答案是否定的——并不是任何一个类型都可以被断言为任何另一个类型。
//具体来说，若 A 兼容 B，那么 A 能够被断言为 B，B 也能被断言为 A。


//通过一个简化的例子，来理解类型断言的限制： 
interface Animal {
	name: string;
}
interface Cat {
	name: string;
	run(): void;
}

let tom7: Cat = {
	name: 'Tom',
	run: () => { console.log('run') }
};
let animal: Animal = tom7;

/**
 * TypeScript 是结构类型系统，类型之间的对比只会比较它们最终的结构，而会忽略它们定义时的关系。
 * 上面的例子中，Cat 包含了 Animal 中的所有属性，除此之外，它还有一个额外的方法 run。
 * TypeScript 并不关心 Cat 和 Animal 之间定义时是什么关系，而只会看它们最终的结构有什么关系——
 * 所以它与 Cat extends Animal 是等价的：
 * 
 */

//当 Animal 兼容 Cat 时，它们就可以互相进行类型断言了：
interface Animal {
	name: string;
}
interface Cat {
	name: string;
	run(): void;
}

function testAnimal(animal: Animal) {
	return (animal as Cat);
}
function testCat(cat: Cat) {
	return (cat as Animal);
}

//总之，若 A 兼容 B，那么 A 能够被断言为 B，B 也能被断言为 A。
//同理，若 B 兼容 A，那么 A 能够被断言为 B，B 也能被断言为 A。



//6.双重断言§
//既然：
//任何类型都可以被断言为 any
//any 可以被断言为任何类型
//那么我们是不是可以使用双重断言 as any as Foo 来将任何一个类型断言为任何另一个类型呢？
interface Cat {
	run(): void;
}
interface Fish {
	swim(): void;
}

function testCat2(cat: Cat) {
	return (cat as any as Fish);
}
//若你使用了这种双重断言，那么十有八九是非常错误的，它很可能会导致运行时错误。
//除非迫不得已，千万别用双重断言。



//类型断言 vs 类型转换
//类型断言只会影响 TypeScript 编译时的类型，类型断言语句在编译结果中会被删除：
function toBoolean2(something: any): boolean {
	return something as boolean;
}

toBoolean2(1);
// 返回值为 1
/**
 * 在上面的例子中，将 something 断言为 boolean 虽然可以通过编译，但是并没有什么用，代码在编译后会变成：

function toBoolean(something) {
	return something;
}

toBoolean(1);
// 返回值为 1
所以类型断言不是类型转换，它不会真的影响到变量的类型。

若要进行类型转换，需要直接调用类型转换的方法：

function toBoolean(something: any): boolean {
	return Boolean(something);
}

toBoolean(1);
// 返回值为 true
 */


//类型断言 vs 类型声明§
interface Cat {
	name: string;
	run(): void;
}

//类型断言
const tom = getCacheData('tom') as Cat;
tom.run();

//类型声明
const tom2: Cat = getCacheData('tom');
tom.run();

//类型断言 vs 泛型

//泛型处理
//通过给 getCacheData 函数添加了一个泛型<T>，我们可以更加规范的实现对 getCacheData 
//返回值的约束，这也同时去除掉了代码中的 any，是最优的一个解决方案。
function getCacheData3<T>(key: string): T {
	return (window as any).cache[key];
}

interface Cat {
	name: string;
	run(): void;
}

const tom3 = getCacheData3<Cat>('tom');
tom.run();