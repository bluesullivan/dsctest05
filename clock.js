const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");
const dateTitle=clockContainer.querySelector("h2");

function getTime(){
    const date=new Date();
    const years=date.getFullYear();
    const months=date.getMonth();
    const dates=date.getDay();
    const minutes = date.getMinutes();
    const hours=date.getHours();
    const seconds=date.getSeconds();
    dateTitle.innerText = `${years}-${months}-${dates}`;
    clockTitle.innerText = `${
        hours < 10 ? `0${hours}` : hours}:${minutes<10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds}`;
}
function init(){
    getTime();
    setInterval(getTime,1000);
}

init();