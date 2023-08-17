class MenuCard {
  constructor(filter) {
    this._filter = filter;
  }

  createListCard() {
    const ingredientListCard = `
            <a class="listItem" href="#">${this._filter}</a>
        `;

    return ingredientListCard;
  }
}
