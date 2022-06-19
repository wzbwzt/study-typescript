//任意值
//任意值（Any）用来表示允许赋值为任意类型。
//
//什么是任意值类型§
//如果是一个普通类型，在赋值过程中改变类型是不被允许的：

let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.

//但如果是 any 类型，则允许被赋值为任意类型。
let myFavoriteNumber2: any = 'seven';
myFavoriteNumber2 = 7;

//任意值的属性和方法§
//在任意值上访问任何属性都是允许的：
let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);

//也允许调用任何方法：
let anyThing2: any = 'Tom';
anyThing.setName('Jerry');
anyThing.setName('Jerry').sayHello();
anyThing.myName.setFirstName('Cat');

//可以认为，声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。

//未声明类型的变量§
//变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：
let something;
something = 'seven';
something = 7;

something.setName('Tom');

/**
 * 等价于

let something: any;
something = 'seven';
something = 7;

something.setName('Tom');

 */

//类型推论
//如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查
let myFavoriteNumber2 = 'seven';
myFavoriteNumber2 = 7;
// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.

/**
 * 事实上，它等价于：
let myFavoriteNumber2: string = 'seven';
myFavoriteNumber2 = 7;
// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
 */
