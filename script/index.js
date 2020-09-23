let proxy = "https://cors-anywhere.herokuapp.com/";
let location_timezone = document.querySelector(".location_timezone");
let location_icon = document.querySelector(".location_icon");
let temperature_description = document.querySelector(
  ".temperature_description"
);
let temperature_value = document.querySelector(".temperature_value");
let temperature_degree = document.querySelector(".temperature_degree");
let temperature_section = document.querySelector(".temperature_section");

let cel_val;

window.addEventListener("load", () => {
  let long;
  let lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((postion) => {
      lat = postion.coords.latitude;
      long = postion.coords.longitude;
      console.log(lat, long);
      fetch(
        `http://api.weatherstack.com/current?access_key=e524f4f4406e290411dd46f0a6f161da&query=${lat},${long}`
      )
        .then((response) => response.json())
        .then((data) => display_data(data));
    });
  }
});

function display_data(data) {
  const { temperature, weather_descriptions, weather_icons } = data.current;
  const timezone = data.location.timezone_id;
  location_timezone.textContent = timezone;
  temperature_description.textContent = weather_descriptions;
  temperature_value.textContent = temperature;
  cel_val = temperature;
  // location_icon.src = weather_icons;"PARTLY_CLOUDY_DAY"
  console.log(data);
  console.log(weather_descriptions[0]);

  display_icon("icon1", `${weather_descriptions[0]}_day`);
}

function display_icon(icon_id, icon) {
  var skycons = new Skycons({ color: "salmon" });
  // on Android, a nasty hack is needed: {"resizeClear": true}
  const weather_des = icon.replace(/\s/g, "_").toUpperCase();
  console.log(weather_des);
  // you can add a canvas by it's ID...
  skycons.add(icon_id, Skycons[weather_des]);
  // start animation!
  skycons.play();
}

let is_celcius = true;
temperature_section.addEventListener("click", () => {
  if (is_celcius) {
    const cel = Number(temperature_value.textContent);
    const farh = (cel * 9) / 5 + 32;
    temperature_value.textContent = Math.floor(farh);
    temperature_degree.textContent = "F";
    is_celcius = false;
    return;
  }
  temperature_value.textContent = cel_val;
  temperature_degree.textContent = "C";
  is_celcius = true;
});
  