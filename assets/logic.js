
//Array of topcis

 var topics = ["The Big Ban Theory" , "How I Met Your Mother", "Modern Family" , "Family Guy" , "New Girl" , "Orange Is The New Black"];

    // Function to render content

    function displayTopics() {

        var comedy = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + comedy + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL, 
            method:"GET"
        }).done(function (response) {
             console.log(response);
             var results = response.data;

             for (var i = 0; i < results.length; i++) {
                 if (results[i].rating !== "r" )
            {
                 var comedyDiv = $("<div>");
                 var rating = results[i].rating;
                 var pRating = $("<p>").text("Rating: " + rating);
                 var comedyImg = $("<img>")
                 
                 comedyImg.attr("src", results[i].images.fixed_height_still.url);

                 comedyDiv.prepend(pRating);
                 comedyDiv.prepend(comedyImg);

                  $("#comedy-view").prepend(comedyDiv);

            }    
             }
            
        })
        
    }

    displayTopics();
    


    function displaysButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {
            var btn = $("<button>");
            btn.attr("data-name", topics[i]);
            btn.text(topics[i]);
            $("#buttons-view").append(btn)

        }
    }

  $("#add-comedy").on("click", function (event) {
      event.preventDefault();
      var comedy = $("#comedy-input").val().trim();
      if($("#comedy-input").val() !==""){
          topics.push(comedy);

          $("#comedy-input").val("");

          displaysButtons();
      }
  });  

  $(document).on("click", ".comedy", "<br>", displayTopics);

  displaysButtons();



   


