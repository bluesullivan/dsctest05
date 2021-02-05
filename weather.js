const weather = document.querySelector(".js-weather");
const weatherTitle = weather.querySelector("h1");
const pastTitle= weather.querySelector("h2");
const API_KEY = "e5fe9bd5c7ed9f2165cd9b4b80416307";
const COORDS = "coords";

// 여기서 fetch 함수는 requests 함수와 같은 역할.
function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            return response.json();
        }).then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            const pastweather = temperature+2.4;

            weatherTitle.innerText = `${temperature} @ ${place}`;
            pastTitle.innerText = `과거 기온과 비교해 ${pastweather} 높습니다. (현재-과거)`;
        })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 위치정보 획득에 성공하면 실행하는 함수
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude : latitude,
        longitude : longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

// 위치정보 획득에 실패하면 실행하는 함수.
function handleGeoError(){
    console.log("Can't access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError); // 유저의 현재 위치 정보를 요청하고, 성공하면 첫 번째 함수를, 실패하면 두 번째 함수를 실행.
}

// 로컬 스토리지에 정보가 없으면 요청.
function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS); 
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init(){
    loadCoords();
    setInterval(loadCoords,2000);
}

init();