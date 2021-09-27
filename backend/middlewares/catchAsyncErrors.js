module.exports = (func) => (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch(next);


// Another method
// module.exports = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(next);
//     //fn(req, res, next).catch(err => next(err));
//   };
// };

