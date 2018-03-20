$(document).ready(function(){

   $('#term').focus(function(){
      var full = $("#poster").has("img").length ? true : false;
      if(full == false){
         $('#poster').empty();
      }
   });

   var getPoster = function(){

        var film = $('#term').val();
        var category = $('.selectpicker').val();
        console.log(category);

         if(film == ''){

            $('#poster').html("<h2 class='loading'>Please enter something.</h2>");

         } else {

            $('#poster').html("<h2 class='loading'>...</h2>");

            $.getJSON("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + film + "&api_key=63fb6636ec2478d100630688c2cd887d&format=json", function(json) {
               if (json != "Nothing found." && category == "artist") {
                     $('#poster').html('<h2 class="loading"></h2><img id="thePoster" src= '+ json.artist.image[5]['#text'] + ' />');
                  } else {
                     $.getJSON("http://ws.audioscrobbler.com/2.0/?method=album.search&album=" + film + "&api_key=63fb6636ec2478d100630688c2cd887d&format=json", function(json) {
                        if (json != "Nothing found." && category == "album") {
                     		$('#poster').html('<h2 class="loading"></h2><img id="thePoster" src= '+ json.results.albummatches.album[0].image[3]['#text'] + ' />');
                		  } 
                     });
                  }
             });

          }

        return false;
   }

   $('#search').click(getPoster);
   $('#term').keyup(function(event){
       if(event.keyCode == 13){
           getPoster();
       }
   });


});


