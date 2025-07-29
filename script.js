"use strict"
const countrySection = document.querySelector(".country-section");
const input = document.querySelector("input");
const select = document.querySelector('select')

const url = "data.json";
let allCountries = [];


async function restApi() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("Expected Array but got:", data);
      return;
    }
    allCountries = data;
    console.log(allCountries);
    
    renderCountries(data);
  } catch (err) {
    console.log("Fetch error: " + err);
  }
}

function renderCountries(data) {
  countrySection.innerHTML = "";
  const fragment = document.createDocumentFragment();
  data.forEach((country) => {
    const countries = document.createElement("a");
    countries.href = `./country.html?name=${encodeURIComponent(country.name)}`;
    countries.className = "country";
    countries.innerHTML = `<div class="country-image">
                <img src="${
                  country.flags.svg
                }" height="auto" width="200px" lt="">
            </div>
            <div class="country-content">
                <h3 class="country-name">${country.name}</h3>
                <h4>Population: <span class="population">${country.population.toLocaleString(
                  "en-IN"
                )}</span></h4>
                <h4>Region: <span class="region">${country.region}</span></h4>
                <h4>Capital: <span class="capital">${
                  country.capital ?? "None..."
                }</span></h4>`;
    fragment.appendChild(countries);
  });
  countrySection.appendChild(fragment);
}

function applyFilters() {
  const searchTerm = input.value.toLowerCase().trim();
  const selectedRegion = select.value;
// console.log(selectedRegion);

  let filtered = allCountries;
  // console.log(filtered);
  


  if (selectedRegion !== "no-referrer") {
    filtered = filtered.filter((country) => country.region === selectedRegion);
  }

  if (searchTerm) {
    filtered = filtered.filter((country) =>
      country.name.toLowerCase().includes(searchTerm)
    );
  }

  renderCountries(filtered);
}

// Direct event listeners
input.addEventListener("input", applyFilters);
select.addEventListener("change", applyFilters);
restApi();

const toggleBtn = document.querySelector(".toggle-theme");
const toggleText = document.querySelector(".toggle-text");
const toggleIcon = document.querySelector(".toggle-theme i");

function darkMode() {
  /**Local Storage to saved dark-mode*/
  const savedTheme = localStorage.getItem("theme");
  const savedIcon = localStorage.getItem("theme-icon");
  const savedText = localStorage.getItem("theme-text");

  // console.log(savedTheme);

  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    toggleText.innerText = savedText || "Light Mode";
    toggleIcon.className = savedIcon || "fa-regular fa-sun";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    toggleText.innerText = savedText || "Dark Mode";
    toggleIcon.className = savedIcon || "fa-regular fa-moon";
  }

  toggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "light");
      toggleText.innerText = "Light Mode";
      toggleIcon.className = "fa-regular fa-sun";
      localStorage.setItem("theme-icon", "fa-regular fa-sun");
      localStorage.setItem("theme-text", "Light Mode");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      toggleText.innerText = "Dark Mode";
      toggleIcon.className = "fa-regular fa-moon";
      localStorage.setItem("theme-icon", "fa-regular fa-moon");
      localStorage.setItem("theme-text", "Dark Mode");
      localStorage.setItem("theme", "dark");
    }
  });
}

darkMode();



const container = document.querySelector('.container');
const topBtn = document.querySelector('.top-btn');

topBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    topBtn.classList.add('show');
  } else {
    topBtn.classList.remove('show');
  }
});


function alignTopBtn() {
  const containerRight = (window.innerWidth - container.offsetWidth) / 2;
  console.log(containerRight);
  topBtn.style.right = `${containerRight + 20}px`; // 20px padding
}
window.addEventListener('resize', alignTopBtn);
window.addEventListener('load', alignTopBtn);