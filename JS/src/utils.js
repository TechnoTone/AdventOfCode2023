module.exports.ignoreErrors = function (fn) {
  return function () {
    try {
      return fn.apply(this, arguments);
    } catch {}
  };
};
