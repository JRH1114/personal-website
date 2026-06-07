const languageButtons = document.querySelectorAll("[data-lang-button]");
const translatable = document.querySelectorAll("[data-zh][data-en]");
const floatingTitles = document.querySelectorAll("main h2, main h3");
const certificateImages = document.querySelectorAll(".award-card img");

function setLanguage(language) {
  document.documentElement.lang = language === "en" ? "en" : "zh-CN";

  translatable.forEach((node) => {
    const value = node.dataset[language];
    if (value) {
      node.textContent = value;
    }
  });

  languageButtons.forEach((button) => {
    const active = button.dataset.langButton === language;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  localStorage.setItem("portfolio-language", language);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.langButton));
});

function replayFloatAnimation(target) {
  target.classList.remove("is-floating");
  void target.offsetWidth;
  target.classList.add("is-floating");
}

floatingTitles.forEach((title) => {
  title.classList.add("float-target");
  title.setAttribute("tabindex", "0");
  title.addEventListener("click", () => replayFloatAnimation(title));
  title.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      replayFloatAnimation(title);
    }
  });
});

certificateImages.forEach((image) => {
  image.setAttribute("tabindex", "0");
  image.addEventListener("click", () => replayFloatAnimation(image.closest(".award-card")));
  image.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      replayFloatAnimation(image.closest(".award-card"));
    }
  });
});

setLanguage(localStorage.getItem("portfolio-language") || "zh");
