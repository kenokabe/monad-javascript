(() => {
  "use strict";
  //=========================
  const M = require("./monad");

  const isTL = (t) => !(typeof t.tVal === "undefined");

  const now = "now";
  const fromNow = "now";

  const T = (t = []) => {
    const f = t1 => {

      const t01 = T();
      t01. = [];

      t01.dA[t01.dA.length] = t1;

      t01.dA.map((d) => {
      //  d.uA[d.uA.length] = t01;
        d.updatedTo[t01] = 0; // non-interference dependency
      });


      return t01; //T(a)(b) //merge
    }
    Object.defineProperties(f, //detect t update on each seqs
      {
        now: { //a[now]
          get() {
            return f.val;
          },
          set(tUpdate) {
            f.val = M(tUpdate);

            f.

            const todo = M(tUpdate)(f.nowF);
          }
        }
      });
    f.val = (nowF) => (f.nowF = M(nowF));

    f.dA = (isTL(t))
      ? [t]
      : [];

    f.uA = [];



    f.tVal = t;
    //--------------
    //---------------
    return isTL(t)
      ? t
      : f;
  };
  T.val = t => t;

  //============================

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

  const a = T();


  //need to define type of args
  const add1 = type("number")(
    a => a + 1
  );


  a[now](M(add1)(log));
  //  const b = T(a)[now](M(add1)(add1)(log));
  //==================
  a[now] = 9;
  a[now](log);
/*

  (() => {
    const a = T();
    const b = T(a)[now](M(a => a * 2));
    const c = T(a)(b)[now](M(([a, b]) => a + b * 3));
    const d = T(b)[now](M(([b]) => b * 100));
    const e = T(a)(b)(c)(d)[now](M(([a, b, c, d]) => a + b + c + d));

    a[now](log);
    b[now](log); // b.t = 1 * 2 = 2
    c[now](log); // c.t = 1 + 2 * 3 = 7
    d[now](log); // d.t = 2 * 100 = 200
    e[now](log); //210

    __a.t = 1; // the whole val will be updated
    __a.t = 2;
  /* //ERROR!
  //cannot set a value on sequence that depends on other sequences
        __b.t = 99;
  */
/*
  })();
*/
//============================
})();
