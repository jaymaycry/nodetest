var express        = require('express')
  , bodyParser     = require('body-parser')
  , errorHandler   = require('errorhandler')
  , methodOverride = require('method-override')
  , morgan         = require('morgan')
  , http           = require('http')
  , path           = require('path')
  , db             = require('./models')
  , epilogue       = require('epilogue')

  , dealMiddleware = require('./epilogue/deal-middle')
  , investorMiddleware = require('./epilogue/investor-middle')

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(morgan('dev'))
app.use(bodyParser())
app.use(methodOverride())
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' === app.get('env')) {
  app.use(errorHandler())
}

// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: db
});

// Create REST resource
var dealResource = epilogue.resource({
  model: db.Deal,
  endpoints: ['/deals', '/deals/:id'],
  include: [{model: db.Investor,as: 'investors'}]
});

var investorResource = epilogue.resource({
  model: db.Investor,
  endpoints: ['/investors', '/investors/:id'],
  include: [{model: db.Deal,as: 'deals'}]
});

// Middleware for REST-Interface
dealResource.use(dealMiddleware)
investorResource.use(investorMiddleware)

db
  .sequelize
  .sync()
  .then(function () {
    //fixtures
    if ('development' === app.get('env')) {
        var sequelize_fixtures = require('sequelize-fixtures'),
        models = {
            Deal: db.Deal,
            Investor: db.Investor
        }
        sequelize_fixtures.loadFile('./fixtures/test_data.json', models).then(function(){
            console.log('test data loaded.')
        })
    }
    http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'))
    })
  })
