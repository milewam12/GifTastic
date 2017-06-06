
//Array of topcis

 var topics = ["LOL" , "How I Met Your Mother", "Modern Family" , "Family Guy" , "New Girl" , "Orange Is The New Black"];

    // Function to render content

    function displayTopics(name) {

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL, 
            method:"GET"
        }).done(function (response) {
             console.log(response);
             var results = response.data;

             for (var i = 0; i < results.length; i++) {
                 if (results[i].rating !== "r" )
            {
                 var comedyDiv = $("<div class='gifs'>");
                 var rating = results[i].rating;
                 var pRating = $("<p>").text("Rating: " + rating);
                 var comedyImg = $("<img>")
                 
                 comedyImg.attr("src", results[i].images.fixed_height_small.url);

                 comedyDiv.prepend(pRating);
                 comedyDiv.prepend(comedyImg);

                  $("#comedy-view").prepend(comedyDiv);

            }    
             }
            
        })
        
    }

    displayTopics();

    $("#buttons-view").on("click", ".gifBtn", function(){
        var gifName = $(this).attr("data-name");
        console.log(gifName)
        displayTopics(gifName);
    });
    


    function displaysButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {
            var btn = $("<button class='gifBtn'>");
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



   


