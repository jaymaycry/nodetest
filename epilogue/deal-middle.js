module.exports = {
    create: {
        write: {
            after: function(req, res, context) {
                var investors = req.body.investors;
                if (investors) {
                    context.instance.addInvestors(investors);
                }
                return context.continue;
            }
        } 
    },
    update: {
        write: {
            after: function(req, res, context) {
                var investors = req.body.investors;
                if (investors) {
                    context.instance.setInvestors(investors);
                }
                return context.continue;
            }
        }
    },
    delete: {
        auth: function(req, res, context) {
            return context.error(403, "can't delete a deal");  
        }
    }
};