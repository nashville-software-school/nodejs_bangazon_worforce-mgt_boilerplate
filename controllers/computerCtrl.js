'use strict'

module.exports.getComputers = (req, res, next) => {
  const { Computer } = req.app.get('models');
  Computer.findAll() // love those built-in Sequelize methods
  .then( (computers) => {
    res.render('index', {computers});
  })
  .catch( (err) => {
    next(err); //Ship this nastyness off to our error handler at the bottom of the middleware stack in app.js
  });
};

module.exports.addComputer = (req, res, next) => {
  const { Computer } = req.app.get('models');
  Computer.create(req.body)
  .then( () => {
    return module.exports.getComputers()
  })
  .then( (computers) => {
    res.render('computers', {computers});
  })
  .catch( (err) => {
    next(err); // refactor with a universal error handler after routes
  });
};
