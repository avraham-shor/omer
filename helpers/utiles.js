function t(func, args) {
    // try and catch for error handling.
    try {
        if (args && args.length) {
            return func(...args);
        }
        else {
            return func();
        }
    } catch (error) {
        logError(error);
    }
}

async function getDataFromApi(latitude, longitude, tzid, elev, sec, date) {
    const { data } = await axios.get(
        "https://www.hebcal.com/zmanim",
        {
            params: {
                cfg: "json",
                latitude: latitude,
                longitude: longitude,
                tzid: tzid,
                ue: "on",
                elev: elev,
                sec: sec,
                date: date,
            },
        },
    );
    return data;
}

function updateZmanim() {
    const date = new Date();
    const latitude = isModiin ? 31.92939939 : 31.70332668248921;
    const longitude = isModiin ? 35.04511035 : 35.11461441971153;
    const elevation = isModiin ? 300 : 600;
    try {
        getDataFromApi(latitude, longitude, "Asia/Jerusalem", elevation, 1, date).then((data) => {
            zmanimFromApi = data.times;
            console.log("zmanim", zmanimFromApi);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function setShtibelSetings() {
    if (isSizeOfShtibel()) {
        let boxShma = document.querySelector('.box-shma');
        boxShma.style.fontSize = '2.3rem';
        boxShma.style.right = '2.5vw';
        document.querySelector('.shkiah').style.fontSize = '2.2rem';

        let dayDiv = document.querySelector('.day');
        dayDiv.style.top = '0.5vh';
        dayDiv.style.fontSize = '3rem';

        let timeElement = document.querySelector('.time');
        timeElement.style.fontSize = '6.2rem';
        timeElement.style.top = '4.2vh';

        let middleBoxElement = document.querySelector('.middle-box');
        middleBoxElement.style.fontSize = '2.5rem';
        middleBoxElement.style.top = '48vh';
        middleBoxElement.style.right = '10vw';

        let titleElement = document.querySelector('.title');
        titleElement.style.bottom = '8.6vh';
        titleElement.style.fontSize = '3rem';
        titleElement.style.right = '7vw';

        let titleShkiahElement = document.querySelector('.title-shkiah');
        titleShkiahElement.style.bottom = '8.6vh';
        titleShkiahElement.style.fontSize = '3rem';

        document.querySelector('.msg').style.top = '33vh';
        document.querySelector('.daf').style.fontSize = '2.4rem';
        document.querySelector('.date').style.fontSize = '2.4rem';
        document.querySelector('.daf-title').style.fontSize = '1.8rem';
    }
}

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function logError(err) {
    insertIn('#size', 'error: ' + err);
    console.error('error:', err);
}

function writeSize() {
    try {
        const innerHeight = window.innerHeight;
        const innerWidth = window.innerWidth;
        const height = window.screen.height;
        const width = window.screen.width;
        insertIn('#size', 'innerHeight: ' + innerHeight + '; innerWidth: ' + innerWidth + '; height: ' + height + '; width: ' + width);
    } catch (error) {
        console.log('error:', error);
    }
}

function insertIn(divId, text) {
    document.querySelector(divId).innerHTML = text;
}

function format_time(date) {
    if (typeof date != 'object') {
        date = new Date(date);
    }
    const hours = isModiin ? date.getHours() % 12 || 12 : date.getHours();
    return hours + ':' + pad(date.getMinutes());
}

function formatTimeWithSeconds(date) {
    return format_time(date) + ':' + pad(date.getSeconds());
}


function roundMinute(date, direction) {
    if (typeof date != 'object') {
        date = new Date(date);
    }
    const interval = 60 * 1000;
    switch (direction) {
        case "up":
            return new Date(Math.ceil(date.getTime() / interval) * interval);
        case "down":
            return new Date(Math.floor(date.getTime() / interval) * interval);
        default:
            return new Date(Math.round(date.getTime() / interval) * interval);
    }
}