class ListCard {
  constructor(recipes) {
    this._recipe = recipes;
  }

  createListCard() {
    const ingredientListCard = `
            <a href="#">${this._recipe.ingredientList}</a>
        `;

    return this._recipe.UniqueIngredients;
  }
}
