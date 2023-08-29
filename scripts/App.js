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
    this.recipesRender = "";

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

  handleSearchInput(event) {
    const searchTerm = event.target.value.trim(); // Obtenir le terme de recherche sans espaces inutiles

    if (searchTerm.length >= 3) {
      this.$recipiesContainer.innerHTML = "";
      // this.filteredLists(this.filteredRecipes);
      this.searchRecipes(searchTerm);
      this.showRecipe(this.filteredRecipes);
      console.log(this.filteredRecipes);

      // return;
    } else {
      this.$recipiesContainer.innerHTML = "";
      console.log(this.filteredRecipes);
      this.showRecipe(this.recipesRenderAll);
      console.log(this.recipesRenderAll);
      // this.filteredLists(this.recipesRenderAll);
    }
  }

  searchRecipes(searchTerm) {
    this.filteredRecipes = this.recipesRenderAll.filter((recipe) => {
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

      const allUstensils = new Set();

      if (recipe.ustensils) {
        recipe.ustensils.forEach((ustensil) => {
          const normalizedUstensil = ustensil
            ? ustensil
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
            : "";

          if (normalizedUstensil) {
            allUstensils.add(normalizedUstensil);
          }
        });
      }

      const allAppliance = new Set();

      if (recipe.appliance) {
        const normalizedAppliance = recipe.appliance
          ? recipe.appliance
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
          : "";

        if (normalizedAppliance) {
          allAppliance.add(normalizedAppliance);
        }
      }

      // Now check if the search term is in any of the collected properties
      return (
        recipeName.includes(lowerSearchTerm) ||
        recipeDescription.includes(lowerSearchTerm) ||
        allIngredients.includes(lowerSearchTerm) ||
        Array.from(allUstensils).includes(lowerSearchTerm) ||
        Array.from(allAppliance).includes(lowerSearchTerm)
      );
    });
  }

  // searchRecipes(searchTerm) {
  //   const lowerSearchTerm = searchTerm
  //     .normalize("NFD")
  //     .replace(/[\u0300-\u036f]/g, "")
  //     .toLowerCase();

  //   this.filteredRecipes = [];

  //   for (let i = 0; i < this.recipesRenderAll.length; i++) {
  //     const recipe = this.recipesRenderAll[i];
  //     const recipeName = recipe.name
  //       .normalize("NFD")
  //       .replace(/[\u0300-\u036f]/g, "")
  //       .toLowerCase();
  //     const recipeDescription = recipe.description
  //       .normalize("NFD")
  //       .replace(/[\u0300-\u036f]/g, "")
  //       .toLowerCase();
  //     let foundInIngredients = false;

  //     for (let j = 0; j < recipe.ingredients.length; j++) {
  //       const ingredientName = recipe.ingredients[j].ingredient
  //         .normalize("NFD")
  //         .replace(/[\u0300-\u036f]/g, "")
  //         .toLowerCase();
  //       if (ingredientName.includes(lowerSearchTerm)) {
  //         foundInIngredients = true;
  //         break;
  //       }
  //     }

  //     if (
  //       recipeName.includes(lowerSearchTerm) ||
  //       recipeDescription.includes(lowerSearchTerm) ||
  //       foundInIngredients
  //     ) {
  //       // Vérifiez si la recette n'est pas déjà dans le tableau filteredRecipes
  //       if (!this.filteredRecipes.includes(recipe)) {
  //         this.filteredRecipes.push(recipe);
  //       }
  //     }
  //   }

  //   if (this.filteredRecipes.length === 0) {
  //     this.$recipiesContainer.innerHTML = `Aucune recette ne contient "${searchTerm}".`;
  //   } else {
  //     this.showRecipe(this.filteredRecipes);
  //   }
  // }

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
    if (this.tagArraySearch.length === 0) {
      this.filteredLists(this._recipes);
      this.showRecipe(this.recipesRenderAll);
    } else {
      this.recipesRender = this.filteredRecipes.map(
        (recipe) => new Recipe(recipe)
      );
      this.filteredLists(this.filteredRecipes);
      this.showRecipe(this.recipesRender);
      // console.log(this.recipesRender);
    }
    const listItems = this.$selectContainer.querySelectorAll(".listItem");
    listItems.forEach((listItem) => {
      listItem.addEventListener(
        "click",
        this.handleListClick.bind(this, listItem)
      );
    });
  }

  // filteredLists(filteredRecipes) {
  //   const filteredIngredients = new DataFactory(filteredRecipes, "ingredient");
  //   const filteredAppliances = new DataFactory(filteredRecipes, "appliance");
  //   const filteredUstensils = new DataFactory(filteredRecipes, "ustensil");

  //   // Mettre à jour les propriétés ingredientArray, applianceArray et ustensilArray avec les nouvelles valeurs filtrées
  //   const ingredientArray = Array.from(filteredIngredients);
  //   const applianceArray = Array.from(filteredAppliances);
  //   const ustensilArray = Array.from(filteredUstensils);

  //   // console.log(this.ingredientArray);

  //   // Mettre à jour les listes d'affichage dans le DOM
  //   this.$ingredientListContainer.innerHTML = this.renderList(ingredientArray);
  //   this.$applianceListContainer.innerHTML = this.renderList(applianceArray);
  //   this.$ustensilsListContainer.innerHTML = this.renderList(ustensilArray);
  // }

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

    // const listItems = this.$selectContainer.querySelectorAll(".listItem");
    // listItems.forEach((listItem) => {
    //   listItem.addEventListener(
    //     "click",
    //     this.handleListClick.bind(this, listItem)
    //   );
    // });
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
    this.showRecipe(this.recipesRenderAll);
    console.log(this.recipesRenderAll);
    // this.$numRecipies.innerHTML = `${this.recipesRenderAll.length} recettes`;

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
        // console.log(this.filteredRecipes);
      }
    });

    return tagContainer.append(dom);
  }
}

const app = new App();
app.Main();
