let isShowTimes = true;

window.addEventListener("click", function () {
    isShowTimes = !isShowTimes;
});

function refresh() {
    let date = new Date();
    document.querySelector('#time').innerText = format_time(date);
    insertIn('#time', formatTimeWithSeconds(date), isShowTimes);
    date = date.setMinutes(date.getMinutes() - 18);
    var day = new Hebcal.HDate();
    if (day.sunset() < date) {
        day = day.next();
    }

    var omerDay = day.omer();
    let daf = day.dafyomi();
    document.querySelector('#omer img').src = 'images/SfiratHaomer' + omerDay + '.jpg';
    replaceSofShma(day);
    insertIn('#sunset', 'שקיעה:  ' + format_time(day.sunset()), isShowTimes);
    insertIn('#daf_yomi','דף היומי בבלי:  ' + day.dafyomi('h'), isShowTimes);
    setTimeout('refresh()', 1000);

}

function insertIn(divId, text, isAvailable) {
    document.querySelector(divId).innerHTML = isAvailable ? text : '';
}

function replaceSofShma(day) {
    let date = new Date();
    let seconds = date.getSeconds();
    let time = 0;
    if (Math.floor(seconds / 10) % 2 == 0) {
        insertIn('#shma', 'סו"ז קר"ש ב:  ' + format_time(day.getZemanim().sof_zman_shma), isShowTimes);
        time = day.getZemanim().sof_zman_shma.getTime();
    }
    else {
        insertIn('#shma', 'סו"ז קר"ש א:  ' + format_time(day.getZemanim().sof_zman_shma_A), isShowTimes);
        time = day.getZemanim().sof_zman_shma_A.getTime();
    }
   
    if (date.getTime() +  - time < (1000 * 60 * 20)  && date.getTime() +  - time > 0) {
    
        document.querySelector('#shma').classList.add('red');
        document.querySelector('#shma').classList.remove('black');
    }
    else {
        document.querySelector('#shma').classList.add('black');
        document.querySelector('#shma').classList.remove('red');
    }
}

function format_time(date) {
    return date.getHours() + ':' + pad(date.getMinutes());
}

function formatTimeWithSeconds(date) {
    return format_time(date) + ':' + pad(date.getSeconds());
}

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

Hebcal.events.on('ready', refresh());


