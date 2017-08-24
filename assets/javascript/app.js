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

//put into function
function renderGifs(somethingToRender) {
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + somethingToRender + "&api_key=c066173623944c50bb52242ce1a34f07&limit=10";
	$("#gifSec").empty();

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(queryURL);
		console.log(response);

		var results = response.data;
		
		//make a div for all the gifs and text to go into to keep the rating and gif together
		for(var i=0; i < results.length; i++) {
			if(results[i].rating !== "r") {
				//var individualDiv = $("<div>");
				var gifDiv = $("<div>");
				var h = $("<h3>");
				var animalImage = $("<img>");

				gifDiv.addClass("imgBlock");
				gifDiv.attr("style", "position: relative");

				h.text("Rating: " + results[i].rating);
				h.attr("style", "position: absolute; top: 75px; right: 150px; width: 25%");

				animalImage.attr("id", response.data[i].id);
				console.log(response.data[i].id);
				animalImage.attr("src", results[i].images.fixed_height_still.url);
				animalImage.attr("data-state", "still")
				animalImage.attr("data-still", results[i].images.fixed_height_still.url);
				animalImage.attr("data-animate", results[i].images.fixed_height.url);
				animalImage.attr("style", "position: relative; width: 25%; margin: 0px 15px 15px 0px;")
				animalImage.addClass("img-rounded gif");

				
				gifDiv.append(animalImage);
				gifDiv.append(h);

				//$(".imgBlock").prepend(gifDiv);
				$("#gifSec").append(gifDiv);	

			}
		}

	});
}

function renderNewButton () {
	//prevents form from trying to submit itself, can hit enter instead of clicking  the button if they want
	event.preventDefault();

	//grabs the text from the input box
	var newAnimal = $("#animal-input").val().trim();
	//clears input after enter
	$("#animal-input").val("");
	animals.push(newAnimal);
	console.log(animals);
	renderButtons();
	renderGifs(newAnimal);
}

function animateGifs(somethingToAnimate) {
	var state = $("#" + somethingToAnimate).attr("data-state");
	console.log(state);
	console.log(somethingToAnimate); 
	
	if (state === "still") {
    	$("#" +somethingToAnimate).attr("src", $("#" +somethingToAnimate).attr("data-animate"));
    	$("#" +somethingToAnimate).attr("data-state", "animate");
  	} else {
    	$("#" +somethingToAnimate).attr("src", $("#" +somethingToAnimate).attr("data-still"));
    	$("#" +somethingToAnimate).attr("data-state", "still");
  }
}


//onclick add animal function 
$("#add-animal").on("click", function() {
	console.log("click1");
	renderNewButton();
});
renderButtons();

//onclick display gif function
$("#buttonSec").on("click", ".animal", function() {
	console.log("click2");
	var animal = $(this).attr("data-name");
	renderGifs(animal);
});

$("#gifSec").on("click",".gif", function() {
	var animal = this.id;
	console.log(animal);
    animateGifs(animal);
  
});