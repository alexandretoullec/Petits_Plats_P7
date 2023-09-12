/* eslint-disable no-undef */
class App {
  constructor() {
    // Selecting DOM elements
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

    // Event listener for the search bar
    this.searchInput = document.querySelector(".form-control");

    this.searchTerm = this.searchInput.value.trim();

    // ecouter l'événement input
    this.searchInput.addEventListener(
      "input",
      this.handleSearchInput.bind(this)
    );

    // Using the Factory pattern to change data types
    this.ingredientArray = new DataFactory(recipes, "ingredient");
    this.ustensilArray = new DataFactory(recipes, "ustensil");
    this.applianceArray = new DataFactory(recipes, "appliance");
  }

  /**
   * Event handler function for input in the search bar.
   * @param {Event} event - The event object representing the input event.
   */
  async handleSearchInput(event) {
    const searchTerm = event.target.value.trim(); // Obtenir le terme de recherche sans espaces inutiles
    if (this.tagArraySearch.length !== 0 && searchTerm.length < 3) {
      console.log("here");
      this.filteredRecipes = this.recipesRenderAll;
      this.updateFilteredRecipes(this.filteredRecipes);
      this.filteredLists(this.filteredRecipes);
      this.showRecipe(this.filteredRecipes);
    } else if (searchTerm.length >= 3) {
      this.filteredRecipes = this.recipesRenderAll;
      this.$recipiesContainer.innerHTML = "";
      this.searchRecipes(searchTerm, this.filteredRecipes);
      this.updateFilteredRecipes(this.filteredRecipes);
      this.filteredLists(this.filteredRecipes);
      this.showRecipe(this.filteredRecipes);
    } else {
      this.$recipiesContainer.innerHTML = "";
      this.updateFilteredRecipes(this.recipesRenderAll);
      this.showRecipe(this.recipesRenderAll);
      this.filteredLists(this.recipesRenderAll);
    }
  }

  /**
   * Function to search for recipes based on the search term.
   * @param {string} searchTerm - The search term entered by the user.
   * @param {Array} filteredRecipes - The list of filtered recipes.
   */

  searchRecipes(searchTerm, filteredRecipes) {
    const lowerSearchTerm = searchTerm
      .toLowerCase()
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const matchingRecipes = [];

    for (let i = 0; i < filteredRecipes.length; i++) {
      const recipe = filteredRecipes[i];

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

      const allIngredients = [];

      if (recipe.ingredients) {
        for (let j = 0; j < recipe.ingredients.length; j++) {
          const ingredientObj = recipe.ingredients[j];
          const ingredientName = ingredientObj.ingredient
            ? ingredientObj.ingredient
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
            : "";

          if (ingredientName && !allIngredients.includes(ingredientName)) {
            allIngredients.push(ingredientName);
          }
        }
      }

      if (
        recipeName.includes(lowerSearchTerm) ||
        recipeDescription.includes(lowerSearchTerm) ||
        allIngredients.includes(lowerSearchTerm)
      ) {
        matchingRecipes.push(recipe);
      }
    }

    this.filteredRecipes = matchingRecipes;

    if (this.filteredRecipes.length === 0) {
      this.$recipiesContainer.innerHTML = `Aucune recette ne contient "${searchTerm}".`;
    }
  }

  /**
   * Updates the filtered recipes based on selected filter tags.
   * @param {Array} searchRecipes - The list of recipes to filter.
   */

  async updateFilteredRecipes(searchRecipes) {
    this.filteredRecipes = searchRecipes.filter((recipe) => {
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
  }

  /**
   * Filters and displays lists of ingredients, appliances, and ustensils based on the selected recipes.
   * @param {Array} filteredRecipes - The list of filtered recipes to extract data from.
   */

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

  /**
   * Renders and displays recipe cards in the specified container.
   * @param {Array} data - The list of recipes to be displayed.
   */

  showRecipe(data) {
    this.$recipiesContainer.innerHTML = "";
    const searchTerm = this.searchInput.value.trim();
    data.forEach((recipe) => {
      const templateCard = new recipeCard(recipe);

      this.$recipiesContainer.appendChild(templateCard.createrecipeCard());
    });
    this.$numRecipies.innerHTML = `${data.length} recettes`;

    if (data.length === 0) {
      this.$recipiesContainer.innerHTML = `Aucune recette ne contient "${searchTerm}" vous pouvez chercher «
      tarte aux pommes », « poisson », etc.`;
    }
  }

  /**
   * Event handling method for clicking on list items.
   * @param {Element} listItem - The clicked list item element.
   * @param {Event} e - The click event object.
   */

  // click event method for lists
  handleListClick(listItem, e) {
    e.preventDefault();
    const tagContainer = document.querySelector(".tag-container");
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
      const searchTerm = this.searchInput.value.trim();
      if (tagCard) {
        const tagText = tagCard.querySelector(".tag-card__text").textContent;
        const index = this.tagArraySearch.indexOf(tagText);
        if (index !== -1) {
          this.tagArraySearch.splice(index, 1);
        }
        e.target.closest(".tag-card").remove();
        this.updateFilteredRecipes(this.recipesRenderAll);

        if (this.tagArraySearch.length !== 0) {
          this.$recipiesContainer.innerHTML = "";
          this.updateFilteredRecipes(this.filteredRecipes);
          this.showRecipe(this.filteredRecipes);
          this.filteredLists(this.filteredRecipes);

          // this.searchRecipes(searchTerm, this.filteredRecipes);
        } else {
          this.$recipiesContainer.innerHTML = "";
          this.searchRecipes(searchTerm, this.filteredRecipes);
          this.filteredLists(this.filteredRecipes);
          this.showRecipe(this.filteredRecipes);
        }
      }
    });

    return tagContainer.append(dom);
  }

  /**
   * Generates HTML content for a list of items.
   * @param {Array} items - The list of items to be included in the generated HTML.
   * @returns {string} - The HTML content representing the list.
   */

  renderList(items) {
    return items
      .map((item) => {
        const template = new MenuCard(item).createListCard();
        return template;
      })
      .join("");
  }

  /**
   * The main function that initializes the application and sets up event listeners.
   */

  async Main() {
    this.updateFilteredRecipes(this.recipesRenderAll);
    this.showRecipe(this.recipesRenderAll);
    this.filteredLists(this.recipesRenderAll);

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

    // add event qui ajoute dans le tableau tag l'élément cliqué
    document.querySelectorAll(".dropdown-content").forEach((tag) => {
      tag.addEventListener("click", (e) => {
        const tagValue = e.target.textContent;

        if (tagValue) {
          this.tagArraySearch.push(tagValue);
        }
        this.updateFilteredRecipes(this.filteredRecipes);
        this.showRecipe(this.filteredRecipes);
        this.filteredLists(this.filteredRecipes);
      });
    });
  }
}

const app = new App();
app.Main();
