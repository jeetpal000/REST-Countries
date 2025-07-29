const cName = document.querySelector(".country-name");
const nName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const domain = document.querySelector(".domain");
const currency = document.querySelector(".currencies");
const langauge = document.querySelector(".langauges");
const borderCountries = document.querySelector(".border-countries");
const countryImg = document.querySelector(".country-flag-img");

/** Get Country Name By URL */
const params = new URLSearchParams(window.location.search);
const countryName = params.get("name");

async function fetchApi(){
  const response = await fetch('data.json');
  const data = await response.json();

// console.log(data);

// }

/** Fetch Data to the File */
// fetch("data.json")
//   .then((res) => res.json())
//   .then((data) => {
    const countryData = data.find((c) => c.name === countryName);
    if (countryData) {
      /**Update UI by countryData */
      countryImg.src = countryData.flags.svg;
      cName.innerText = countryData.name;
      nName.innerText = countryData.nativeName;
      population.innerText = countryData.population.toLocaleString("en-IN");
      region.innerText = countryData.region;
      subRegion.innerText = countryData.subregion;
      capital.innerText = `${countryData.capital ?? 'None....'}`;
      domain.innerText = countryData.topLevelDomain;
      currency.innerText = `${countryData.currencies[0].name}  ${countryData.currencies[0].symbol}`;
      /**Using Map Method Get for All Languages*/
      langauge.innerText = countryData.languages
        .map((lang) => lang.name)
        .join(", ");

      /**Get All Country Border*/
      if (countryData.borders) {
        countryData.borders.forEach((boundaryCode) => {
          /**Find Method for Border Name & alpha3Code if it is match then return*/
          const boundaryCountry = data.find(
            (c) => c.alpha3Code === boundaryCode
          );
          if (boundaryCountry) {
            const span = document.createElement("span");
            span.innerText = boundaryCountry.name;
            span.style.cursor = "pointer";
            span.addEventListener("click", () => {
              window.location.search = `?name=${boundaryCountry.name}`;
            });
            borderCountries.appendChild(span);
          }
        });
      } else {
        borderCountries.innerText = "None!....";
      }
    } else {
      console.log("country data not found");
    }
  // });
}

fetchApi();

const toggleBtn = document.querySelector(".toggle-theme");
const toggleText = document.querySelector(".toggle-text");
const toggleIcon = document.querySelector(".toggle-theme i");



function darkMode() {
  const savedTheme = localStorage.getItem("theme");
  const savedText = localStorage.getItem("theme-text");
  const savedIcon = localStorage.getItem("theme-icon");

  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    toggleText.innerText = savedText || "Light Mode";
    toggleIcon.className = savedIcon || "fa-regular fa-moon";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    toggleText.innerText = savedText || "Dark Mode";
    toggleIcon.className = savedIcon || "fa-regular fa-sun";
  }

  toggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "light");
      toggleText.innerText = "Light Mode";
      toggleIcon.className = "fa-regular fa-sun";
      localStorage.setItem("theme", "light");
      localStorage.setItem("theme-text", "Light Mode");
      localStorage.setItem("theme-icon", "fa-regular fa-sun");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      toggleText.innerText = "Dark Mode";
      toggleIcon.className = "fa-regular fa-moon";
      localStorage.setItem("theme", "dark");
      localStorage.setItem("theme-text", "Dark Mode");
      localStorage.setItem("theme-icon", "fa-regular fa-moon");
    }
  });
}
darkMode();