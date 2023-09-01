// mange lists
document.querySelectorAll(".dropbtn").forEach((dropbtn) => {
  dropbtn.addEventListener("click", () => {
    const dropdownContent = dropbtn.nextElementSibling;
    const chevron = dropbtn.querySelector(".chevron");
    dropdownContent.style.display =
      dropdownContent.style.display === "block" ? "none" : "block";
    chevron.style.transform =
      dropdownContent.style.display === "block"
        ? "rotate(180deg)"
        : "rotate(0)";
  });
});

// Fonction de recherche dans les options
document.querySelectorAll(".search-input").forEach((searchInput) => {
  searchInput.addEventListener("input", (event) => {
    const searchValue = event.target.value.toLowerCase();
    const options = searchInput.nextElementSibling.querySelectorAll(
      ".dropdown-content a"
    );

    options.forEach((option) => {
      const optionText = option.textContent.toLowerCase();
      if (optionText.includes(searchValue)) {
        option.style.display = "block";
      } else {
        option.style.display = "none";
      }
    });
  });
});
