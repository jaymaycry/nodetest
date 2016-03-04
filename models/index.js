var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  , sequelize = new Sequelize('sequelize_test', 'root', null, {
      dialect: "sqlite", // or 'sqlite', 'postgres', 'mariadb'
      storage: "/tmp/my.db",
    })
  , db        = {}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return ((file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) == '.js'))
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].hasOwnProperty('associate')) {
    db[modelName].associate(db)
  }
})

// n:m investor deal
db.Deal.belongsToMany(db.Investor, {through: 'investor_deal', as: 'investors'})
db.Investor.belongsToMany(db.Deal, {through: 'investor_deal', as: 'deals'})

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db)
