$( document ).ready( function () {
  console.log( 'app.js loaded' );




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
    $( this ).addClass( 'disabled' );
    // $( '#myModal' ).show();
  } );



  $( document ).on( "click", ".add-note", function () {
    console.log( "comment button clicked" );

    const note = $( ".form-control" ).val().trim();

    var id = $( this ).attr( "data-id" );
    const url = "/comment/:" + id;
    console.log( "note id is:", id );
    console.log( "note is:", note );


    $.ajax( {
      type: "POST",
      url: url,
      data: {
        text: note
      }
    } );
    console.log( url );

  } );





  $( document ).on( "click", ".delete", function ( event ) {
    // console.log( '27 data is:', data );
    var id = $( this ).attr( "data-id" );

    $.ajax( {
      type: "PUT",
      url: "/deletearticle/" + id,
      data: {
        id: id
      }

    } );
    $( this ).addClass( 'disabled' );

    // $( '#myModal' ).show();
  } );


} ); //end doc . ready