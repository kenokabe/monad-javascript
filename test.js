(() => {
  "use strict";
  //=========================
  const M = require("./monad.js");

  const err = () => {
    throw new TypeError();
  };

  const FUNCTION = 'function';
  const NUMBER = "number";

  const log = (m) => (typeof m !== FUNCTION)
    ? (() => {
      console.log(m);
      return m;
    })()
    : err();

  // return a type checked function
  const type = input => f => x => (typeof x === input)
    ? f(x)
    : err();

  //need to define type of args
  const add1 = type(NUMBER)(
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
  const plus = type(NUMBER)(
    (x) => (y => x + y)
  );

  M(plus(1)(5))(log); //6
  M(1)(plus(5))(log); //6
  const plus1 = M(1)(plus);
  M(5)(plus1)(log); //6

  M("------")(log);
  const map = type(FUNCTION)(
    f => (array => array.map(f))
  );

  const map1 = M((map)(add1));
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

  M("---")(log);

  (() => {


    Number.prototype.compose = function(f) {
      return f(this);
    };
    Function.prototype.compose = function(f) {
      try { //check type error
        return f(this);
      } catch (e) {
        return (x => f(this(x)));
      };
    };
    const identity = (m) => (m)

    //====================
    console.log(
      (0).compose(add1).compose(add1)
    );
    console.log(
      (0).compose(add1.compose(add1))
    );
    console.log(
      (add1).compose(f => f(3).compose(add1))
    );



  })();


//============================
})();
