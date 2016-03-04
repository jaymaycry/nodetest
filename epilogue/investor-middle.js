module.exports = {
    create: {
        write: {
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