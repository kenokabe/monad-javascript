(() => {
  "use strict";

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

  //------------------
  if (typeof module !== "undefined" && module.exports) {
    module.exports = M;
  } else {
    window.M = M;
  }
//============================
})();
