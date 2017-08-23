// GifTasic API Key: c066173623944c50bb52242ce1a34f07 

// Gifhy parameters
// q
// limit
// rating

// start with set of buttons already to go
//generate dynamic html buttons

// with an add animal form on the side
//make html search 

// minimal html
// js populate buttons

// floats images left
// pulls up 10 images

// click to play click again to pause
// rating of gif at the top of each gif

// //array with animals

// //button handler
// funtion to generate buttons
// funtion to add buttons 


// //gif handler
// funtion to populate html for gif and its rating
// function to pause gif
// funtion to play gif

//Initial Animal Array
var animals = ["Kitten", "Puppy", "Sugar Glider", "Panda"];


//function to display animal buttons
function renderButtons() {
	//Delete animals before adding new animal buttons
	$("#buttonSec").empty();
	//$("#gifSec").empty();

	for(var i=0; i < animals.length; i++) {
		var animalBtn = $("<button>");
		animalBtn.addClass("btn btn-info animal");
		animalBtn.attr("data-name", animals[i]);
		animalBtn.text(animals[i]);
		$("#buttonSec").append(animalBtn);
	}
}

//onclick add animal function 
$("#add-animal").on("click", function() {
	//$("#gifSec").empty();
	console.log("click1");
	//prevents form from trying to submit itself, can hit enter instead of clicking  the button if they want
	event.preventDefault();

	//grabs the text from the input box
	var newAnimal = $("#animal-input").val().trim();
	//clears input after enter
	$("#animal-input").val("");
	animals.push(newAnimal);
	console.log(animals);
	renderButtons();
});
renderButtons();

//onclick display gif function
$("button").on("click", function() {
	$("#gifSec").empty();
	console.log("click2");
	var animal = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=c066173623944c50bb52242ce1a34f07&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(queryURL);
		console.log(response);

		var results = response.data;
		
		for(var i=0; i < results.length; i++) {
			if(results[i].rating !== "r") {
				var gifDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var animalImage = $("<img>");

				animalImage.attr("src", results[i].images.fixed_height_still.url);
				animalImage.attr("data-still", results[i].images.fixed_height_still.url);
				animalImage.attr("data-animate", results[i].images.fixed_height.url);
				animalImage.attr("style", "float: left; margin: 0px 15px 15px 0px;")
				animalImage.addClass("img-rounded gif");
				//gifDiv.append(p);
				gifDiv.append(animalImage);
				$("#gifSec").prepend(gifDiv);

				

			}
		}
			$(".gif").on("click", function() {
			    
		      var state = $(this).attr("data-state");
		    
		      if (state === "still") {
		        $(this).attr("src", $(this).attr("data-animate"));
		        $(this).attr("data-state", "animate");
		      } else {
		        $(this).attr("src", $(this).attr("data-still"));
		        $(this).attr("data-state", "still");
		      }
		    });
	});

});

