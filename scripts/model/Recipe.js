/* eslint-disable no-unused-vars */
/**
 * @param {Array} datas from recipes .js
 */

class Recipe {
  constructor(data) {
    this._data = data;
    this._id = data.id;
    this._image = data.image;
    this._name = data.name;
    this._time = data.time;
    this._description = data.description;
    this._ingredients = data.ingredients;
    this._ustensils = data.ustensils;
    this._allIngredients = [];
    this._appliance = data.appliance;
  }

  get id() {
    return this._id;
  }

  get image() {
    return `assets/recipies/${this._image}`;
  }

  get name() {
    return this._name;
  }

  get time() {
    return `${this._time}min`;
  }

  get description() {
    if (this._description.length > 175) {
      return this._description.substr(0, 175);
    }
    return this._description;
  }

  get ingredients() {
    return this._ingredients;
  }

  get appliance() {
    return this._appliance;
  }

  get ustensils() {
    return this._ustensils;
  }

  get UniqueIngredients() {
    this._data.forEach((recipe) => {
      recipe.ingredients.forEach((ingredientObj) => {
        // replace accent to none
        const ingredientName = ingredientObj.ingredient
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();

        if (ingredientName && !this._allIngredients.includes(ingredientName)) {
          this._allIngredients.push(ingredientName);
        }
      });
    });

    return this._allIngredients;
  }

  get UniqueAppliance() {
    this._allAppliances = new Set();

    this._data.forEach((recipe) => {
      const appliance = recipe.appliance
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      this._allAppliances.add(appliance);
    });

    return Array.from(this._allAppliances);
  }

  get UniqueUstensil() {
    //autre méthode pour enlever les doublons
    const allUstensils = new Set();

    this._data.forEach((recipe) => {
      const ustensils = recipe.ustensils;
      if (ustensils) {
        ustensils.forEach((ustensil) => {
          allUstensils.add(
            ustensil
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
          );
        });
      }
    });

    return Array.from(allUstensils);
  }

  get ingredient() {
    const ingr = this._ingredients.map(
      (ingredient) => `
      <div class="ingredient-cont">
        <p class="ingredient">${ingredient.ingredient}</p>
        <p class="quantite">${ingredient.quantity ? ingredient.quantity : ""} ${
        ingredient.unit ? ingredient.unit : ""
      }</p>
      </div>`
    );

    return ingr.join(""); // Join the array of HTML strings into a single string
  }
}
