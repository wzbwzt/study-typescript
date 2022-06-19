//类与接口

/**
 * 类实现接口
 * 实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，
 * 有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），
 * 用 implements 关键字来实现。这个特性大大提高了面向对象的灵活性。
 * 
 * 一个类可以实现多个接口：
 * 
 * 举例来说，门是一个类，防盗门是门的子类。如果防盗门有一个报警器的功能，
 * 我们可以简单的给防盗门添加一个报警方法。这时候如果有另一个类，车，也有报警器的功能，
 * 就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现它： 

*
 */
interface Alarm {
	alert(): void;
}

class Door {
}

class SecurityDoor extends Door implements Alarm, Light {
	alert() {
		console.log('SecurityDoor alert');
	}
	lightOn() {
		console.log('Car light on');
	}
	lightOff() {
		console.log('Car light off');
	}
}

class Car implements Alarm {
	alert() {
		console.log('Car alert');
	}
}
interface Light {
	lightOn(): void;
	lightOff(): void;
}

/**
 * 接口继承接口
 * 
 * 这很好理解，LightableAlarm 继承了 Alarm，除了拥有 alert 方法之外，还拥有两个新方法 lightOn 和 lightOff
 */
interface Alarm {
	alert(): void;
}

interface LightableAlarm extends Alarm {
	lightOn(): void;
	lightOff(): void;
}

/**
 * 接口继承类
 * 
 * 常见的面向对象语言中，接口是不能继承类的，但是在 TypeScript 中却是可以的：
 * 为什么 TypeScript 会支持接口继承类呢？
 * 实际上，当我们在声明 class Point 时，除了会创建一个名为 Point 的类之外，同时也创建了一个名为 Point 的类型（实例的类型）。
 * 既可以将 Point 当做一个类来用（使用 new Point 创建它的实例）
 * 当做一个类型来用（使用 : Point 表示参数的类型）
 * 
 * Point3d 继承的实际上是类 Point 的实例的类型。
 * 换句话说，可以理解为定义了一个接口 Point3d 继承另一个接口 PointInstanceType。
 * 所以「接口继承类」和「接口继承接口」没有什么本质的区别。

 * 值得注意的是，PointInstanceType 相比于 Point，缺少了 constructor 方法，
 * 这是因为声明 Point 类时创建的 Point 类型是不包含构造函数的。另外，
 * 除了构造函数是不包含的，静态属性或静态方法也是不包含的（实例的类型当然不应该包括构造函数、静态属性或静态方法）。


 */
interface PointInstanceType {
	x: number;
	y: number;
}
class Point {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

interface Point3d extends Point {
	z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 };