var lookup         = require('country-data').lookup

module.exports = function(sequelize, DataTypes) {
    var Investor = sequelize.define('Investor', {
        family_name: {
            type: DataTypes.STRING
        },
    
        given_name: {
            type: DataTypes.STRING
        },
    
        nationality: {
            type: DataTypes.STRING,
            validate: {
                isAlpha3: function(value) {
                    if(lookup.countries({alpha3: value}).length == 0) {
                        throw new Error('Only alpha3 format for nationality is allowed!')
                        // we also are in the model's context here, so this.otherField
                        // would get the value of otherField if it existed
                    }
                }
            }
        }
    })

    return Investor
}
