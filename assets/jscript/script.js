var API = "5VkpQWeFYgp2DIB7mOyEgg==WvtYDpjrBR0rVt5X";
var displayRecipeCards = document.getElementById("displayRecipeCard");
var letsEat = document.getElementById("letsEat");
//window.onload =  saveAndDisplayLocalStorage;
var dishEntryBoxEl = document.getElementById("dishEntryBox");
var recipeListDisplayEl = document.getElementById('recipeListDisplay')

let recipeItemsArray = localStorage.getItem('items') ?
JSON.parse(localStorage.getItem('items')) : [];
recipeItemsArray.forEach(addTask);
function addTask(text){
    const li = document.createElement('li')
    li.textContent = text;
    recipeListDisplayEl.appendChild(li);
    li.addEventListener("click", function () {
        
    });
}

//Add an event listener to the list item



letsEat.addEventListener("click", function () {
    var query = dishEntryBoxEl.value;
    // localStorage.setItem("recipes", textboxEl.value);
    // Call the API to get recipe results
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/recipe',
        headers: { 'X-Api-Key': API },
        data: { query: query },
        success: function (result) {
            displayRecipeCards.innerHTML = "";
            for (var i = 0; i < 4; i++) {
                var recipe = result[i];
                var listTitle = document.createElement('li');
                listTitle.setAttribute("id", "title")
                listTitle.innerHTML = recipe.title;
                displayRecipeCards.appendChild(listTitle);
                if (recipe.ingredients) {
                    var listIngredients = document.createElement('li');
                    listIngredients.setAttribute("id", "ingredients");
                    listIngredients.innerHTML = recipe.ingredients.substring(0, 50);
                    displayRecipeCards.appendChild(listIngredients);
                }
            }
        },
        error: function (jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
    recipeItemsArray.push(dishEntryBoxEl.value);
    localStorage.setItem('items', JSON.stringify(recipeItemsArray));
    addTask(dishEntryBoxEl.value);
    dishEntryBoxEl.value = '';

});





















// Luc's work here

// API Key for youtube
var API2 = "AIzaSyCVNs58TtoO_0K5OB2ZxDx02j2W4YMFlY4";

// Adding var select for second card and for video display area
var recipeCard = document.getElementById("card2");
var video = document.getElementById("video");

// Calling html for ID's, generating elements for later function use
var videoDisplay = document.createElement("iframe");
var videoTitle = document.createElement("h6");
video.style.height = "100%";
var youtubeURL = "https://www.youtube.com/embed/";
video.appendChild(videoTitle);
video.appendChild(videoDisplay);


// Prints recipe card info to video card info
// Proof of concept/for testing purposes currently, need youtube API and recipe API added
recipeCard.addEventListener("click", function () {
    var selectedRecipe = event.target;
    var selectedRecipeText = selectedRecipe.innerHTML;
    searchYouTube(selectedRecipeText, API2);
    return;
})



function searchYouTube(recipe, key) {
    var videoSearch = "https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=1&q=" + recipe;

    fetch(videoSearch, {})
        .then(function (response) {
            if (response.status !== 200) {
                videoTitle.textContent = "Youtube is currently experiencing issues please try again later";
                return;
            } else {
                return response.json();
            }
        })
        .then(function (data) {
            videoTitle.textContent = data.items[0].snippet.title;
            videoDisplay.src = youtubeURL + data.items[0].id.videoId;
            videoDisplay.width = "100%";
            videoDisplay.height = "80%";
            return;
        })
}
