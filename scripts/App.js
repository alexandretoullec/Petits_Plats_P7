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
        this.handleListClick.bind(this, listItem)
      );
    });

    // add event qui ajoute dans le tableau tag l'élément cliqué
    document.querySelectorAll(".dropdown-content").forEach((tag) => {
      tag.addEventListener("click", (e) => {
        const tagValue = e.target.textContent;
        console.log(tagValue);
        this.tagArraySearch.push(tagValue);
        console.log(this.tagArraySearch);
      });
    });

    // filter threw recipes with this.tagArraySearch
    const filteredRecipes = recipes.filter((recipe) => {
      const ingredients = recipe.ingredients.map(
        (ingredient) => ingredient.ingredient
      );
      const appliances = [recipe.appliance];
      const ustensils = recipe.ustensils;

      // Remplacez le tableau ci-dessus par votre propre liste de filtrage

      const filterList = [...ingredients, ...appliances, ...ustensils];
      console.log(filterList);
      return filterList.some((filterItem) =>
        this.tagArraySearch.includes(filterItem)
      );
    });

    console.log(filteredRecipes);
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
        console.log(this.tagArraySearch);
      }
    });

    return tagContainer.append(dom);
  }
}

const app = new App();
app.Main();
