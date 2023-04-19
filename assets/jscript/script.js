// august starts here
//grab textbox user entry
var API = "5VkpQWeFYgp2DIB7mOyEgg==WvtYDpjrBR0rVt5X";

var displayRecipeCards = document.getElementById("displayRecipeCard");
var letsEat = document.getElementById("letsEat");

letsEat.addEventListener("click", function () {
    var textboxEl = document.getElementById("dishEntryBox").value;


    // adding the user's entered text from the texbox to localStorage
    localStorage.setItem("recipes", textboxEl);
    var query = textboxEl;
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/recipe?query=' + query,
        headers: { 'X-Api-Key': API },
        contentType: 'application/json',
        success: function (result) {
            displayRecipeCards.innerHTML = "";
            // for loop to display on Recipe Card
            for (var i = 0; i < 4; i++) {
                var recipeTitle = result[i].title;
                var recipeIngredients = result[i].ingredients;
                var display50chars = recipeIngredients.substring(0, 50);
                var listTitle = document.createElement('li');
                listTitle.setAttribute("id", "title")
                var listIngredients = document.createElement('li');
                listIngredients.setAttribute("id", "ingredients");
                listTitle.innerHTML = recipeTitle;
                listIngredients.innerHTML = display50chars;

                displayRecipeCards.appendChild(listTitle);
                displayRecipeCards.appendChild(listIngredients);



            }
            pullRecipe();
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
            
            fetchButton.addEventListener('click');  
        }
    });   
    
        
        localStorage.setItem("recipes", textboxEl);
    // Get the saved recipes from local storage
    var savedRecipes = localStorage.getItem("recipes");
    
    // If there are saved recipes, display them in a list
    if (savedRecipes) {
        // Split the saved recipes into an array
        var recipesArray = savedRecipes.split(",");
        
        // Get the container element to display the list
        var recipeList = document.getElementById("recipeList");
        
        // Loop through the recipes array and create a new list item for each recipe
        for (var i = 0; i < recipesArray.length; i++) {
            var recipeListItem = document.createElement("li");
            recipeListItem.innerText = recipesArray[i];
            recipeListItem.style.borderBottom = "1px solid #ccc";
            recipeListItem.style.backgroundColor = "#f9f9f9";
            
            // Add an event listener to the list item
            recipeListItem.addEventListener("click", function () {
            });
            
            recipeList.appendChild(recipeListItem);
        }

    }
    






});


// Luc's work here

// API Key for youtube
var API2 = "AIzaSyCqsrMZa943fc3nCpwCNYSZ9TZh7x2Gxeo";

// Adding var select for second card and for video display area
var recipeCard;
var video = document.getElementById("video");
recipeCard = document.getElementById("displayRecipeCard");

// Calling html for ID's, generating elements for later function use
var videoDisplay = document.createElement("iframe");
var videoTitle = document.createElement("h6");
video.style.height = "100%";
var youtubeURL = "https://www.youtube.com/embed/";
video.appendChild(videoTitle);
video.appendChild(videoDisplay);


// Prints recipe card info to video card info
// Proof of concept/for testing purposes currently, need youtube API and recipe API added
function pullRecipe() {
    recipeCard.addEventListener("click", function () {
        var selectedRecipe = event.target;
        var selectedRecipeText = selectedRecipe.innerHTML;
        if(selectedRecipe.id === "title"){
            searchYouTube(selectedRecipeText, API2);
        }
    })
}


function searchYouTube(recipe, key) {
    var videoSearch = "https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=1&q=" + recipe + " recipe";
    fetch(videoSearch, {})
        .then(function (response) {
            if(response.status === 403){
                videoTitle.textContent = "Youtube API is out of quota credits. Either wait a day or get a new API key."
                return;
            }
            else if (response.status !== 200) {
                videoTitle.textContent = "Youtube is currently experiencing issues please try again later";
                return;
            } else {
                return response.json();
            }
        })
        .then(function (data) {
            videoTitle.textContent = "Similar video from youtube based on your selection: "+ data.items[0].snippet.title;
            videoDisplay.src = youtubeURL + data.items[0].id.videoId;
            videoDisplay.width = "100%";
            videoDisplay.height = "80%";
        })
}
