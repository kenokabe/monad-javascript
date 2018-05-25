(() => {
  "use strict";

  const compose = (f, g) => {
    try { //check type error
      return g(f);
    } catch (e) {
      return (x => g(f(x))); // f-f compose
    }
  };

  const isMonad = (m) => !(typeof m.val === "undefined");

  const M = (m = []) => isMonad(m)
    ? m
    : (() => {
      const f = m1 => M(compose(m, M(m1).val)); // f-f compose
      f.val = m;
      return f;
    })();

  M.val = m => m;

  //------------------
  if (typeof module !== "undefined" && module.exports) {
    module.exports = M;
  } else {
    window.M = M;
  }
//============================
})();
