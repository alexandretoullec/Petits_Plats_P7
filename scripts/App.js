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

    this.recipesRender = "";

    //using factory pattern to change the type of datas
    this.ingredientArray = new DataFactory(recipes, "ingredient");
    this.ustensilArray = new DataFactory(recipes, "ustensil");
    this.applianceArray = new DataFactory(recipes, "appliance");
  }

  async updateFilteredRecipes() {
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

    console.log(this.tagArraySearch);
    // tag différent de vide alors filtre
    if (this.tagArraySearch.length === 0) {
      this.showRecipe(this.recipesRenderAll);
    } else {
      this.recipesRender = this.filteredRecipes.map(
        (recipe) => new Recipe(recipe)
      );
      this.showRecipe(this.recipesRender);
      console.log(this.recipesRender);
      this.filteredLists(this.filteredRecipes);
    }

    const listItems = this.$selectContainer.querySelectorAll(".listItem");
    listItems.forEach((listItem) => {
      listItem.addEventListener(
        "click",
        this.handleListClick.bind(this, listItem)
      );
    });
  }

  async filteredLists(filteredRecipes) {
    const filteredIngredients = new DataFactory(filteredRecipes, "ingredient");
    const filteredAppliances = new DataFactory(filteredRecipes, "appliance");
    const filteredUstensils = new DataFactory(filteredRecipes, "ustensil");

    // Mettre à jour les propriétés ingredientArray, applianceArray et ustensilArray avec les nouvelles valeurs filtrées
    this.ingredientArray = Array.from(filteredIngredients);
    this.applianceArray = Array.from(filteredAppliances);
    this.ustensilArray = Array.from(filteredUstensils);

    // Mettre à jour les listes d'affichage dans le DOM
    this.$ingredientListContainer.innerHTML = this.renderList(
      this.ingredientArray
    );
    this.$applianceListContainer.innerHTML = this.renderList(
      this.applianceArray
    );
    this.$ustensilsListContainer.innerHTML = this.renderList(
      this.ustensilArray
    );
  }

  showRecipe(data) {
    data.forEach((recipe) => {
      const templateCard = new recipeCard(recipe);

      this.$recipiesContainer.appendChild(templateCard.createrecipeCard());
    });
  }

  renderList(items) {
    return items
      .map((item) => {
        // console.log(ingredient);
        const template = new MenuCard(item).createListCard();
        return template;
      })
      .join("");
  }

  async Main() {
    this.showRecipe(this.recipesRenderAll);

    // Call Recipe Object

    // Call factory pattern allows to change array source according to type

    //show the ingredient list
    this.$ingredientListContainer.innerHTML = this.renderList(
      this.ingredientArray
    );

    // show the appliance list

    this.$applianceListContainer.innerHTML = this.renderList(
      this.applianceArray
    );

    // show the ustensil list
    this.$ustensilsListContainer.innerHTML = this.renderList(
      this.ustensilArray
    );

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

        if (tagValue) {
          this.tagArraySearch.push(tagValue);
        }
        this.updateFilteredRecipes();

        console.log(this.tagArraySearch);
      });
    });
  }

  // Méthode de gestion d'événements de clic pour les listes
  handleListClick(listItem, e) {
    e.preventDefault();

    // const listName = listItem.textContent;
    const tagContainer = document.querySelector(".tag-container");
    // console.log("Appliance cliquée :", listName);

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
