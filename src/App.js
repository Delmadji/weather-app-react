import { useEffect, useState } from "react";

const api = {
  key: "4e4428be578b89f5630155a1e698c70a",
  base: "https //api.openweathermap.org/data/2.5/",
  apical: "api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}",
  units: "imperial",
};
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [locGeo, setLocGeo] = useState({});
  const [isPending, setIsPending] = useState(true);
  //let locLat = 36.7753606;
  //let locLon = 3.0601882;

  const search = (evt) => {
    if (evt.key === "Enter") {
      setTimeout(() => {
        fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${api.key}`
        )
          .then((res) => res.json())
          .then((data) => setLocGeo(...data));

        setQuery("");
      }, 1000);
    }
  };
  console.log(locGeo.lat, locGeo.lon);
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${locGeo.lat}&lon=${locGeo.lon}&appid=${api.key}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setWeather(data);
        setIsPending(false);
      });
    console.log("hiiiii");
  }, [locGeo.lat, locGeo.lon]);

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.name != "undefined"
          ? (weather.main.temp - 273.15).toFixed() > 20
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={search}
          />
        </div>
        {isPending && <div className="pending">loading...</div>}
        {typeof weather.name != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {locGeo.name}, {locGeo.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {(weather.main.temp - 273.15).toFixed()}°c
              </div>
              <div className="weather">
                {(weather.main.temp - 273.15).toFixed() > 20
                  ? "Sunny"
                  : "cloud"}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
