const btnLanguages = document.getElementById("languages-list");

console.log(btnLanguages);

const showBoxList = () => {
  btnLanguages.toggleAttribute("data-change");

  if (btnLanguages.hasAttribute("data-change")) {
    btnLanguages.classList.add("opacity-100");
  } else {
    btnLanguages.classList.remove("opacity-100");
    btnLanguages.classList.add("opacity-0");
  }
};
