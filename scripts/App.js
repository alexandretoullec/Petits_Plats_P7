// class App {
//   constructor(recipes) {
//     this.$recipiesContainer = document.querySelector(".recipies-container");
//     this._recipes = recipes;
//   }

//   async Main() {
//     const recipesData = await this._recipes;
//     // const recipes = recipesData.forEach((recipe) => console.log(recipe.name));

//     console.log(recipesData);
//   }
// }

// const app = new App();
// app.Main(recipes);

const $recipiesContainer = document.querySelector(".recipies-container");
const recipesRender = recipes.map((recipe) => new Recipe(recipe));

recipesRender.forEach((recipe) => {
  const templateCard = new recipeCard(recipe);

  $recipiesContainer.appendChild(templateCard.createrecipeCard());
});

const $ingredientListContainer = document.querySelector(
  ".ingredientList-container"
);
const templateIngredientList = new Recipe(recipes);
$ingredientListContainer.innerHTML = templateIngredientList.UniqueIngredients;

const $applianceListContainer = document.querySelector(".appliance-container");
$applianceListContainer.innerHTML = templateIngredientList.UniqueAppliance;

const $ustensilsListContainer = document.querySelector(".ustensils-container");
$ustensilsListContainer.innerHTML = templateIngredientList.UniqueUstensil;
