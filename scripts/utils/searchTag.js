/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//initialisation du tableau de tags
const tagArraySearch = [];

//initialisation du tableau issues des données de recettes
let recipeArray = [];

const recipeIngredients = new Recipe(recipes).UniqueIngredients;
const recipeAppliances = new Recipe(recipes).UniqueAppliance;
const recipeUstensils = new Recipe(recipes).UniqueUstensil;

recipeArray = [...recipeIngredients, ...recipeAppliances, ...recipeUstensils];
