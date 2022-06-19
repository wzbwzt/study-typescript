//联合类型（Union Types）表示取值可以为多种类型中的一种。
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

//当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：

//length 不是 string 和 number 的共有属性，所以会报错
function getLength(something: string | number): number {
    return something.length;
}
// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.

//访问 string 和 number 的共有属性是没问题的
function getString(something: string | number): string {
    return something.toString();
}

//联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：

//第二行的 myFavoriteNumber 被推断成了 string，访问它的 length 属性不会报错。
//而第四行的 myFavoriteNumber 被推断成了 number，访问它的 length 属性时就报错了。
let myFavoriteNumber2: string | number;
myFavoriteNumber2 = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber2 = 7;
console.log(myFavoriteNumber2.length); // 编译时报错
// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
