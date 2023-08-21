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
    this.tagArraySearch = [];
    this.filteredRecipes = [];
    this.recipesRenderAll = this._recipes.map((recipe) => new Recipe(recipe));
  }

  updateFilteredRecipes() {
    this.filteredRecipes = recipes.filter((recipe) => {
      const ingredients = recipe.ingredients.map(
        (ingredient) => ingredient.ingredient
      );
      const appliances = [recipe.appliance];
      const ustensils = recipe.ustensils;

      const filterList = [...ingredients, ...appliances, ...ustensils];

      const lowercaseFilterList = filterList.map((item) =>
        item
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
      );

      return this.tagArraySearch.every((tag) =>
        lowercaseFilterList.includes(tag)
      );
    });

    this.$recipiesContainer.innerHTML = "";

    let recipesRender = "";
    console.log(this.tagArraySearch);
    // tag différent de vide alors filtre
    if (this.tagArraySearch.length === 0) {
      this.showRecipe(this.recipesRenderAll);
    } else {
      recipesRender = this.filteredRecipes.map((recipe) => new Recipe(recipe));
      this.showRecipe(recipesRender);
    }
  }

  showRecipe(data) {
    data.forEach((recipe) => {
      const templateCard = new recipeCard(recipe);

      this.$recipiesContainer.appendChild(templateCard.createrecipeCard());
    });
  }

  async Main() {
    this.showRecipe(this.recipesRenderAll);

    // Call Recipe Object

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
        this.handleListClick.bind(this, listItem)
      );
    });

    /**********************************************
     *
     *
     *   */

    // add event qui ajoute dans le tableau tag l'élément cliqué
    document.querySelectorAll(".dropdown-content").forEach((tag) => {
      tag.addEventListener("click", (e) => {
        const tagValue = e.target.textContent;
        this.tagArraySearch.push(tagValue);
        // console.log(this.tagArraySearch);
        this.updateFilteredRecipes();
        console.log(this.filteredRecipes);
      });
    });
  }

  // Méthode de gestion d'événements de clic pour les listes
  handleListClick(listItem, e) {
    e.preventDefault();

    const listName = listItem.textContent;
    const tagContainer = document.querySelector(".tag-container");
    // console.log("Appliance cliquée :", listName);
    // Faites ce que vous voulez ici en réponse au clic sur l'élément d'appareil
    const dom = document.createElement("div");
    dom.classList.add("tag-card");
    //create tag
    dom.innerHTML = `        
            <div class="tag-card__text">${listItem.textContent}</div>
            <button class="tag-card__closeBtn">
                <i class="fa-solid fa-xmark"></i>
            </button>      
        `;

    //remove card from dom and from tagArraySearch
    dom.querySelector(".tag-card__closeBtn").addEventListener("click", (e) => {
      const tagCard = e.target.closest(".tag-card");
      if (tagCard) {
        const tagText = tagCard.querySelector(".tag-card__text").textContent;
        const index = this.tagArraySearch.indexOf(tagText);
        if (index !== -1) {
          this.tagArraySearch.splice(index, 1);
        }

        e.target.closest(".tag-card").remove();
        // console.log(this.tagArraySearch);
        this.updateFilteredRecipes();
        console.log(this.filteredRecipes);
      }
    });

    return tagContainer.append(dom);
  }
}

const app = new App();
app.Main();
