// Add two API's. Ninja API recipe and youtube API

// Adding var select for second card and for video display area
var recipeCard = document.getElementById("card2")
var video = document.getElementById("throwAway")

// Prints recipe card info to video card info
// Proof of concept/for testing purposes currently, need youtube API and recipe API added
recipeCard.addEventListener("click", function(){
    var selectedRecipe = event.target;
    var selectedRecipeText = selectedRecipe.innerHTML;
    video.textContent = selectedRecipeText;
    return;
})
