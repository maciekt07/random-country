const random = document.getElementById("random");
const submit = document.getElementById("submit");
const search = document.getElementById("search");
const nameTxt = document.getElementById("name");

const flagImg = document.getElementById("flag");
const table = document.getElementById("table");

const googleMaps = document.getElementById("googleMaps");
const linkIcon = document.querySelector('link[rel="icon"]');

const numberWithSpaces = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const main = () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      const countries = data.map((country) => country.name.official);
      const randomNumber = Math.floor(Math.random() * (249 - 0)) + 0;
      const randomCountry = countries[randomNumber];
      let randomCountryLink = `https://restcountries.com/v3.1/name/${randomCountry}`;
      if (search.value != "") {
        randomCountryLink = `https://restcountries.com/v3.1/name/${search.value}`;
      }
      fetch(randomCountryLink)
        .then((response) => response.json())
        .then((data) => {
          flagImg.style.display = "block";
          table.style.display = "block";
          const flagSVG = data[0].flags.svg;
          const flagPNG = data[0].flags.png;
          const googleMaps = data[0].maps.googleMaps;
          const commonName = data[0].name.common;
          console.log(commonName.replace(/\s/g, ""));
          localStorage.setItem("Country", commonName.replace(/\s/g, ""));
          const Name = data[0].name.official;
          document
            .getElementById("googleMaps")
            .setAttribute("href", googleMaps);
          flagImg.src = flagSVG;
          linkIcon.setAttribute("href", flagPNG);
          nameTxt.innerHTML = `<span style="font-size:32px;font-weight:bold">${commonName}</span><br /><span style="font-size:16px">(${Name})</span>`;
          document.title = `${commonName} - Random Country`;
          table.innerHTML = `<tr><td><b>Capital:</b> </td><td>${
            data[0].capital
          }</td></tr>
          <tr><td><b>Population:</b> </td><td>${numberWithSpaces(
            data[0].population
          )}</td></tr>
          <tr><td><b>Region:</b> </td><td>${data[0].region}</td></tr>
          <tr><td><b>Subregion:</b> </td><td>${data[0].subregion}</td></tr>
          <tr><td><b>Area:</b> </td><td>${numberWithSpaces(
            data[0].area
          )} km²</td></tr>
          <tr><td><b>Languages:</b> </td><td>${JSON.stringify(
            data[0].languages
          )}</td></tr>
          <tr><td><b>Currencies:</b> </td><td>${JSON.stringify(
            data[0].currencies
          )}</td></tr>
          <tr><td><b>Timezone:</b> </td><td>${data[0].timezones}</td></tr>
          
          `;
          search.value = "";
        })
        .catch((err) => {
          console.error(err);
          alert("Country not found");
        });
    });
};
main();

const loading = () => {
  nameTxt.innerHTML = `<span style="font-size:32px;font-weight:bold">Loading...</span>`;
  flagImg.src = "loading.gif";
};

random.addEventListener("click", () => {
  loading();
  main();
});
submit.addEventListener("click", () => {
  if (search.value != "") {
    loading();

    main();
  }
});
search.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    submit.click();
  }
});
