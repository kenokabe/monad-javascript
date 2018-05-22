

# Monads in JavaScript

Here is my crazy attempt to contribute to monads-beginners that you probably never have found anywhere else.

## In functional programming, a [monad][1] is a kind of building blocks of programming that behaves pretty well

(IMO, introducing "Monad laws" without any context and rationalization is merely a useless classification and hazard to understand the concept. No worry, I do the job later in this article.)

In most cases, we have many kinds of building blocks of programming such as object, function, list etc..

Although having varieties of blocks of programming seems law of nature and inevitable for flexible programming for practical purposes, the fact is having varieties of blocks is one of the major sources of programming environmental pollution.

Building blocks by using varieties of blocks is a complicated task. A programmer is required to select a block very wisely among varieties of blocks in every situation and in a long span, he will fail.

So, selecting varieties of blocks depends on situations is discouraged, instead, it is a good discipline always to use a certain pre-selected block that is universally standardized.

In fact, this wisdom is common in PC-world in these days.

>[USB, short for Universal Serial Bus, is an industry standard that was developed to define cables, connectors and protocols for connection, communication, and power supply between personal computers and their peripheral devices.][2]

Obtaining a well-designed universally standardized building block eliminate many problems.

1. [Object][3] is (used to be) the one.
2. [Function][4] is the one.
3. [Monad][1] is the one.
4. Specifications
5. Implementation
6. Verification

# 1.OOP

>[Object-oriented programming (OOP) is a programming paradigm based on the concept of "objects", which may contain data, in the form of fields, often known as attributes; and code, in the form of procedures, often known as methods. A feature of objects is that an object's procedures can access and often modify the data fields of the object with which they are associated (objects have a notion of "this" or "self"). In OOP, computer programs are designed by making them out of objects that interact with one another. There is significant diversity of OOP languages, but the most popular ones are class-based, meaning that objects are instances of classes, which typically also determine their type.][3]

Selecting object as a universally standardized building block, a programmer prepares a base class that contains member values and functions, and in order to obtain variations of the blocks, [inheritance][5] is used.

OOP idea is often explained by using real-world physical objects, and the paradigm itself is weak on mathematical abstraction.

For instance, functions(or methods) are subordinate to objects, and functions are not required to be a [first-class object][6], and this is as a matter of course since the paradigm originally selected object as their well-designed universally standardized building block.

The perspective of where functions are subordinate entities to objects as the standardized building block and both roles are strictly different comes from an engineering sense in the physical world. not the mathematical abstraction where programming actually resides.

The fundamental problem of OOP is simply that object turns out to be not the well-designed universally standardized building block. Functional programming or monad are the better alternatives with the strong mathematical background.

# 2.Functional Programming

**Functional programming is all about composing functions.**

Saying that is easy, but this is quite an achievement of the history of programming.

Instead of studying the long history of programming, I'd like to share my personal history.

I used to be a C#(OOP)programmer since version1.0, and overall I had been satisfied but felt something very wrong, but did not know what it was.

I later became a JavaScript programmer, and in the early days, I used to write like this:

```js
function add1(a) {
    return a + 1;
}
```

One day, I read some web article saying "In JavaScript, a function is also a value."

The fact is quite surprising to me and break-through to my programming skill.

Until then, to me, it's so obvious that value is value, and a function is a function; both are absolutely different entities in different realms.

Of course, C#1.0 already implemented delegate and I slightly understand it's something about the internal mechanism of events. After all, C# has been a major OOP language and quite ugly for functional programming, at least in version1.0.

In JavaScript, a function is also a value. Since functions of JavaScript is a first-class object, I can define a function that can either take other functions as arguments or return them as results.

So, now, I write this:

```js
const add1 = x => x + 1;
const add2 = x => x + 2;
[1, 2, 3].map(add1); //[2,3,4]
[1, 2, 3].map(add2); //[3,4,5]
```

or

```js
const plus = (x) => (y => x + y);
plus(1)(5); //6
```

In fact, this is what I badly needed in C# programming, that has been something very wrong I felt about.

This is called [function composition][7], and this is the true secret to release the constraints of programming.''

So, a function of JavaScript is a first-class object, and it seems to be a well-designed universally standardized building block, well from now on, let's call it "highly composable units".

A Function is `BEFORE => AFTER`.

The basic idea is to compose functions.

When you focus on functional composition, you only care various compositions of `BEFORE => AFTER`.

When you focus on functional composition, you should forget [flowchart][8] that　flows from the top to the bottom of the code or sometimes loops.

Flowchart coding is called [Imperative programming][9], and generally speaking, it's buggy and too complicated. OOP tends to become this style.

On the other hand, functional programming automatically leads programming style to [Declarative_programming][10], and generally speaking, it's not buggy or easy to debug.

Flows are harder to trace and control, but compositions are rather easier to trace and control. Programmers should not control flows but compose functions.

# 3.Monad

By the way, I will not use Haskell code here.

For most of the people, a major obstacle to understanding monad things is

1. In order to learn monad, a beginner needs to be comfortable with Haskell code and terms.
2. In order to be comfortable with Haskell code and terms, a beginner needs to learn Monad.

This is "Which came first, the chicken or the egg?" problem. Make sure to avoid.

Having said that, as I stated at the beginning of this article, to share knowledge of Monad, quoting "Monad laws" first also seems absurd.

People only can learn based on top of what they already knew.

So, let's back to JavaScript code.

Functions appear to be highly composable units, but what about this?

    console.log("Hello world!");

This is one of the simplest JS code, and surely it's a function.

Hit F12-key on ChromeBrowser, and copy-paste the code on the developer-console.

    Hello world!
    undefined

Ok, the code has done the task to show "Hello world!" on the console, however, the return value of the `console.log` function is `undefined`.

To compose functions, the situation is uncomfortable; an uncomfortable function.

On the other hand, there's a comfortable function.　Let's investigate the following code:

```js
const add1 = x => x + 1;
[1, 2, 3].map(add1); //[2,3,4]
```

 Array in JavaScript behaves pretty well in the functional programming world.

`[1, 2, 3].map(add1)   //[2,3,4]`

indicates:  
`Array` `Function=>` `Array`

Input and Output of the function is the same type: `Array`.

The mathematical structure is identical throughout `BEFORE => AFTER`.

The nature of consistency and identity is beautiful.

The intriguing similarity to USB interface naturally leads an idea:  
`Array` `Function=>` `Array` `Function=>` `Array` `Function=>` `Array`...

In JavaScript code:  

```js
  [1, 2, 3]
    .map(add1) //[2,3,4]
    .map(add1) //[3,4,5]
    .map(add1);//[4,5,6]
```

The code suggests once you enter Array realm, the exit will be always Array realm, so there's no exit in a sense.

Since Array realm is a world of self-contained, it is possible to do something like algebra in functional programming.

When we have:  
`Array.map(F).map(F).map(F)...`

Considering `.map(F)` is JavaScript Array specific syntax, replacing it to more concise syntax would be possible, for instance, by taking advantage of some transpiler such as [Babel][11].

So replacing `.map(F)` to `*F`:  
`Array*F*F*F...`

This looks like [algebra][12].

Obtaining highly composable units, a programmer can write a code like algebra, which means significant, and worth studying very seriously.

In fact, we can have ["Algebraic JavaScript Specification"(Specification for interoperability of common algebraic structures in JavaScript)][13]

[![enter image description here][14]][14]

So is JavaScript array so-called Monad?

No, but close. JavaScript array can be classified as [Functor][15].

[Monad][16] is a special form of Functor, with some extra natures (more rules applied).

Functor is still one of the highly composable units.

So we are getting close to what Monad is. Let's go further.

Now, we know JavaScript array is one of the highly composable units that can do some algebra, at least to a certain extent.

So what about JavaScript values other than arrays? what about functions?

Studying and following [Algebraic JavaScript Specification][13], it would be easy to attempt to implement various composable units, including Functor or Monad, what is the point?

After all, they are merely classification table for Mathematics structure, and following the specification blindly does not make sense.

# 4.Specification

The point is to obtain a highly composable unit that realm is self-contained. This is the only specification to be satisfied.

So, here's the problem establishment:  
Implement a Math structure that generates a self-contained realm, and see how it goes.

Anything is fine, and I will start from scratch, but I already have a good model to refer.

JavaScript Array  
`Array.map(F).map(F).map(F)...`

Instead of the Array realm, let's make my original `M` realm like this:    
`M.map(F).map(F).map(F)...`

I think `Array.map` is not a concise syntax, `M` itself is a function:  
`M(F)(F)(F)...`

Well, it is a good discipline always to use a certain pre-selected block that is universally standardized. That is the idea to start, so probably,`F` also should be `M` :   
`M(M)(M)(M)...`

Hmm, what does this mean??

So, here's my crazy idea.

In functional programming, any functions are also first-class object, and that is the break-through. So when I interpret any value/object/function is `M`, there will be another break-through.

This is crazy like saying "Any values are Array!".

To be exact, it is crazy if it's in the realm of JavaScript, but it is legitimate if it's in the self-contained realm of Array.

So, I will design that the original `M` realm will treat any naked  value/object/function as `M`

For instance, in the `M` realm, when naked value:`5` is found, interpreted as `M(5)`.

In other words, as long as in the `M` realm, a programmer does not have to write `M(5)` since `5` is implicitly interpreted as `M(5)`.

Accordingly, in the `M` realm:

    5
    = M(5)
    = M(M(5))
    = M(M(M(5)))
    ...

As a result, I found `M` is somewhat transparent.

In algebra, Simple similarities exist:

    a
    = 0+a
    = 0+0+a
    = 0+0+0+a

or

    a
    = 1*a
    = 1*1*a
    = 1*1*1*a

`0` in `+`(addition) operation,

    a + 0 = a  //right identity
    0 + a = a  //left identity

`1` in `*`(multiplication) oeration,

    a ∗ 1 = a  //right identity
    1 ∗ a = a  //left identity

is called [identity element][17].

So, `M` should be an identity element in the realm.

As I have been emphasizing, **Functional programming is all about composing functions.**

The `M` should be flexibly written to compose functions:  

```js
const add1 = x => x + 1;
M(10)(add1);             //11
M(10)(add1)(add1);       //12
M(10)(add1)(add1)(add1); //13
const add2 = M(add1)(add1);
M(10)(add2);             //12
const add3 = M(add2)(add1);   
M(10)(add3);             //13
```

Also, composition of higher-order functions:

```js
const plus = (x) => (y => x + y);
M(plus(1)(5));    //6
M(5)(M(1)(plus)); //6
const plus1 = M(1)(plus);
M(5)(plus1)(;     //6
```

In algebra,  [associative property](https://en.wikipedia.org/wiki/Associative_property):
```
1 + 2 + 3 = 1 + 2 + 3
(1+2) + 3 = 1 + (2+3)
    3 + 3 = 1 + 5
        6 = 6
```
Composition of function is associattive for functional programming.

```
　(add1)(add2)(add3) = (add1)(add2)(add3)
((add1)(add2))(add3) = (add1)((add2)(add3))
        (add3)(add3) = (add1)(add5)
　             (add6) = (add6)
```


# 5.Implementation

Here's an implementation of `M`:

```js
const compose = (f, g) => (x => g(f(x)));
const isMonad = (m) => !(typeof m.val === "undefined");

const M = (m = []) => {
  const f = m1 => {
    try { //check type error
      return M(M(m1).val(m));
    } catch (e) {
      return M(compose(m, M(m1).val)); // f-f compose
    };
  };
  f.val = m;
  return isMonad(m)
    ? m
    : f;
};
M.val = m => m;
```

Logging function:  
```js
const log = (m) => (typeof m !== 'function')
  ? (() => {
    console.log(m);
    return m;
  })()
  : err();
```

Test code:

```js
const err = () => {
  throw new TypeError();
};

const log = (m) => (typeof m !== 'function')
  ? (() => {
    console.log(m);
    return m;
  })()
  : err();

const loglog = M(log)(log);
M("test")(loglog);

M("------")(log);
M([1])(log);
M(M(M(5)))(log)
M(99)(M)(log)

M("------")(log);
M([1, 2, 3])(([a, b, c]) => [a + 1, b + 1, c + 1])(log)

M("------")(log);

const add1 = a => (typeof a == 'number')
  ? a + 1
  : err();

M(10)(add1)(log); //11
M(10)(add1)(add1)(log); //12
M(10)(add1)(add1)(add1)(log); //13
const add2 = M(add1)(add1);
M(10)(add2)(log); //12
const add3 = M(add2)(add1);
M(10)(add3)(log); //13

M("------")(log);
const plus = (x) => (y => x + y);
M(plus(1)(5))(log); //6
M(5)(M(1)(plus))(log); //6
const plus1 = M(1)(plus);
M(5)(plus1)(log); //6

M("------")(log);
const map = (f) => (array => array.map(f));
const map1 = M(add1)(map);
M([1, 2, 3])(log)(map1)(log);

//===

M("left identity   M(a)(f) = f(a)")(log);
M(7)(add1)(log) //8

M("right identity  M = M(M)")(log);
console.log(M) //{ [Function: M] val: [Function] }
console.log(M(M)) //{ [Function: M] val: [Function] }

M("identity")(log);
M(9)(M(x => x))(log); //9
M(9)(x => x)(log); //9

M("homomorphism")(log);
M(100)(M(add1))(log); //101
M(add1(100))(log); //101

M("interchange")(log);
M(3)(add1)(log); //4
M(add1)(f => f(3))(log); //4

M("associativity")(log);
M(10)(add1)(add1)(log); //12
M(10)(M(add1)(add1))(log); //12


```

Output:
```console
test
test
------
[ 1 ]
5
99
------
[ 2, 3, 4 ]
------
11
12
13
12
13
------
6
6
6
------
[ 1, 2, 3 ]
[ 2, 3, 4 ]
left identity   M(a)(f) = f(a)
8
right identity  M = M(M)
{ [Function: M] val: [Function] }
{ [Function: M] val: [Function] }
identity
9
9
homomorphism
101
101
interchange
4
4
associativity
12
12

```

Ok, worked.

`M` is a highly composable unit in functional programming.


# 6.Verification

So, is this so-called Monad?

Yes.


https://github.com/fantasyland/fantasy-land#monad

>### Monad
>A value that implements the Monad specification must also implement
the [Applicative](https://github.com/fantasyland/fantasy-land#applicative) and [Chain](https://github.com/fantasyland/fantasy-land#chain) specifications.
>1. `M.of(a).chain(f)` is equivalent to `f(a)` (left identity)
>2. `m.chain(M.of)` is equivalent to `m` (right identity)

#### left identity   M(a)(f) = f(a)   

```js
M(7)(add1) //8
M(add1(7)) //8
```

#### right identity  M = M(M)      

```js
console.log(M) //{ [Function: M] val: [Function] }
console.log(M(M)) //{ [Function: M] val: [Function] }
```

>### Applicative
>A value that implements the Applicative specification must also
implement the [Apply](https://github.com/fantasyland/fantasy-land#apply) specification.
>1. `v.ap(A.of(x => x))` is equivalent to `v` (identity)
>2. `A.of(x).ap(A.of(f))` is equivalent to `A.of(f(x))` (homomorphism)
>3. `A.of(y).ap(u)` is equivalent to `u.ap(A.of(f => f(y)))` (interchange)

#### identity

```js
M(9)(M(x => x)) //9
```

#### homomorphism

```js
M(100)(M(add1)) //101
M(add1(100)) //101
```

#### interchange
```js
M(3)(add1)    //4
M(add1)(f => f(3))  //4
```

>### Chain
>A value that implements the Chain specification must also
implement the [Apply](https://github.com/fantasyland/fantasy-land#apply) specification.
>1. `m.chain(f).chain(g)` is equivalent to `m.chain(x => f(x).chain(g))` (associativity)

#### associativity

```js
M(10)(add1)(add1) //12
M(10)(M(add1)(add1)) //12
```

  [1]: https://en.wikipedia.org/wiki/Monad_(functional_programming)
  [2]: https://en.wikipedia.org/wiki/USB
  [3]: https://en.wikipedia.org/wiki/Object_(computer_science)
  [4]: https://en.wikipedia.org/wiki/Function_object
  [5]: https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)
  [6]: https://en.wikipedia.org/wiki/First-class_citizen
  [7]: https://en.wikipedia.org/wiki/Function_composition
  [8]: https://en.wikipedia.org/wiki/Flowchart
  [9]: https://en.wikipedia.org/wiki/Imperative_programming
  [10]: https://en.wikipedia.org/wiki/Declarative_programming
  [11]: https://babeljs.io/
  [12]: https://en.wikipedia.org/wiki/Algebra
  [13]: https://github.com/fantasyland/fantasy-land
  [14]: https://i.stack.imgur.com/9anw0.png
  [15]: https://github.com/fantasyland/fantasy-land#functor
  [16]: https://github.com/fantasyland/fantasy-land#monad
  [17]: https://en.wikipedia.org/wiki/Identity_element
