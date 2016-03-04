module.exports = function(sequelize, DataTypes) {
  var Deal = sequelize.define('Deal', {
    name: {
      type: DataTypes.STRING  
    },
    target_return: {
      type: DataTypes.FLOAT 
    },
    minimum_investment_amount: {
      type: DataTypes.FLOAT
    }
  })

  return Deal
}
