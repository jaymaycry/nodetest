module.exports = function(sequelize, DataTypes) {
  var Investor = sequelize.define('Investor', {
    family_name: {
      type: DataTypes.STRING
    },
  
    given_name: {
      type: DataTypes.STRING
    },
  
    nationality: {
      type: DataTypes.STRING
    }
  })

  return Investor
}
