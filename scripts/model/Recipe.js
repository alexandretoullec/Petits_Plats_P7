class Recipe {
  constructor(data) {
    this._id = data.id;
    this._image = data.image;
    this._name = data.name;
    this._time = data.time;
    this._description = data.description;
    this._ingredients = data.ingredients;
    this._ingredientName = data.ingredients.ingredient;
    this._ingredientQuantity = data.ingredients.qunatity;
    this._ingredientUnit = data.ingredients.unit;
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

  get ingredientName() {
    return this._ingredientName;
  }
  get ingredientQuantity() {
    return this._ingredientQuantity;
  }
  get ingredientUnit() {
    return this._ingredientUnit;
  }

  get ingredient() {
    const $ingredientswrapper = document.createElement("div");
    $ingredientswrapper.classList.add("ingredient-cont");

    const ingredient = `    
      <p class="ingredient">${this._ingredientsName}</p>
      <p class="quantite">${this._ingredientsQuantity} ${this._ingredientsUnit}</p>    
    `;

    return ($ingredientswrapper.innerHTML = ingredient);
  }
}
