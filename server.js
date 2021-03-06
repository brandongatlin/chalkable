const chalkAnimation = require( 'chalk-animation' );

// Dependencies
var express = require( "express" );
var mongojs = require( "mongojs" );
var bodyParser = require( "body-parser" );
var artModel = require( "./models/Article.js" );
var cheerio = require( "cheerio" );
var request = require( "request" );
const path = require( 'path' );
var logger = require( "morgan" );
var mongoose = require( "mongoose" );

const port = process.env.PORT || 3000;

// Initialize Express
var app = express();
const exphbs = require( 'express-handlebars' )

const routes = require( "./controllers/routes.js" );

app.use( "/", routes );


// Use morgan logger for logging requests
app.use( logger( "dev" ) );

// Use body-parser for handling form submissions
app.use( bodyParser.urlencoded( {
  extended: true
} ) );

// Set Handlebars as the default templating engine.
app.engine( "handlebars", exphbs( {
  defaultLayout: "main"
} ) );
app.set( "view engine", "handlebars" );
// //tesing end

// Static directory
app.use( express.static( "public" ) );

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/chalk" );
// Database configuration
// Save the URL of our database as well as the name of our collection
var databaseUrl = "chalk";
var collections = [ "articles", "notes" ];

// Use mongojs to hook the database to the db variable
var db = mongoose.connection;

// This makes sure that any errors are logged if mongodb runs into an issue
db.on( "error", function ( error ) {
  console.log( "Database Error:", error );
} );



// Set the app to listen on port 3000
app.listen( port, function () {
  console.log( `App running on port:${port}!` );
} );