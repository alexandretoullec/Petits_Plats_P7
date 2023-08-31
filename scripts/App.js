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
    this.$numRecipies = document.querySelector(".selec__num-recipies__text");
    this._recipes = recipes;
    this.tagArraySearch = [];
    this.filteredRecipes = [];
    this.recipesRenderAll = this._recipes.map((recipe) => new Recipe(recipe));
    this._allIngredients = [];
    this.recipesRender = [];

    //dom pour algorithme de recherche
    this.searchInput = document.querySelector(".form-control");

    // ecouter l'événement input
    this.searchInput.addEventListener(
      "input",
      this.handleSearchInput.bind(this)
    );

    //using factory pattern to change the type of datas
    this.ingredientArray = new DataFactory(recipes, "ingredient");
    this.ustensilArray = new DataFactory(recipes, "ustensil");
    this.applianceArray = new DataFactory(recipes, "appliance");
  }

  async handleSearchInput(event) {
    const searchTerm = await event.target.value.trim(); // Obtenir le terme de recherche sans espaces inutiles

    if (searchTerm.length >= 3) {
      this.$recipiesContainer.innerHTML = "";

      this.filteredLists(this.filteredRecipes);
      console.log(this.recipesRender);
      this.searchRecipes(searchTerm, this.recipesRender);

      this.showRecipe(this.filteredRecipes);
      console.log(this.filteredRecipes);

      // return;
    } else {
      this.$recipiesContainer.innerHTML = "";
      this.searchRecipes(searchTerm, this.recipesRenderAll);
      this.showRecipe(this.recipesRenderAll);
      // console.log(this.recipesRenderAll);
      this.filteredLists(this.recipesRenderAll);
    }
  }

  searchRecipes(searchTerm, filteredRecipes) {
    this.filteredRecipes = filteredRecipes.filter((recipe) => {
      const lowerSearchTerm = searchTerm
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      const recipeName = recipe.name
        ? recipe.name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
        : "";

      const recipeDescription = recipe.description
        ? recipe.description
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
        : "";

      const allIngredients = []; // Array to hold all ingredient names

      if (recipe.ingredients) {
        recipe.ingredients.forEach((ingredientObj) => {
          const ingredientName = ingredientObj.ingredient
            ? ingredientObj.ingredient
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
            : "";

          if (ingredientName && !allIngredients.includes(ingredientName)) {
            allIngredients.push(ingredientName);
          }
        });
      }

      if (this.filteredRecipes.length === 0) {
        this.$recipiesContainer.innerHTML = `Aucune recette ne contient "${searchTerm}".`;
      }

      return (
        recipeName.includes(lowerSearchTerm) ||
        recipeDescription.includes(lowerSearchTerm) ||
        allIngredients.includes(lowerSearchTerm)
      );
    });
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

    // console.log(this.tagArraySearch);
    // tag différent de vide alors filtre

    this.recipesRender = this.filteredRecipes.map(
      (recipe) => new Recipe(recipe)
    );
    this.filteredLists(this.filteredRecipes);
    this.showRecipe(this.recipesRender);
    console.log(this.recipesRender[0]);
    console.log(this.filteredRecipes[0]);
  }

  filteredLists(filteredRecipes) {
    const filteredIngredients = new Set();
    const filteredAppliances = new Set();
    const filteredUstensils = new Set();

    filteredRecipes.forEach((recipe) => {
      if (recipe.ingredients) {
        recipe.ingredients.forEach((ingredient) => {
          const ingredientName = ingredient.ingredient
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

          filteredIngredients.add(ingredientName);
        });
      }

      if (recipe.appliance) {
        const appliance = recipe.appliance
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        filteredAppliances.add(appliance);
      }

      if (recipe.ustensils) {
        recipe.ustensils.forEach((ustensil) => {
          const normalizedUstensil = ustensil
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

          filteredUstensils.add(normalizedUstensil);
        });
      }
    });

    const ingredientArray = Array.from(filteredIngredients);
    const applianceArray = Array.from(filteredAppliances);
    const ustensilArray = Array.from(filteredUstensils);

    this.$ingredientListContainer.innerHTML = this.renderList(ingredientArray);
    this.$applianceListContainer.innerHTML = this.renderList(applianceArray);
    this.$ustensilsListContainer.innerHTML = this.renderList(ustensilArray);

    const listItems = this.$selectContainer.querySelectorAll(".listItem");
    listItems.forEach((listItem) => {
      listItem.addEventListener(
        "click",
        this.handleListClick.bind(this, listItem)
      );
    });
  }

  showRecipe(data) {
    data.forEach((recipe) => {
      const templateCard = new recipeCard(recipe);

      this.$recipiesContainer.appendChild(templateCard.createrecipeCard());
    });
    this.$numRecipies.innerHTML = `${data.length} recettes`;
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
    // this.showRecipe(this.recipesRenderAll);
    // console.log(this.recipesRenderAll);
    this.updateFilteredRecipes();
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

        // console.log(this.tagArraySearch);
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
        console.log(tagArraySearch);
        // console.log(this.filteredRecipes);
        if (this.tagArraySearch.length === 0) {
          console.log("je suis la");

          this.searchRecipes(searchTerm, this.recipesRender);

          this.showRecipe(this.filteredRecipes);
        }
      }
    });

    const searchTerm = this.searchInput.value.trim();

    return tagContainer.append(dom);
  }
}

const app = new App();
app.Main();
