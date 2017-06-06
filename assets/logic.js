
//Array of topcis

 var topics = ["LOL" , "How I Met Your Mother", "Modern Family" , "Family Guy" , "New Girl" , "Orange Is The New Black"];

    // Function to call API, create dynamic content 

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
    
// click event to call the gis and clear the gifs
    $("#buttons-view").on("click", ".gifBtn", function(){
        var gifName = $(this).attr("data-name");
        console.log(gifName)
        displayTopics(gifName);
        $("#comedy-view").empty();
    });
    

//function to display the gif buttons 
    function displaysButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {
            var btn = $("<button class='gifBtn'>");
            btn.attr("data-name", topics[i]);
            btn.text(topics[i]);
            $("#buttons-view").append(btn)

        }
    }

//click event to capture user's input and add it to the array
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

  // Pause and animate GIFS it doesn't work. I'm not sure why

    $('.gifs').on("click", function () {
      var state = $(this).attr("data-state");
      if (state === "still") {
          $(this).attr("src" , $(this).attr("data-animate"));
          $(this).attr("data-state" , "animate");
      }else{
           $(this).attr("src" , $(this).attr("data-still"));
          $(this).attr("data-still" , "still");
      }

  });





   


