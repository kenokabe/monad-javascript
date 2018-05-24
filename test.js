(() => {
  "use strict";
  //=========================
  const M = require("./monad.js");

  const err = () => {
    throw new TypeError();
  };

  const log = (m) => (typeof m !== 'function')
    ? (() => {
      console.log(m);
      return m;
    })()
    : err();

  // return a type checked function
  const type = s => f => x => (typeof x == s)
    ? f(x)
    : err();

  //need to define type of args
  const add1 = type("number")(
    a => a + 1
  );

  const loglog = M(log)(log);
  M("test")(loglog);

  M("------")(log);
  M([1])(log);
  M(M(M(5)))(log)
  M(99)(M)(log)

  M("------")(log);
  M([1, 2, 3])(([a, b, c]) => [a + 1, b + 1, c + 1])(log)

  M("------")(log);


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

  const ff = (x => [x + 1, x + 2, x + 3]);

  M([1, 2, 3])(ff)(log);

//============================
})();
