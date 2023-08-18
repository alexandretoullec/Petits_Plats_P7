//initialisation du tableau de tags
const tagArraySearch = [];

//initialisation du tableau issues des données de recettes
let recipeArray = [];

const recipeIngredients = new Recipe(recipes).UniqueIngredients;
const recipeAppliances = new Recipe(recipes).UniqueAppliance;
const recipeUstensils = new Recipe(recipes).UniqueUstensil;

recipeArray = [...recipeIngredients, ...recipeAppliances, ...recipeUstensils];

// console.log(recipeArray);

// // add event qui ajoute dans le tableau tag l'élément cliqué
// document.querySelectorAll(".dropdown-content").forEach((tag) => {
//   tag.addEventListener("click", (e) => {
//     const tagValue = e.target.textContent;
//     // console.log(tagValue);
//     tagArraySearch.push(tagValue);
//     // console.log(tagArraySearch);
//   });
// });

// // add event qui retire dans le tableau tag l'élément cliqué
// document.querySelectorAll(".tag-container").forEach((tag) => {
//   console.log(tag);
//   tag.addEventListener("click", (e) => {
//     const tagText = e.target.textContent;
//     // console.log(tagText);
//     const index = tagArraySearch.indexOf(tagText);

//     if (index !== -1) {
//       tagArraySearch.splice(index, 1);
//     }
//     console.log(tagArraySearch);
//   });
// });

// document.querySelectorAll(".tag-card__closeBtn").forEach((closeBtn) => {
//   closeBtn.addEventListener("click", (e) => {
//     const tagCard = e.target.closest(".tag-card");
//     if (tagCard) {
//       const tagText = tagCard.querySelector(".tag-card__text").textContent;
//       const index = tagArraySearch.indexOf(tagText);

//       if (index !== -1) {
//         tagArraySearch.splice(index, 1);
//         tagCard.parentNode.removeChild(tagCard); // Retire la carte de tag du DOM
//       }

//       console.log(tagArraySearch);
//     }
//   });
// });
