let isShowTimes = true;

const days = ['ראשון','שני','שלישי','רביעי','חמישי','ששי','שבת'];
let dayOrNight = 'יום ';
const MIN_FONT_SIZE = 3.5;
const MAX_FONT_SIZE = 5.5;
let fontSize = 3.5;

window.addEventListener("click", function () {
    isShowTimes = !isShowTimes;
});

function refresh() {
    let date = new Date();
    let date2 = new Date();
    dateLater = date.setMinutes(date.getMinutes() - 18);
    var day = new Hebcal.HDate();

    
    if (day.sunset() < dateLater) {
        day = day.next();
        dayOrNight = 'ליל ';
    }
    else dayOrNight = 'יום ';
    insertIn('#time',(dayOrNight + days[day.getDay()]).replace('ליל ראשון', 'מוצ"ש') + " פ' " + (day.getParsha('h')[0] || '') + ' - ' + formatTimeWithSeconds(date2), isShowTimes);

    var omerDay = day.omer();
    let daf = day.dafyomi('h');
    let src = 'images/SfiratHaomer' + omerDay + '.jpg';
    if (omerDay == 0) {
        src = setMainImage(date2, day.getDay() == 6, day);
    }
    document.querySelector('#omer img').src = src;
    replaceSofShma(day);
    insertIn('#sunset', 'שקיעה:  ' + format_time(new Date(day.sunset().setMinutes(day.sunset().getMinutes() + 2))), isShowTimes);
    insertIn('#daf_yomi','דף היומי בבלי:  ' + daf, isShowTimes);
    // console.log((day.sunset() - date.getTime()) / (1000 * 60 * 15));
    warningWhenNear(day.sunset(),new Date().getTime(), '#sunset');
    setTimeout('refresh()', 1000);

}

function insertIn(divId, text, isAvailable) {
    document.querySelector(divId).innerHTML = isAvailable ? text : '';
}

function replaceSofShma(day) {
    let date = new Date();
    let seconds = date.getSeconds();
    let time = 0;
    let shma1 = day.getZemanim().sof_zman_shma_A.getTime();
    let shma2 = day.getZemanim().sof_zman_shma.getTime();

    if (Math.floor(seconds / 10) % 2 == 0) {
        insertIn('#shma', 'סו"ז קר"ש ב:  ' + format_time(day.getZemanim().sof_zman_shma), isShowTimes);
        time = shma2;
    }
    else {
        insertIn('#shma', 'סו"ז קר"ש א:  ' + format_time(day.getZemanim().sof_zman_shma_A), isShowTimes);
        time = shma1;
    }
    
    
    warningWhenNear(time, date.getTime(), '#shma');
    // enlargeFontSizeOfShmaWhenNear(shma1, shma2, date.getTime());
}

function setFontSize() {
    document.querySelector('#shma').style.fontSize = fontSize + 'rem'; 
}

function warningWhenNear(time, now, div) {
    if (time - now  < (1000 * 60 * 15)  && time - now > 0) {
    
        document.querySelector(div).classList.add('red');
        document.querySelector(div).classList.remove('black');
    }
    else {
        document.querySelector(div).classList.add('black');
        document.querySelector(div).classList.remove('red');
    }
}

function enlargeFontSizeOfShmaWhenNear(shma1, shma2, now) {
    if (shma1 - now  < (1000 * 60 * 20)  && shma2 > now) {
        if (fontSize < MAX_FONT_SIZE) {
            fontSize += 0.002;
            
        }
    }
    else if (fontSize > MIN_FONT_SIZE) {
        fontSize -= 0.002;
    }
    setFontSize();
}

function format_time(date) {
    return (date.getHours() % 12 || 12) + ':' + pad(date.getMinutes());
}

function formatTimeWithSeconds(date) {
    return format_time(date) + ':' + pad(date.getSeconds());
}

function setMainImage(date, isShabat, day) {
    // let srcParams = 'empty';
    // let msgText = 'כאן בביהכ"נ אוסרים הדיבור בכל שעת התפילה מתחילתה ועד סופה.';
    // let msgShma =  'סו"ז קר"ש ב:  ' + format_time(day.getZemanim().sof_zman_shma);
    // const msgObj = document.querySelector('#msg');
    // msgObj.innerHTML = msgText;
    // msgObj.style.fontSize = 6.5 - msgText.length / 30 + 'rem';
    let srcParams = 'speakingForbidden';
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const shabatNight = isShabat && hours >= 18 && hours <= 23;
    const shabatNightByTefila = shabatNight && hours <= 20;
    const shabatMornning = isShabat && hours >= 8 && hours <= 11;
    if (!isShabat && minutes % 30 == 0) {
        srcParams = 'phoneForbidden';
    }
    if ((!isShabat && hours >= 6 && hours <= 9  || shabatNightByTefila || shabatMornning) && minutes % 20 == 0) {
        srcParams = 'kadishAtBima';
    }
    return 'images/' + srcParams + '.jpeg'
}

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

Hebcal.events.on('ready', refresh());


