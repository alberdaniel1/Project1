// august starts here
//grab textbox user entry
var API = "5VkpQWeFYgp2DIB7mOyEgg==WvtYDpjrBR0rVt5X";

    
var letsEat = document.getElementById("letsEat"); 

letsEat.addEventListener("click", function () {
        var textboxEl = document.getElementById("dishEntryBox").value;
        console.log(textboxEl)


        var query = textboxEl;
        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/recipe?query=' + query,
            headers: { 'X-Api-Key': API},
            contentType: 'application/json',
            success: function(result) {
                console.log(result);
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        });



    });


// Luc's work here
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
