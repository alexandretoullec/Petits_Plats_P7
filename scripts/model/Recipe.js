class Recipe {
  constructor(data) {
    this._id = data.id;
    this._image = data.image;
    this._name = data.name;
    this._time = data.time;
    this._description = data.description;
    this._ingredients = data.ingredients;
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

  // get ingredients() {
  //   return this._ingredients;
  // }

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
