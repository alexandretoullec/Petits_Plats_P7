/**
 * @param {[]} array
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
    this._allIngredients = [];
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
    const allAppliance = [];

    this._data.forEach((recipe) => {
      const appliance = recipe.appliance
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      if (appliance && !allAppliance.includes(appliance)) {
        allAppliance.push(appliance);
      }
    });

    // const applianceCard = allAppliance.map(
    //   (appliance) => `<a>${appliance}</a>`
    // );

    return allAppliance;
  }

  get UniqueUstensil() {
    // new set allow to avoid doublons
    const allUstensils = new Set();

    this._data.forEach((recipe) => {
      const ustensils = recipe.ustensils;

      if (ustensils) {
        ustensils.forEach((ustensil) => {
          allUstensils.add(ustensil);
        });
      }
    });

    const ustensilsCard = Array.from(allUstensils);

    const ustensilNoAccent = ustensilsCard.map((ustensil) =>
      ustensil
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
    );

    const ustensilNoDoublon = [];

    ustensilNoAccent.forEach((ingredient) => {
      if (ingredient && !ustensilNoDoublon.includes(ingredient)) {
        ustensilNoDoublon.push(ingredient);
      }
    });

    return ustensilNoDoublon;
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
