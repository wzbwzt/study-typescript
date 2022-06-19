//什么是声明语句§
/**
 *
假如我们想使用第三方库 jQuery，一种常见的方式是在 html 中通过 < script > 标签引入 jQuery，然后就可以使用全局变量 $ 或 jQuery 了。

我们通常这样获取一个 id 是 foo 的元素：

$('#foo');
// or
jQuery('#foo');
但是在 ts 中，编译器并不知道 $ 或 jQuery 是什么东西1：

jQuery('#foo');
// ERROR: Cannot find name 'jQuery'.

这时，我们需要使用 declare var 来定义它的类型2：

	declare var jQuery: (selector: string) => any;

jQuery('#foo');
上例中，declare var 并没有真的定义一个变量，只是定义了全局变量 jQuery 的类型，仅仅会用于编译时的检查，在编译结果中会被删除。它编译结果是：

	jQuery('#foo');
除了 declare var 之外，还有其他很多种声明语句
	declare var jQuery: (selector: string) => any;

jQuery('#foo');

 */



//什么是声明文件§

/**
 * 通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件 
 * 声明文件必需以 .d.ts 为后缀。

/path/to/project
├── src
|  ├── index.ts
|  └── jQuery.d.ts
└── tsconfig.json
 */


/**
 * 第三方声明文件§
当然，jQuery 的声明文件不需要我们定义了，社区已经帮我们定义好了：jQuery in DefinitelyTyped。

我们可以直接下载下来使用，但是更推荐的是使用 @types 统一管理第三方库的声明文件。

@types 的使用方式很简单，直接用 npm 安装对应的声明模块即可，以 jQuery 举例：

npm install @types/jquery --save-dev

 */

////////////////////////////////////////////////////////////////////////////////
//全局变量的声明文件主要有以下几种语法：
//
//- declare var 声明全局变量
//- declare function 声明全局方法
//- declare class 声明全局类
//- declare enum 声明全局枚举类型
//- declare namespace 声明（含有子属性的）全局对象
//- interface 和 type 声明全局类型


//1.declare var
//定义一个全局变量的类型。与其类似的，还有 declare let 和 declare const，使用 let 与使用 var 没有什么区别：

// src/jQuery.d.ts
declare let jQuery: (selector: string) => any;

// src/index.ts
jQuery('#foo');
// 使用 declare let 定义的 jQuery 类型，允许修改这个全局变量
jQuery = function (selector) {
	return document.querySelector(selector);
};

//使用 const 定义时，表示此时的全局变量是一个常量，不允许再去修改它的值了
//(全局变量都是禁止修改的常量，所以大部分情况都应该使用 const 而不是 var 或 let)
// src/jQuery.d.ts
declare const jQuery2: (selector: string) => any;

jQuery2('#foo');
// 使用 declare const 定义的 jQuery 类型，禁止修改这个全局变量
//jQuery2 = function (selector) {
// 	return document.querySelector(selector);
//};
// ERROR: Cannot assign to 'jQuery' because it is a constant or a read-only property.


//2.declare function§
//定义全局函数的类型。jQuery 其实就是一个函数
// src/jQuery.d.ts
declare function jQuery3(selector: string): any;
// src/index.ts
jQuery3('#foo');

//在函数类型的声明语句中，函数重载也是支持的
// src/jQuery.d.ts
declare function jQuery5(selector: string): any;
declare function jQuery5(domReadyCallback: () => any): any;
// src/index.ts

jQuery('#foo');
jQuery5(function () {
	alert('Dom Ready!');
});

//3.declare class§
//当全局变量是一个类的时候，我们用 declare class 来定义它的类型
// src/Animal.d.ts
declare class Animal {
	name: string;
	constructor(name: string);
	sayHi(): string;
}
// src/index.ts
let cat = new Animal('Tom');
/**
 * 同样的，declare class 语句也只能用来定义类型，不能用来定义具体的实现，比如定义 sayHi 方法的具体实现则会报错：
src/Animal.d.ts
declare class Animal {
    name: string;
    constructor(name: string);
    sayHi() {
	return `My name is ${this.name}`;
    };
    // ERROR: An implementation cannot be declared in ambient contexts.
}
 */

//4.declare enum§
//定义的枚举类型也称作外部枚举（Ambient Enums）

// src/Directions.d.ts
declare enum Directions {
	Up,
	Down,
	Left,
	Right
}
// src/index.ts
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

/**
 * Directions.d.ts 仅仅会用于编译时的检查，声明文件里的内容在编译结果中会被删除。它编译结果是：
var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
 */


//5.declare namespace§
//namespace 是 ts 早期时为了解决模块化而创造的关键字，中文称为命名空间。
//由于历史遗留原因，在早期还没有 ES6 的时候，ts 提供了一种模块化方案，使用 module 关键字表示内部模块。
//但由于后来 ES6 也使用了 module 关键字，ts 为了兼容 ES6，使用 namespace 替代了自己的 module，更名为命名空间。
//随着 ES6 的广泛应用，现在已经不建议再使用 ts 中的 namespace，而推荐使用 ES6 的模块化方案了，故我们不再需要学习 namespace 的使用了。
//namespace 被淘汰了，但是在声明文件中，declare namespace 还是比较常用的，它用来表示全局变量是一个对象，包含很多子属性。


//比如 jQuery 是一个全局变量，它是一个对象，提供了一个 jQuery.ajax 方法可以调用，
//那么我们就应该使用 declare namespace jQuery 来声明这个拥有多个子属性的全局变量。
// src/jQuery.d.ts
declare namespace jQuery6 {
	function ajax(url: string, settings?: any): void;
}
// src/index.ts
jQuery6.ajax('/api/get_something');

//注意，在 declare namespace 内部，我们直接使用 function ajax 来声明函数，
//而不是使用 declare function ajax。类似的，也可以使用 const, class, enum 等语句9：
// src/jQuery.d.ts
declare namespace jQuery7 {
	function ajax(url: string, settings?: any): void;
	const version: number;
	class Event {
		blur(eventType: EventType): void
	}
	enum EventType {
		CustomClick
	}
}
// src/index.ts
jQuery7.ajax('/api/get_something');
console.log(jQuery7.version);
const e = new jQuery7.Event();
e.blur(jQuery7.EventType.CustomClick);

//嵌套的命名空间§
//如果对象拥有深层的层级，则需要用嵌套的 namespace 来声明深层的属性的类型10：
// src/jQuery.d.ts
declare namespace jQuery8 {
	function ajax(url: string, settings?: any): void;
	namespace fn {
		function extend(object: any): void;
	}
}
// src/index.ts
jQuery8.ajax('/api/get_something');
jQuery8.fn.extend({
	check: function () {
		return this.each(function () {
			this.checked = true;
		});
	}
});
//假如 jQuery 下仅有 fn 这一个属性（没有 ajax 等其他属性或方法），则可以不需要嵌套 namespace11：

// src/jQuery.d.ts
declare namespace jQuery9.fn {
	function extend(object: any): void;
}
// src/index.ts

jQuery9.fn.extend({
	check: function () {
		return this.each(function () {
			this.checked = true;
		});
	}
});


//6.interface 和 type§
//除了全局变量之外，可能有一些类型我们也希望能暴露出来。在类型声明文件中，
//我们可以直接使用 interface 或 type 来声明一个全局的接口或类型：

// src/jQuery.d.ts
interface AjaxSettings {
	method?: 'GET' | 'POST'
	data?: any;
}
declare namespace jQuery10 {
	function ajax(url: string, settings?: AjaxSettings): void;
}
//这样的话，在其他文件中也可以使用这个接口或类型了：

// src/index.ts
let settings: AjaxSettings = {
	method: 'POST',
	data: {
		name: 'foo'
	}
};
jQuery10.ajax('/api/post_something', settings);
//type 与 interface 类似，不再赘述


/**
 * 防止命名冲突§
暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。故最好将他们放到 namespace 下：

// src/jQuery.d.ts
declare namespace jQuery {
    interface AjaxSettings {
	method?: 'GET' | 'POST'
	data?: any;
    }
    function ajax(url: string, settings?: AjaxSettings): void;
}
注意，在使用这个 interface 的时候，也应该加上 jQuery 前缀：

// src/index.ts
let settings: jQuery.AjaxSettings = {
    method: 'POST',
    data: {
	name: 'foo'
    }
};
jQuery.ajax('/api/post_something', settings);
 */

//声明合并§
//假如 jQuery 既是一个函数，可以直接被调用 jQuery('#foo')，又是一个对象，
//拥有子属性 jQuery.ajax()（事实确实如此），那么我们可以组合多个声明语句，它们会不冲突的合并起来14：

// src/jQuery.d.ts
declare function jQuery12(selector: string): any;
declare namespace jQuery12 {
	function ajax(url: string, settings?: any): void;
}
// src/index.ts

jQuery12('#foo');
jQuery12.ajax('/api/get_something');

