class TagCard {
  constructor() {
    this._$tagContainer = document.querySelector(".tag-container");
  }

  createTagCard() {
    const dom = document.createElement("div");
    dom.classList.add("tag-card");
    dom.innerHTML = `        
            <div class="tag-card__text">Créme de coco</div>
            <button class="tag-card__closeBtn">
                <i class="fa-solid fa-xmark"></i>
            </button>      
        `;
    dom
      .querySelector(".tag-card__closeBtn")
      .addEventListener("click", this.closeTag.bind(this));

    return dom;
  }

  closeTag(e) {
    e.preventDefault();
    dom.style.display = "none";
  }
}
