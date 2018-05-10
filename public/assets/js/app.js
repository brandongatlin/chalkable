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

  } );


} ); //end doc . ready