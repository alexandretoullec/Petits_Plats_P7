class recipeCard {
  constructor(recipe) {
    this._recipe = recipe;
  }

  createrecipeCard() {
    const $wrapper = document.createElement("div");
    $wrapper.classList.add("recipes-card");

    const recipeCard = `
    
          <div class="recipes-card__img">
            <p class="duree">${this._recipe.time}</p>
            <img src="${this._recipe.image}" alt="recette01" />
          </div>
          <div class="p-4 recipes-card__desc">
            <h2>${this._recipe.name}</h2>
            <div class="recipes-card__desc__explaination">
              <h3>RECETTE</h3>
              <p>
              ${this._recipe.description}
              </p>
            </div>
            <div class="recipes-card__desc__ingredients">
              <h3>Ingrédients</h3>
              <div class="row row-cols-2 ingredientList">
                ${this._recipe.ingredient}
                
                <div class="ingredient-cont">
                  <p class="ingredient">Lait de coco</p>
                  <p class="quantite">400 ml</p>
                </div>
                <div class="ingredient-cont">
                  <p class="ingredient">Lait de coco</p>
                  <p class="quantite">400 ml</p>
                </div>
                
              </div>
            </div>
          </div>
        
    `;

    $wrapper.innerHTML = recipeCard;
    return $wrapper;
  }
}
