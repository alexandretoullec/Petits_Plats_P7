class App {
  constructor() {
    this.$recipiesContainer = document.querySelector(".recipies-container");
    this.$ingredientListContainer = document.querySelector(
      ".ingredientList-container"
    );
    this.$applianceListContainer = document.querySelector(
      ".appliance-container"
    );
    this.$ustensilsListContainer = document.querySelector(
      ".ustensils-container"
    );
    this._recipes = recipes;
  }

  async Main() {
    const recipesRender = this._recipes.map((recipe) => new Recipe(recipe));
    recipesRender.forEach((recipe) => {
      const templateCard = new recipeCard(recipe);

      this.$recipiesContainer.appendChild(templateCard.createrecipeCard());
    });

    const templateIngredientList = new Recipe(recipes);
    this.$ingredientListContainer.innerHTML =
      templateIngredientList.UniqueIngredients;
    templateIngredientList.renderIngerdientCard();

    this.$applianceListContainer.innerHTML =
      templateIngredientList.UniqueAppliance;

    this.$ustensilsListContainer.innerHTML =
      templateIngredientList.UniqueUstensil;
  }
}

const app = new App();
app.Main();
