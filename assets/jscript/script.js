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

            var accordion = document.createElement('div');
            displayRecipeCards.appendChild(accordion);
            accordion.setAttribute("id", "accordion")
            $(function () {
                $("#accordion").accordion();
            });
            // for loop to display on Recipe Card
            for (var i = 0; i < 4; i++) {
                var recipeTitle = result[i].title;
                var recipeIngredients = result[i].ingredients;
                var display50chars = recipeIngredients.substring(0, 50);
                var listTitle = document.createElement('h3');
                listTitle.setAttribute("id", "title")
                var listIngredients = document.createElement('p');
                listIngredients.setAttribute("id", "ingredients");
                listTitle.innerHTML = recipeTitle;
                listIngredients.innerHTML = display50chars;
                accordion.appendChild(listTitle);
                accordion.appendChild(listIngredients);
                // console.log(result[i].title);
            }
            // Turns newly created recipe cards into accordion via JqueryUI

            // Calls function used to search youtube for videos
             pullRecipe();
        },
        error: function ajaxError(jqXHR) {
            // console.error('Error: ', jqXHR.responseText);
            fetchButton.addEventListener('click');
        }
    });
    recipeItemsArray.push(dishEntryBoxEl.value);
    localStorage.setItem('items', JSON.stringify(recipeItemsArray));
    addTask(dishEntryBoxEl.value);
    dishEntryBoxEl.value = '';
});




// API Key for youtube
var API2 = "AIzaSyCqsrMZa943fc3nCpwCNYSZ9TZh7x2Gxeo";

// Adding var select for second card and for video display area
var recipeCard = document.getElementById("displayRecipeCard");
var video = document.getElementById("video");

// Calling html for ID's, generating elements for later function use
var videoDisplay = document.createElement("iframe");
var videoTitle = document.createElement("h6");
video.style.height = "100%";
var youtubeURL = "https://www.youtube.com/embed/";
video.appendChild(videoTitle);
video.appendChild(videoDisplay);


// Prints recipe card info to video card info
function pullRecipe() {
    recipeCard.addEventListener("click", function () {
        var selectedRecipe = event.target;
        // console.log(selectedRecipe);
        var selectedRecipeText = selectedRecipe.textContent;
        // console.log(selectedRecipeText)
        // Checks to make sure the item being clicked is a title ID aka a recipe, ignores the ingridents 
        if (selectedRecipe.id === "title") {
            searchYouTube(selectedRecipeText, API2);
        }
    })
}

// This function searches youtube
function searchYouTube(recipe, key) {


    // Creates string using youtube API key and recipe name taken from the recipe function
    var videoSearch = "https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=1&q=" + recipe + " recipe";
    fetch(videoSearch, {})
        .then(function (response) {
            if (response.status === 403) {
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

            // Puts video title, and youtube video into iframe. Sets width too 100% of the video card and sets width to 80% so it doesn't spill over into other cards.
            videoTitle.textContent = "Similar video from youtube based on your selection: " + data.items[0].snippet.title;
            videoDisplay.src = youtubeURL + data.items[0].id.videoId;
            videoDisplay.width = "100%";
            videoDisplay.height = "80%";

        })
}

// 