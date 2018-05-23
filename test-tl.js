(() => {
  "use strict";
  //=========================
  const M = require("./monad");

  const isTL = (t) => !(typeof t.tVal === "undefined");

  const now = "now";
  const fromNow = "now";

  const T = (t = []) => {
    const f = t1 => T(); //T(a)(b) //mirge
    Object.defineProperties(f, //detect t update on each seqs
      {
        now: { //a[now]
          get() {
            return f.val;
          },
          set(tUpdate) {
            f.val = M(tUpdate)(f.nowF);
          }
        }
      });
    f.val = (nowF) => (f.nowF = M(nowF));
    f.tVal = t;
    //--------------
    //---------------
    return isTL(t)
      ? t
      : f;
  };
  T.val = t => t;

  //============================

  const log = (m) => (typeof m !== 'function')
    ? (() => {
      console.log(m);
      return m;
    })()
    : err();

  const a = T();
  const b = T();
  const c = a(b);

  const add1 = a => (typeof a == 'number')
    ? a + 1
    : err();

  a[now](M(log)(log));
  b[now](M(add1)(add1)(log)(log));
  //==================
  a[now] = 9;
  b[now] = 66;


//============================
})();
