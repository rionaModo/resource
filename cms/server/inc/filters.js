var filters = module.exports;

filters.fixed2 = function (num) {
  return (num >> 0).toFixed(2);
}