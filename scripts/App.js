class App {
  constructor() {
    this.$recipiesContainer = document.querySelector(".recipies-container");
    this.$selectContainer = document.querySelector(".selec__options");
    this.$ingredientListContainer = document.querySelector(
      ".ingredientList-container"
    );
    this.$applianceListContainer = document.querySelector(
      ".appliance-container"
    );
    this.$ustensilsListContainer = document.querySelector(
      ".ustensils-container"
    );
    this._recipes = recipes;
  }

  async Main() {
    const recipesRender = this._recipes.map((recipe) => new Recipe(recipe));
    recipesRender.forEach((recipe) => {
      const templateCard = new recipeCard(recipe);

      this.$recipiesContainer.appendChild(templateCard.createrecipeCard());
    });

    // Call Recipe Object

    const templateIngredientList = new Recipe(recipes);

    // Call factory pattern allows to change array source according to type
    const ingredientArray = new DataFactory(recipes, "ingredient");
    const ustensilArray = new DataFactory(recipes, "ustensil");
    const applianceArray = new DataFactory(recipes, "appliance");
    // console.log(ingredientArray);
    //show the ingredient list

    const listIngredient = ingredientArray
      .map((ingredient) => {
        // console.log(ingredient);
        const template = new MenuCard(ingredient).createListCard();
        return template;
      })
      .join("");

    // console.log(listIngredient);

    this.$ingredientListContainer.innerHTML = listIngredient;

    // show the appliance list

    this.$applianceListContainer.innerHTML = applianceArray
      .map((appliance) => {
        const template = new MenuCard(appliance).createListCard();
        return template;
      })
      .join("");

    // show the ustensil list
    this.$ustensilsListContainer.innerHTML = ustensilArray
      .map((ustensil) => {
        const template = new MenuCard(ustensil).createListCard();
        return template;
      })
      .join("");

    // Ajouter des gestionnaires d'événements de clic à chaque élément
    const listItems = this.$selectContainer.querySelectorAll(".listItem");
    listItems.forEach((listItem) => {
      listItem.addEventListener(
        "click",
        this.handleApplianceClick.bind(this, listItem)
      );
    });
  }

  // Méthode de gestion d'événements de clic pour les listes
  handleApplianceClick(listItem, e) {
    e.preventDefault();

    const applianceName = listItem.textContent;
    const tagContainer = document.querySelector(".tag-container");
    console.log("Appliance cliquée :", applianceName);
    // Faites ce que vous voulez ici en réponse au clic sur l'élément d'appareil
    const dom = document.createElement("div");
    dom.classList.add("tag-card");
    dom.innerHTML = `        
            <div class="tag-card__text">${listItem.textContent}</div>
            <button class="tag-card__closeBtn">
                <i class="fa-solid fa-xmark"></i>
            </button>      
        `;
    dom
      .querySelector(".tag-card__closeBtn")
      .addEventListener(
        "click",
        (e) => (e.target.closest(".tag-card").style.display = "none")
      );

    return tagContainer.append(dom);
  }
}

const app = new App();
app.Main();
