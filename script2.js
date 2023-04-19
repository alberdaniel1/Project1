// august starts here
//grab textbox user entry
var API = "5VkpQWeFYgp2DIB7mOyEgg==WvtYDpjrBR0rVt5X";
var displayRecipeCardsEl = document.getElementById("displayRecipeCard");
var letsEat = document.getElementById("letsEat");


letsEat.addEventListener("click", function () {
    var textboxEl = document.getElementById("dishEntryBox").value;
    // adding the user's entered text from the texbox to localStorage
    localStorage.setItem("recipes", textboxEl);
    // console.log(localStorage)
    var query = textboxEl;
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/recipe?query=' + query,
        headers: { 'X-Api-Key': API },
        contentType: 'application/json',
        success: function (result) {
            // console.log(result)
            // Clear any existing recipes from the list
            displayRecipeCardsEl.innerHTML = "";
            
            // Loop through each recipe and create a new list item
            for (let i = 0; i < result.length; i++) {
                console.log(result[i].title);
                var recipeName = result[i].title;
                var recipeIngredients = result[i].ingredients;
                var first50Chars = recipeIngredients.substring(0, 50);
                var listRecipes = document.createElement("li")
                listRecipes.innerHTML = recipeName + "<br>" + first50Chars + "....";
                displayRecipeCardsEl.appendChild(listRecipes);
                
            }
            showLastRecipes();
     
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });

    // Get the saved recipes from local storage
    
    function showLastRecipes() {
        
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
                // console.log("Your saved recipes array is " + recipeListItem.value)
                
                // Add an event listener to the list item
                recipeListItem.addEventListener("click", function () {
                    // console.log(this.innerText);
                });
                
                recipeList.appendChild(recipeListItem);
            }
        }
    }
        
    
    
    
});
          

  


// Luc's work here
// Adding var select for second card and for video display area
var recipeCard = document.getElementById("card2")
var video = document.getElementById("throwAway")

// Prints recipe card info to video card info
// Proof of concept/for testing purposes currently, need youtube API and recipe API added
recipeCard.addEventListener("click", function () {
    var selectedRecipe = event.target;
    var selectedRecipeText = selectedRecipe.innerHTML;
    video.textContent = selectedRecipeText;
    return;
})
