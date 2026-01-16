const countrySelect = document.getElementById("country");
const resultDiv = document.getElementById("result");

let vivillonPatterns = {};

// Load Vivillon data from JSON
fetch("data/vivillon.json")
  .then(response => response.json())
  .then(data => {
    vivillonPatterns = data;
      countrySelect.length = 1;

    // Populate country dropdown
for (const country in vivillonPatterns) {
  const option = document.createElement("option");
  option.value = country;
  option.textContent = country;
  countrySelect.appendChild(option);
}

  })
  .catch(error => {
    console.error("Error loading Vivillon data:", error);
  });

countrySelect.addEventListener("change", function () {
  const selectedCountry = countrySelect.value;

  if (selectedCountry === "") {
    resultDiv.innerHTML = "<p>Your Vivillon pattern will appear here.</p>";
    return;
  }

  const data = vivillonPatterns[selectedCountry];

  if (!data) {
    resultDiv.innerHTML = "<p>No Vivillon pattern data available.</p>";
    return;
  }

  resultDiv.innerHTML = `
    <h2>${data.pattern} Pattern</h2>
    <img src="${data.image}" alt="${data.pattern} pattern" class="pattern-image">
    <p>This Vivillon pattern is associated with ${selectedCountry}.</p>
  `;
});
