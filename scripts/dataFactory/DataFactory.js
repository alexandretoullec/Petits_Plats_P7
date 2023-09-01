// send back the good formating type according to type datas

class DataFactory {
  constructor(data, type) {
    if (type === "ingredient") {
      return new Recipe(data).UniqueIngredients;
    } else if (type === "appliance") {
      return new Recipe(data).UniqueAppliance;
    } else if (type === "ustensil") {
      return new Recipe(data).UniqueUstensil;
    } else {
      throw "Unknown type format";
    }
  }
}
