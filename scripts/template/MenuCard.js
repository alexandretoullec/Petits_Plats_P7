class MenuCard {
  constructor(filter) {
    this._filter = filter;
  }

  createListCard() {
    const ingredientListCard = `
            <a href="#">${this._filter}</a>
        `;

    return ingredientListCard;
  }
}
