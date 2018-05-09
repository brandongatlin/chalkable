$( document ).ready( function () {
  console.log( 'app.js loaded' );

  function displayResults( data ) {

    $( "#results" ).empty();

    var number = 26;

    for ( var i = data.length - 25; i < data.length; i++ ) {

      var titles = data[ i ].title;
      var authors = data[ i ].author;
      var links = data[ i ].link;
      var times = data[ i ].time;
      var id = data[ i ]._id;
      number--

      $( '#results' ).prepend(
        `<div class="row"><div class="col-lg-1"><div class="numbers">${number}</div></div><div class="col-lg-7"><a href="${links}" target="_blank"><h4 class="title">${ titles }</h4></a></div><div class="col-lg-2">${authors} <br> ${times}</div><div class="col-lg-2"><div><button class="save" data-id=${id}>Save Article</button></div></div></div>`
      )

    }
  } //end displayResults

  function displaySaved( data ) {

    $( "#results" ).empty();

    var number = 1;

    for ( var i = 0; i < data.length; i++ ) {

      var titles = data[ i ].title;
      var authors = data[ i ].author;
      var links = data[ i ].link;
      var times = data[ i ].time;
      var id = data[ i ]._id;
      number++

      $( '#saved-results' ).prepend(
        `<div class="row"><div class="col-lg-1"><div class="numbers">${number}</div></div><div class="col-lg-7"><a href="${links}" target="_blank"><h4 class="title">${ titles }</h4></a></div><div class="col-lg-2">${authors} <br> ${times}</div><div class="col-lg-2"><div><button class="save" data-id=${id}>Save Article</button></div></div></div>`
      )

    }
  } //end displayResults




  $.getJSON( '/articles', function ( articles ) {
    console.log( '$.getJSON / hit' );
    displayResults( articles );
  } );

  $.getJSON( '/saved', function ( savedArticles ) {
    console.log( '$.getJSON /saved hit' );
    displaySaved( savedArticles );
  } );




  $( document ).on( "click", ".save", function () {
    console.log( "save button clicked" );

    var id = $( this ).attr( "data-id" );

    console.log( "saved id is:", id );
    $.ajax( {
      type: "PUT",
      url: "/savearticle/" + id,
      data: {
        id: id
      }
    } );

  } );


} ); //end doc . ready