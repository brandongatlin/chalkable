const express = require( 'express' );
const router = express.Router();


const mongojs = require( "mongojs" );
const bodyParser = require( "body-parser" );
const path = require( 'path' );
const artModel = require( "../models/Article.js" );
const noteModel = require( "../models/Note.js" );


const cheerio = require( "cheerio" );
const request = require( "request" );

const logger = require( "morgan" );
const mongoose = require( "mongoose" );

var authorLastName;
var authorFirstName;


router.get( '/', function ( req, res ) {

  artModel.find( {}, function ( error, articles ) {

    if ( error ) {
      console.log( error );
    }
    // Otherwise, send the result of this query to the browser
    else {
      let hbsObject = {
        articles: articles
      }
      // console.log( hbsObject );
      res.render( 'index', hbsObject );

    }
  } ).limit( 51 );

  // res.render( path.join( __dirname, '../views/index.handlebars' ) );
  // res.send( 'hello, world from routes.js' )
} );

router.get( "/scrape", function ( req, res ) {
  request( "http://www.slate.com/full_slate.html?via=homepage_recirc_recent", function ( error, response, html ) {

    console.log( "scrape begins" )
    var $ = cheerio.load( html );

    $( "div.tile " ).each( function ( i, element ) {

      var title = $( element ).children().children( '.hed' ).text()
      var link = $( element ).children().attr( 'href' );
      var author = $( element ).children().children( '.byline' ).text()
      var time = $( element ).children( '.timestamp' ).text();

      var authorLastArr = author.split( ' ' )
      authorLastName = authorLastArr[ 2 ];
      console.log( "authorLastName", authorLastName )

      var authorFirstNameArr = author.split( ' ' )
      authorFirstName = authorFirstNameArr[ 1 ];
      console.log( "authorFirstName is", authorFirstName );

      // console.log( "title is:", title );
      // console.log( "link is:", link );
      // console.log( "author is:", author );
      // console.log( "time is:", time )

      artModel.create( {
        title: title,
        link: link,
        author: author,
        authorFirstName: authorFirstName,
        authorLastName: authorLastName,
        time: time
      }, function ( error, saved ) {
        if ( error ) {
          console.log( "errors are:", error );
        } else {
          // console.log( "articles were saved" );
        }
      } ); //end create

    } );

  } );
  // res.sendFile( path.join( __dirname, '../views/index.html' ) );
  res.redirect( '/' )
} ); // end /scrape


router.get( '/saved', function ( req, res ) {

  artModel.find( {}, function ( error, articles ) {

    if ( error ) {
      console.log( error );
    }
    // Otherwise, send the result of this query to the browser
    else {
      let hbsObject = {
        articles: articles
      }
      // console.log( hbsObject );
      res.render( 'saved', hbsObject );

    }
  } ).limit( 51 );

  // res.render( path.join( __dirname, '../views/index.handlebars' ) );
  // res.send( 'hello, world from routes.js' )
} );

router.put( "/savearticle/:id", function ( req, res ) {

  artModel.findOneAndUpdate( {
      _id: req.params.id
    }, {
      "saved": true
    }, {
      new: true
    },
    function ( error, doc ) {
      // console.log( "doc is", doc );
    } );
  // console.log( "/saveart got hit, and req.params.id is:",
  //   req.params.id );
  res.end();

} );



router.post( "/comment/:id", function ( req, res ) {
  console.log( 'comment post route hit' )
  noteModel.create( {
      _id: req.params.id
    }, {
      "noteText": req.params.body
    }, {
      new: true
    },
    function ( error, doc ) {
      console.log( "comment doc is", doc );
    } );
  console.log( "r.p.body is:", req.params.body );
} );



router.put( "/deletearticle/:id", function ( req, res ) {

  artModel.findOneAndUpdate( {
      _id: req.params.id
    }, {
      "saved": false
    }, {
      new: true
    },
    function ( error, doc ) {
    } );
  res.render('saved');
} );

router.get( "/sort/author", function ( req, res ) {

  artModel.find().sort( { authorLastName: 1 } ).exec( function ( error, articles ) {
    if ( error ) {
      console.log( error );
    }
    // Otherwise, send the result of this query to the browser
    else {
      // console.log( "sorted articles are:", articles );
      let sortedObj = {
        articles: articles
      }

      for ( var i = 0; i < articles.length; i++ ) {
        var namez = articles[ i ].authorLastName;
      }
      // console.log( hbsObject );
      res.render( 'index', sortedObj );

    }
  } )

} )

router.get( "/sort/date/asc", function ( req, res ) {
  // const authorSort = "";
  artModel.find().sort( { time: -1 } ).exec( function ( error, articles ) {
    if ( error ) {
      console.log( error );
    }
    // Otherwise, send the result of this query to the browser
    else {
      // console.log( "sorted articles are:", articles );
      let sortedObj = {
        articles: articles
      }

      for ( var i = 0; i < articles.length; i++ ) {
        var timez = articles[ i ].time;
      }
      // console.log( hbsObject );
      res.render( 'index', sortedObj );

    }
  } )

} )

router.get( "/sort/date/desc", function ( req, res ) {
  // const authorSort = "";
  artModel.find().sort( { time: 1 } ).exec( function ( error, articles ) {
    if ( error ) {
      console.log( error );
    }
    // Otherwise, send the result of this query to the browser
    else {
      // console.log( "sorted articles are:", articles );
      let sortedObj = {
        articles: articles
      }

      for ( var i = 0; i < articles.length; i++ ) {
        var timez = articles[ i ].time;
      }
      // console.log( hbsObject );
      res.render( 'index', sortedObj );

    }
  } )

} )



module.exports = router;
