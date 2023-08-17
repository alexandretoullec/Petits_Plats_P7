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
    const ustensilArray = new DataFactory(recipes, "ustensil");
    const applianceArray = new DataFactory(recipes, "appliance");

    //show the ingredient list

    this.$ingredientListContainer.innerHTML = ingredientArray
      .map((ingredient) => {
        // console.log(ingredient);
        const template = new MenuCard(ingredient).createListCard();
        return template;
      })
      .join("");

    // show the appliance list

    this.$applianceListContainer.innerHTML = applianceArray
      .map((appliance) => {
        const template = new MenuCard(appliance).createListCard();
        return template;
      })
      .join("");

    // show the ustensil list
    this.$ustensilsListContainer.innerHTML = ustensilArray
      .map((ustensil) => {
        const template = new MenuCard(ustensil).createListCard();
        return template;
      })
      .join("");
  }
}

const app = new App();
app.Main();
