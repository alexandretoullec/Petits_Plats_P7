// function searchRecipes(searchTerm) {
//   const lowerSearchTerm = searchTerm
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .toLowerCase();

//   this.filteredRecipes = [];

//   for (let i = 0; i < this.recipesRenderAll.length; i++) {
//     const recipe = this.recipesRenderAll[i];
//     const recipeName = recipe.name
//       .normalize("NFD")
//       .replace(/[\u0300-\u036f]/g, "")
//       .toLowerCase();
//     const recipeDescription = recipe.description
//       .normalize("NFD")
//       .replace(/[\u0300-\u036f]/g, "")
//       .toLowerCase();
//     let foundInIngredients = false;

//     for (let j = 0; j < recipe.ingredients.length; j++) {
//       const ingredientName = recipe.ingredients[j].ingredient
//         .normalize("NFD")
//         .replace(/[\u0300-\u036f]/g, "")
//         .toLowerCase();
//       if (ingredientName.includes(lowerSearchTerm)) {
//         foundInIngredients = true;
//         break;
//       }
//     }

//     if (
//       recipeName.includes(lowerSearchTerm) ||
//       recipeDescription.includes(lowerSearchTerm) ||
//       foundInIngredients
//     ) {
//       // Vérifiez si la recette n'est pas déjà dans le tableau filteredRecipes
//       if (!this.filteredRecipes.includes(recipe)) {
//         this.filteredRecipes.push(recipe);
//       }
//     }
//   }}

//   if (this.filteredRecipes.length === 0) {
//     this.$recipiesContainer.innerHTML = `Aucune recette ne contient "${searchTerm}".`;
//   } else {
//     this.showRecipe(this.filteredRecipes);
//   }
// }

// filteredLists(filteredRecipes) {
//   const filteredIngredients = new DataFactory(filteredRecipes, "ingredient");
//   const filteredAppliances = new DataFactory(filteredRecipes, "appliance");
//   const filteredUstensils = new DataFactory(filteredRecipes, "ustensil");

//   // Mettre à jour les propriétés ingredientArray, applianceArray et ustensilArray avec les nouvelles valeurs filtrées
//   const ingredientArray = Array.from(filteredIngredients);
//   const applianceArray = Array.from(filteredAppliances);
//   const ustensilArray = Array.from(filteredUstensils);

//   // console.log(this.ingredientArray);

//   // Mettre à jour les listes d'affichage dans le DOM
//   this.$ingredientListContainer.innerHTML = this.renderList(ingredientArray);
//   this.$applianceListContainer.innerHTML = this.renderList(applianceArray);
//   this.$ustensilsListContainer.innerHTML = this.renderList(ustensilArray);
// }

// const allUstensils = new Set();

// if (recipe.ustensils) {
//   recipe.ustensils.forEach((ustensil) => {
//     const normalizedUstensil = ustensil
//       ? ustensil
//           .normalize("NFD")
//           .replace(/[\u0300-\u036f]/g, "")
//           .toLowerCase()
//       : "";

//     if (normalizedUstensil) {
//       allUstensils.add(normalizedUstensil);
//     }
//   });
// }

// const allAppliance = new Set();

// if (recipe.appliance) {
//   const normalizedAppliance = recipe.appliance
//     ? recipe.appliance
//         .normalize("NFD")
//         .replace(/[\u0300-\u036f]/g, "")
//         .toLowerCase()
//     : "";

//   if (normalizedAppliance) {
//     allAppliance.add(normalizedAppliance);
//   }
// }

// Array.from(allUstensils).includes(lowerSearchTerm) ||
// Array.from(allAppliance).includes(lowerSearchTerm)
