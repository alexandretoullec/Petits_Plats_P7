class DataFactory {
  constructor(data, type) {
    // Si le type correspond à l'ancienne API, alors retourne moi l'ancien formattage
    if (type === "ingredient") {
      //   console.log(data);
      return new Recipe(data).UniqueIngredients;
      // Sinon retourne moi le nouveau formattage
    } else if (type === "appliance") {
      return new Recipe(data).UniqueAppliance;
      // Une bonne pratique est de throw une erreur si le format n'est pas reconnu
    } else if (type === "ustensil") {
      return new Recipe(data).UniqueUstensil;
    } else {
      throw "Unknown type format";
    }
  }
}
