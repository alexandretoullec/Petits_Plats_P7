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

    // Call Recipe Object

    const templateIngredientList = new Recipe(recipes);

    // Call factory pattern allows to change array source according to type
    const ingredientArray = new DataFactory(recipes, "ingredient");

    this.$ingredientListContainer.innerHTML = ingredientArray
      .map((ingredient) => {
        console.log(ingredient);
        const template = new MenuCard(ingredient).createListCard();
        return template;
      })
      .join("");

    this.$applianceListContainer.innerHTML =
      templateIngredientList.UniqueAppliance;

    // this.$ustensilsListContainer.innerHTML =
    //   templateIngredientList.UniqueUstensil;
  }
}

const app = new App();
app.Main();
