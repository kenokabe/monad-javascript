(() => {
  "use strict";

  const isFunction = (m) => (typeof m === "function");
  const isHigherOrder = (f) => {
    try {
      f(0);
    } catch (e) {
      return true;
    };
    return isFunction(f(0));
  };
  const compose = (f, g) => (x => g(f(x)));
  const isMonad = (m) => !(typeof m.val === "undefined");

  const M = (m = []) => {
    const f = m1 => {
      const m1S = isMonad(m1) ? m1 : M(m1);
      return !isFunction(m)
        ? M(m1S.val(m)) // a-f chain
        : isHigherOrder(m1S.val)
          ? M(m1S.val(m)) //f-f curried function apply
          : M(compose(m, m1S.val)); // f-f compose
    };
    f.val = m;
    return isMonad(m)
      ? m
      : f;
  };
  M.val = m => m;

  //------------------

  if (typeof module !== "undefined" && module.exports) {
    module.exports = M;
  } else {
    window.M = M;
  }
//============================
})();
