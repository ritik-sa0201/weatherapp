let tempc = document.getElementById("tempc");
let searchbox = document.getElementById("searchbox");
let icon = document.getElementById("icon");

let locn = document.getElementById("locn");
let windperr = document.getElementById("windper");
let humperr = document.getElementById("humper");

let dateandtime = document.getElementById("dateandtime");

let city = "delhi";

const getweather = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=82429c5fd5b6546fabeb9a053d9b95a4`;

    try {
        let res = await fetch(url);
        let data = await res.json();
        let temp = data.main.temp;
        let tempcelci = Math.floor(temp - 273.15);

        console.log(`${tempcelci}°C`);
        tempc.innerText = `${tempcelci}°C`;

        // ========================icon======================
        let iconimg = data.weather[0].icon;
        let iconurl = `http://openweathermap.org/img/wn/${iconimg}@2x.png`;
        let img = document.getElementById("images");
        img.setAttribute("src", iconurl);

        // ===========================name and country==============================
        let name = data.name;
        let country = data.sys.country;
        console.log(name, country);
        locn.innerText = `${name},${country}`;

        // ===========================windspeed==================================
        let windspeed = data.wind.speed;
        console.log(windspeed);
        windperr.innerText = `${windspeed}km/h`;

        // ============humidity================
        let humidity = data.main.humidity;
        console.log(humidity);
        humperr.innerText = `${humidity}%`;

        // ================================date and time===============
        let datevalue = data.dt;
        let date = new Date(datevalue * 1000);
        console.log(date.toLocaleString());
        dateandtime.innerText = `${date.toLocaleString()}`;

    } catch (error) {
        console.log(error);
    }
}

getweather();

icon.addEventListener("click", () => {
    city = searchbox.value;
    console.log(city);
    searchbox.value = "";
    getweather();
});

icon.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        city = searchbox.value;
        console.log(city);
        searchbox.value = "";
        getweather();
    }
});

// Function to update the clock
const updateClock = () => {
    const now = new Date();
    dateandtime.innerText = now.toLocaleString();
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial call to display the current time immediately on page load
updateClock();
