document.getElementById("check-aqi").addEventListener("click", () => {
  const zip = document.getElementById("zip").value.trim();
  if (zip.length !== 5 || isNaN(zip)) {
    alert("Please enter a valid 5-digit ZIP code.");
    return;
  }

  fetch(`utils/airnow-proxy.js?zip=${zip}`)
    .then(response => response.json())
    .then(data => {
      const aqi = data.aqi;
      const category = data.category;

      let advice = "";
      if (aqi <= 50) {
        advice = "It's a great day for outdoor play!";
      } else if (aqi <= 100) {
        advice = "Okay for most pets, but take it easy.";
      } else if (aqi <= 150) {
        advice = "Sensitive pets should stay inside.";
      } else if (aqi <= 200) {
        advice = "Keep your pet indoors and limit activity.";
      } else {
        advice = "Dangerous air! Stay inside and close windows.";
      }

      document.getElementById("aqi-result").textContent = `AQI: ${aqi} (${category})`;
      document.getElementById("pet-advice").textContent = advice;
      document.getElementById("aqi-info").classList.remove("hidden");
    })
    .catch(() => {
      alert("Something went wrong while fetching air quality data.");
    });
});

