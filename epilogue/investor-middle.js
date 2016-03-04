var lookup         = require('country-data').lookup

module.exports = {
    create: {
        write: {
            before: function(req, res, context) {
                var nationality = req.body.nationality
                if (lookup.countries({alpha3: nationality}).length != 0) {
                    return context.continue;
                }
                return context.error(422, "investors nationality has to be correct."); 
            },
            after: function(req, res, context) {
                var deals = req.body.deals;
                if (deals) {
                    context.instance.addDeals(deals);
                }
                return context.continue;
            }
        }
    },
    update: {
        write: {
            before: function(req, res, context) {
                var nationality = req.body.nationality
                if (!nationality || lookup.countries({alpha3: nationality}).length != 0) {
                    return context.continue;
                }
                return context.error(422, "investors nationality has to be correct."); 
            },
            after: function(req, res, context) {
                var deals = req.body.deals;
                if (deals) {
                    context.instance.setDeals(deals);
                }
                return context.continue;
            }
        }
    },
    delete: {
        auth: function(req, res, context) {
            return context.error(403, "can't delete an investor");  
        }
    } 
};