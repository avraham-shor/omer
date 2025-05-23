
//window.location.replace("https://aoklivestrim.com/");
//window.location.replace("https://avraham-shor-venn.github.io/avot/");

// const toDayNow = new Date();
// if (toDayNow.getHours() == 18 && toDayNow.getMinutes() > 30 && toDayNow.getDate() == 25 && toDayNow.getMonth() == 0) {
//     window.location.replace("https://avraham-shor-venn.github.io/avot/")
// } {
    
// }

//Globals;
const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

const daysInMonth = ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'יא', 'יב', 'יג', 'יד', 'טו', 'טז', 'יז', 'יח', 'יט', 'כ', 'כא', 'כב', 'כג', 'כד', 'כה', 'כו', 'כז', 'כח', 'כט', 'ל'];

const VAL = { 0: '', 1: 'א', 2: 'ב', 3: 'ג', 4: 'ד', 5: 'ה', 6: 'ו', 7: 'ז', 8: 'ח', 9: 'ט', 10: 'י', 20: 'כ', 30: 'ל', 40: 'מ', 50: 'נ', 60: 'ס', 70: 'ע', 80: 'פ', 90: 'צ', 100: 'ק', 200: 'ר', 300: 'ש', 400: 'ת' };

const tensInOmer = ['','עשר', 'עשרים', 'שלשים', 'ארבעים'];

const unitsInOmer = ['', 'אחד', 'שני', 'שלשה', 'ארבעה', 'חמשה', 'ששה', 'שבעה', 'שמונה', 'תשעה'];

// amont time nerot before shkiah in current city.
// getAmountTimeNerotBeforeShkiah();

let dayOrNight = 'יום ';

const MESSAGE = 'כאן בביהכ"נ אוסרים הדיבור בכל שעת התפילה מתחילתה ועד סופה';

// let opacity = 1;

// let changeOpacity = 1;

let day;
let dayUntil12;
let isHoliday = false;
let dayInWeek;
let month;
let year;
let dayInMonth;
let hours;
let minutes;
let seconds;
let isNight;
let isStartNight;
let omerDay;

setShtibelSetings();

const params = new URLSearchParams(window.location.search);
const city = params.get('city');
const isModiin = city && city == 'm';
const timeOfNerot = isModiin ? 30 : 40;
// For Adar;
const mishMsg = 'משנכנס אדר מרבים בשמחה'.split('');
let mishArr = [];
const colors = ['red', 'blue', 'yellow', 'green', 'orange', 'brown', 'black', 'purple', 'gold', 'pink', 'gray', 'turquoise', 'beige', 'maroon'];
let indexAdar = 0;


// setMishenichnas();
// writeSize()



function refresh() {
    let specifyMsg = [];
    const msgObject = [];
    // const warningMsgs = [];
    let date = new Date();
    //let date2 = new Date();
    let dateLater = new Date();
    let dateEarlier = new Date();
    dateLater = dateLater.setMinutes(dateLater.getMinutes() - 13);
    dateEarlier = dateEarlier.setMinutes(dateEarlier.getMinutes() + 29);
    isHoliday = false;

    day = new Hebcal.HDate();
    dayUntil12 = new Hebcal.HDate();
    

    if (
        (day.sunset() < dateLater && 
        dateLater - day.sunset() > (22*60*1000) && 
        dateLater - day.sunset() < (52*60*1000)) ||
        !isModiin && (hours == 22 || hours == 23) && minutes > 3 && minutes < 30
    ) {
        isStartNight = true;
    }
    else {
        isStartNight = false;
    }

    if (day.sunset() < dateLater) {
        day = day.next();
        dayOrNight = 'ליל ';
         isNight = true;
    }
    else {
        dayOrNight = 'יום ';
        isNight = false;
    }

    

    // Set globals.

    dayInWeek = day.getDay();
    dayInMonth = day.day;
    month = day.month;
    year = day.year;
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    omerDay = day.omer();



    const masechtaAndDafArr = day.dafyomi('h').split(" ");
    const dayOfMonth = daysInMonth[dayInMonth];
    const monthHebrew = day.getMonthName('h');
    const yearNumber = day.getFullYear() - 5700;
    const sofZman1 = day.getZemanim().sof_zman_shma_A;
    const sofZman2 = day.getZemanim().sof_zman_shma;
    const units = yearNumber % 10;
    const tens = yearNumber - units;
    const yearHebrew = 'תש' + (!units ? '"' : '') + VAL[tens] + (units ? '"' + VAL[units] : '');
    const SHKIAH_STR = format_time(new Date(dayUntil12.sunset().setSeconds(dayUntil12.sunset().getSeconds() + 150)));
    const MASECHTA_STR = masechtaAndDafArr.slice(0, masechtaAndDafArr.length - 1).join(' ');
    const DAF_STR = masechtaAndDafArr[masechtaAndDafArr.length - 1];

    const SHMA_STR1 = "זמן א'  " + format_time(sofZman1);
    const SHMA_STR2 = "זמן ב'  " + format_time(sofZman2);
    const netz = 'נץ החמה: ' + format_time(day.getZemanim().neitz_hachama);
    const mincha = 'מנחה: ' + format_time(day.getZemanim().mincha_gedola);
    const nerot = 'הדלקת נרות%' + format_time(new Date(day.sunset().setSeconds(day.sunset().getSeconds() - ((timeOfNerot || 30) * 60) + 150))) + '@';
    const sofZmanTefilah = 'סוף זמן תפילה ' + format_time(day.getZemanim().sof_zman_tfilla);





    insertIn('#day', (dayOrNight + days[dayInWeek]).replace('ליל ראשון', 'מוצ"ש') + t(getParsha));
    insertIn('#shkiah', SHKIAH_STR);
    insertIn('#masechta', MASECHTA_STR);
    insertIn('#daf', DAF_STR);
    insertIn('#shma2', SHMA_STR2);
    insertIn('#shma1', SHMA_STR1);
    //insertIn('#date', DATE_STR);
    insertIn('#day-of-month', dayOfMonth);
    insertIn('#month', monthHebrew);
    insertIn('#year', yearHebrew);

    t(setShtibelSetings);

    setIsHoliday();

    if (t(isSiumMasechet, [day])) {
        specifyMsg.push({color: 'darkblue', text: 'הדרן עלך מסכת ' + MASECHTA_STR});
    }

    if (dayInWeek == 5 && dayOrNight == 'יום ') {
        specifyMsg.push({color: 'darkblue', text: nerot});
    }

    if (t(isNearToShkiah,[day.sunset().setMinutes(day.sunset().getMinutes() + 1), date])) {
        specifyMsg.push({color: 'black', text: "%שקיעת החמה@%" + SHKIAH_STR});
    }

    if (t(isShowZmanMoilad)) {
        specifyMsg.push({color: 'red', text: t(calculateMoiladAndGetMoiladText)});
        specifyMsg.push({color: 'brown', text: t(calculateMoiladAndGetMoiladText)});
        specifyMsg.push({color: 'purple', text: t(calculateMoiladAndGetMoiladText)});
    }

    if (t(isHolidayOrCholHamoed)) {
        specifyMsg.push({color: 'red', text: 'יעלה ויבוא'});
    }

    if (t(isZom,[date, day])) {
        specifyMsg.push({color: 'red', text: 'עננו'});
    }

    const isAfterNoon = date > day.getZemanim().chatzot && date < day.getZemanim().tzeit;

    if (isAfterNoon && month == 5 && ((dayInWeek == 0 && dayInMonth == 10) || (dayInWeek != 6 && dayInMonth == 9))) {
        specifyMsg.push({color: 'red', text: '%נחם%@עננו@'});
    }

    if (t(isStartMoridHatal)) {
        specifyMsg.push({color: 'red', text: 'מוריד הטל'});
    }

    if (t(isShowTehilim) && tehilimByDays[dayInMonth] && tehilimByDays[dayInMonth].length ) {
        specifyMsg.push({color: 'darkblue', text: `%פרקי תהלים@%` + tehilimByDays[dayInMonth] || ''});
    }

    if (t(isStartAseretYemeiTeshuva)) {
        specifyMsg.push({color: 'red', text: 'המלך'});
    }
    
    if (t(isStartBorchenu)) {
        specifyMsg.push({color: 'red', text: 'ברכנו'});
    }

    if (t(isStartMoridHageshem)) {
        specifyMsg.push({color: 'red', text: '%משיב הרוח%@ומוריד הגשם@'});
    }

    if (t(isStartBorechOlenu)) {
        specifyMsg.push({color: 'red', text: 'ברך עלינו'});
    }

    if (t(isAlHanisim)) {
        specifyMsg.push({color: 'red', text: 'על הניסים'});
    }

    if (t(isNearToSofZman,[sofZman2, date])) {
        specifyMsg.push({color: 'red', text: `%סוזק"ש ב'@%` + format_time(sofZman2)});
    }
    
    if (omerDay > 0) {
        specifyMsg.push({color: 'black', text: getSefira(omerDay)});
    }

    if (t(isNearToSofZman,[sofZman1, date])) {
        specifyMsg.push({color: 'red', text: `%סוזק"ש א'@%` + format_time(sofZman1)});
    }

    t(setCipurMsgs, [specifyMsg]);
    
    if (t(isSpeakTehilim)) {
        const tehilimSeder = t(getTehilimDay);
        if (tehilimSeder) {
            specifyMsg.push({color: 'darkblue', text: `%תהלים@%` + 'סדר ' + tehilimSeder});   
        };
    }

    if (t(isEndColelim)) {
        specifyMsg.push({color: 'black', text: '%לומד יקר !@% אנא, החזר את הספרים שהשתמשת בהם למקומם.'});
    }

    if (!isModiin) {
        specifyMsg.push({color: 'black', text: MESSAGE});
    }

    let src = 'images/SfiratHaomer' + omerDay + '.jpg';

    if (omerDay == 0 || !isStartNight) {
        src = 'images/empty2.jpg';
        t(setMessages,[day, specifyMsg]);
        document.querySelector('#omer img').classList.remove("up");
        const sfiraImg = document.getElementById('sfira-img');
        sfiraImg.classList.add("hide");
        insertIn('#sfira-text', '');
        insertIn('#sfira-right', '');
        insertIn('#sfira-midot', '');
    }

    if (omerDay > 0 && isStartNight) {
        // document.querySelector('#omer img').classList.add("up");
        // document.getElementById('sfira-img').classList.add("up");
        const sfiraImg = document.getElementById('sfira-img');
        sfiraImg.classList.remove("hide");
        sfiraImg.classList.add("up");
        insertIn('#sfira-text', ObjectsSefira[omerDay].sfira);
        setCandles(day, dateEarlier);
        insertIn('#sfira-right', ObjectsSefira[omerDay].right);
        insertIn('#sfira-midot', ObjectsSefira[omerDay].left);
    }


    // if (false && (month == 12 || month == 13 || (month == 11 && dayInMonth == 30))) {
    //     // src = 'images/purimBG.pdf'

    //     const purimSrc = 'images/purim' + Math.round(minutes / 3) % 10 + '.jpg';
    //     const purim = document.getElementById('purim');
    //     purim.src = purimSrc;
    //     opacity = opacity + 10 * changeOpacity;
    //     purim.style.opacity = opacity > -1 ? (opacity / 100) : 0;

    //     if (opacity >= 150) {
    //         changeOpacity *= -1;
    //     }
    //     if (opacity < -600) {
    //         changeOpacity *= -1;
    //     }

    //     // console.log(purim.style.opacity);
    // }
    document.querySelector('#omer img').src = src;



    setTimeout('refresh()', 2000);



}

function setCipurMsgs(specifyMsg) {
    if (day.month == 7 && (day.day == 10 || day.day == 11)) {
        if (day.day == 10) {
            specifyMsg.push({ color: 'darkblue', text: 'המלך' });
            if (hours == 17 && minutes > 30 || (hours == 18 && minutes < 30)) {
                specifyMsg.push({ color: 'red', text: 'וחתמנו' });
            }
        }

        if (dayUntil12 == 10 && hours == 18) {
            specifyMsg.push({ color: 'red', text: 'צאת החג 6:47' }); //TODO it is updated for year תשפה
        }
    }
}

// function getAmountTimeNerotBeforeShkiah() {
//     const seconds = localStorage.getItem('nerotBeforeShkiah');
//     if (seconds) {
//         nerotFromStorage = +seconds;
//     }
//     else {
//         nerotFromStorage = setAndGetNerotToTheStorage();
//     }
    
// }

function setAndGetNerotToTheStorage() {
    const minutes = prompt('כמה דקות לפני השקיעה, הדלקת הנרות בעירכם?');
    if (minutes && !isNaN(minutes)) {
        localStorage.setItem('nerotBeforeShkiah', minutes * 60);
        return minutes * 60;
    }
}

function setIsHoliday() {
    const shavuot = month == 3 && dayInMonth == 7;
    const pesach = month == 1 && (dayInMonth == 15 || dayInMonth == 21);
    const sucot = month == 7 && (dayInMonth == 15 || dayInMonth == 22);
    const roshHashana = month == 7 && dayInMonth == 2;
    const cipur = month == 7 && dayInMonth == 10;
    if (dayInWeek == 6 || shavuot || pesach || sucot || roshHashana || cipur) {
        isHoliday = true;
    }
}

function setCandles(day, dateEarlier) {
    const candlesImages = document.querySelectorAll('.candles');
    if (dayInWeek == 6 || (dayInWeek == 5 && day.sunset() < dateEarlier)) {
        candlesImages.forEach(img => {
            img.classList.remove("hide");
        });
    }
    else {
        candlesImages.forEach(img => {
            img.classList.add("hide");
        });
    }
}

function insertIn(divId, text) {
    document.querySelector(divId).innerHTML = text;
}

function format_time(date) {
    return (date.getHours() % 12 || 12) + ':' + pad(date.getMinutes());
}

function formatTimeWithSeconds(date) {
    return format_time(date) + ':' + pad(date.getSeconds());
}


function setMessages(day, specifyMsg) {
    let sizeForAndroid = 1;
    const msgObj = document.querySelector('#msg');
    const mainImage = document.querySelector('#main-img');
    const divsToHide = document.getElementsByClassName('dth');
    debugger;
    const sunset = day.sunset();
    const date = new Date();
    // if (month == 11 && dayInMonth == 29 && day.sunset() <= date && day.sunset() - date < (1000 * 60 * 15)) {
        if (month == 11 && dayInMonth == 29 && !isNight && date.getHours() == 17 && date.getMinutes() >= 39 && date.getMinutes() < 54) {

        Array.from(divsToHide).forEach(div => div.classList.add('hide'));

        debugger;
        msgObj.classList.remove('msg');
        msgObj.classList.add('msg-adar');
        mainImage.classList.add("image-adar");
        if (msgObj.innerHTML.includes('החמה')) {
            msgObj.innerHTML = '';
            indexAdar = 0;
            mishArr = [];

        }

        msgObj.style.fontSize = (22 - mishArr.length / 3) + 'rem';
        const char = mishMsg[indexAdar];
        const divChar = document.createElement('span');
        const rand1 = Math.floor(Math.random() * colors.length);
        const rand2 = Math.floor(Math.random() * colors.length);
        divChar.style.color = colors[rand1];
        divChar.style.textShadow = '10px -5px ' + colors[rand2]
        divChar.innerHTML = char;
        divChar.classList.add('chars-adar');
        msgObj.append(divChar);
        mishArr.push(char);
        indexAdar++;
        if (indexAdar > mishMsg.length) {
            indexAdar = 0;
            msgObj.innerHTML = '';
            mishArr = [];
        }
    }
    else {
    msgObj.classList.add('msg');
    mainImage.classList.remove("image-adar");
    Array.from(divsToHide).forEach(div => div.classList.remove('hide'));
    seconds / 10 % 3 == 0
  
    let msg = specifyMsg[Math.floor(seconds / 10 % specifyMsg.length)];
    let msgText = msg?.text   || MESSAGE;
    let color = msg?.color || 'black';
  
    if (window.screen.height < 400 && window.screen.width < 900) {
        sizeForAndroid = 0.5;
    }

    if (window.innerHeight == 551 && window.innerWidth == 980 && window.screen.height == 540 && window.screen.width == 960) {
        sizeForAndroid = 0.55;
        t(writeSize)
    }

    msgObj.style.fontSize = (10 - msgText.length / 10) * sizeForAndroid + 'vw';
    msgObj.style.color = color;
    msgObj.innerHTML = msgText.replace('%', '<div>').replace('@', '</div>').replace('%', '<div class="in-div">').replace('@', '</div>');

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

function isShowZmanMoilad() {
    const currentMonth = new Hebcal.Month(month, year);
    if (currentMonth.find('shabbat_mevarchim').length && currentMonth.find('shabbat_mevarchim')[0].day == dayInMonth && ((hours == 9 && minutes > 10) || (hours == 10 && minutes < 59))) {
        return true;
    }

}

// function showZmanMoilad(day, hours, minutes) {

// // TODO המולד של חודשים אדר תמוז אלול לא תקינים
//     if (currentMonth.find('shabbat_mevarchim').length && currentMonth.find('shabbat_mevarchim')[0].day == dayInMonth && ((hours == 9 && minutes > 40) || (hours == 10 && minutes < 52))) {
//         return calculateMoiladAndGetMoiladText()



// const moilad = currentMonth.next().next().molad();
// const moiladDay = days[moilad.doy];
// const dayOrNight = moilad.hour >= 6 && moilad.hour < 18 ? 'ביום ' : 'בליל ';
// const moiladTime = (moilad.hour % 12 || 12) + ':' + moilad.minutes + '';
// const moiladChalakim = moilad.chalakim;
// // const moiladText = (' המולד יהיה ' + dayOrNight + moiladDay + ' בשעה ' + moiladTime + ' ו-' + moiladChalakim + ' חלקים');
// const moiladText = 'המולד יהיה בליל שישי 7:02'; //TODO remove after SHVAT
// return moiladText;
//     }
// }

function isZom(date, day) {
    let isLeapYear = new Hebcal.Month(month, year).isLeapYear();
    if (date < day.getZemanim().chatzot || date > day.getZemanim().tzeit) {
        return false;
    }
    const tamuzZom = month == 4 && ((dayInWeek == 0 && dayInMonth == 18) || (dayInWeek != 6 && dayInMonth == 17));
    //     const avZom = month == 5 && ((dayInWeek == 0 && dayInMonth == 10) || (dayInWeek != 6 && dayInMonth == 9)); 
    const tishreiZom = month == 7 && ((dayInWeek == 0 && dayInMonth == 4) || (dayInWeek != 6 && dayInMonth == 3));
    const tevetZom = month == 10 && dayInMonth == 11;
    const adar = isLeapYear ? 13 : 12;
    const adarZom = month == adar && ((dayInWeek == 4 && dayInMonth == 11) || (dayInWeek != 6 && dayInMonth == 13));
    return tamuzZom || tishreiZom || tevetZom || adarZom;
}

function isStartAseretYemeiTeshuva() {
    if (month == 7 && [1, 2, 3, 4].includes(dayInMonth)) {
        return true;
    }
    
}

function isHolidayOrCholHamoed() {
    const roshChodesh = dayInMonth == 30 || dayInMonth == 1;
    // const roshChodeshBug = month != 5 && month != 6 && dayInMonth == 2;
    const cholHamoedDays = [15, 16, 17, 18, 19, 20, 21];
    const pesach = month == 1 && cholHamoedDays.includes(dayInMonth);
    const shavuot = month == 3 && dayInMonth == 6;
    const roshHashana = month == 7 && dayInMonth == 2;
    const cipur = month == 7 && dayInMonth == 10;
    const sucot = month == 7 && (cholHamoedDays.includes(dayInMonth) || dayInMonth == 22);
    return roshChodesh || pesach || shavuot || sucot;
}

function isNearToSofZman(time, now) {
    if (time - now < (1000 * 60 * 15) && time - now > -(1000 * 60)) {
        return true;
    }
    return false;
}

function isNearToShkiah(time, now) {
    if (time - now < (1000 * 60 * 30) && time - now > -(1000 * 60)) {
        return true;
    }
    return false;
}

function isShowTehilim() {
    //debugger;
    if (dayInWeek != 6) {
        if ([6, 7, 8, 9].includes(hours) || (hours == 10 && minutes < 20)) {
            return true;
        }
    }
    return false;
}

function isSiumMasechet(day) {

    const tomorow = day.next();
    const dafTomorowArr = tomorow.dafyomi().split(" ");
    return dafTomorowArr[dafTomorowArr.length - 1] == 2;
}

function getHebObj(date) {
    return new Hebcal.HDate(date);
}

function isAlHanisim() {
    const chanucaDays = [25, 26, 27, 28, 29, 30];
    const cislevSmall = new Hebcal.HDate("כו כסלו").daysInMonth() == 29;
    let isLeapYear = new Hebcal.Month(month, year).isLeapYear();
    const chanucaCislev = month == 9 && chanucaDays.includes(dayInMonth);
    const chanucaTevet = month == 10 && (dayInMonth == 1 || dayInMonth == 2 || cislevSmall && dayInMonth == 3);
    const adar = isLeapYear ? 13 : 12;
    const purim = dayInMonth == 14 && month == adar;
    return chanucaCislev || chanucaTevet || purim;
}

function isSpeakTehilim() {
    if (dayInWeek != 6 && (month == 7 || (month == 6 && dayInWeek != 5))) {
        if ([6, 7, 8, 9].includes(hours) || (hours == 10 && minutes < 20)) {
            return true;
        }
    }
}

function getTehilimDay() {
    const elulYear = month == 6 ? year : year - 1;
    const tishreiYear = month == 7 ? year : year + 1;
    const elulDays = new Hebcal.HDate(1, 6, elulYear).getMonthObject().days;
    const tishreiDays = new Hebcal.HDate(1, 7, tishreiYear).getMonthObject().days.slice(2, 8);
    const elulAndTishrei = [...elulDays, ...tishreiDays];
    let seder = 1;
    for (let i = 0; i < elulAndTishrei.length; i++) {
        const d = elulAndTishrei[i];
        if (d.getDay() != 6 && (d.getDay() != 5 || d.day == 29)) {

            console.log("seder:", seder);
            console.log("יום בשבוע:", d.getDay() + 1);
            console.log("יום בחודש:", d.day);
            if (d.day == dayInMonth && d.month == month) {
                return daysInMonth[seder];
            }
            seder++;
        }
    }
}

function isStartMoridHatal() {
    if (month == 1) {
        if (dayInMonth == 16 || (dayInMonth == 15 && hours > 10 && hours < 19)) {
            return true;
        }
    }
}

function isStartBorchenu() {
    if (month == 1 && (dayInMonth == 16 || dayInMonth == 17 || dayInMonth == 18) && dayInWeek != 6) {
        return true;
    }
}

function isEndColelim() {
    const HH = hours;
    const MM = minutes;
    return !isHoliday && (dayInWeek != 5 && (HH == 13 || HH == 19) && (Math.floor(MM / 10) == 0 || Math.floor(MM / 10) == 1) || 
            (dayInWeek == 5 && HH == 13 && (Math.floor(MM / 10) == 0 || Math.floor(MM / 10) == 1))
);
}

function getSefira(omerDay) {
    const and = omerDay % 10 == 0 ? '': ' ו';
    const units = omerDay % 10;
    const tens = omerDay - units;
    const YOM = omerDay > 10 ? 'יום' : 'ימים';
    const WEEKS = omerDay >= 7 ? ' שהם ' + (unitsInOmer[Math.floor(omerDay / 7)] + ' שבועות').replace('אחד שבועות', 'שבוע אחד') : '';
    const TENS_IN_OMER = omerDay > 9 ? (and + tensInOmer[tens / 10] + ' ').replace('עשר ', 'עשרה ').replace('ועשרה ', 'עשר ') : ' ';
    const UNITS_IN_OMER = unitsInOmer[units];
    const DAYS_IN_WEEK = (omerDay >= 8 && omerDay % 7 != 0) ? ' ו' + (unitsInOmer[omerDay % 7] + ' ימים').replace('אחד ימים','יום אחד') : '';
    const omerDays = (UNITS_IN_OMER + TENS_IN_OMER + YOM).replace('אחד ימים', 'יום אחד').replace('י ו', 'ים ו').replace('י ע', 'ים ע');
    return "היום " + omerDays + WEEKS + DAYS_IN_WEEK + " לעומר";
    
}

function getParsha() {
    let label = ' פרשת ';
    let parsha = dayUntil12.getParsha('h').join(' ') || '';
    if (['חול המועד פסח', 'חול המועד סוכות', 'שמיני עצרת', 'יום כיפור', 'שביעי של פסח'].includes(parsha)) {
        label = ' שבוע של ';
    }
    if (parsha == 'שביעי של פסח') {
        debugger;
        parsha = ' פסח ';
    }

    return label + parsha;
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

function isSizeOfShtibel() {
    return  window.innerHeight == 551 && window.innerWidth == 980 && window.screen.height == 540 && window.screen.width == 960;   
}

function isStartMoridHageshem() {
    if (month == 7) {
        if (dayInMonth == 24 || dayInMonth == 23 || (dayInMonth == 22 && hours > 10 && hours < 19)) {
            return true;
        }
    }
}

function isStartBorechOlenu() {
    if (month == 8 && (dayInMonth == 7 || dayInMonth == 8) && dayInWeek != 6) {
        return true;
    }
}

function calculateMoiladAndGetMoiladText() {
    switch (month) {
        case 2:
            return "המולד יהיה ביום שלישי 9:14 ו- 3 חלקים";
        case 3:
            return "המולד יהיה בליל חמישי 9:58 ו- 4 חלקים";
        case 4:
            return "המולד יהיה ביום שישי 10:42 ו- 5 חלקים";
        case 5:
            return "המולד יהיה במוצ״ש 11:26 ו- 6 חלקים";
        case 6:
            return "המולד יהיה ביום שני 12:10 ו- 7 חלקים";
        case 7:
            return "המולד יהיה בליל רביעי 12:54 ו- 8 חלקים";
        case 8:
            return "המולד יהיה ביום חמישי 01:38 ו- 9 חלקים";
        case 9:
            return "המולד היה אתמול בלילה בשעה 02:22 ו- 10 חלקים";
        default:
            break;
    }
    const ROUND_OF_MOON = 2551443000   // ((29.5 * 24 * 60 + 44) * 60 + 3) * 1000;
    const BRACK_TIME = 591594000;  // In ms that the time started before the Moilad;
    const timeOfToday = new Date().getTime();
    const amount = Math.round((timeOfToday - BRACK_TIME) / ROUND_OF_MOON);
    const moiladDay = new Date(BRACK_TIME + ROUND_OF_MOON * (amount + 2));
    hebrewMoiladDay = new Hebcal.HDate(moiladDay);
    if (hebrewMoiladDay.sunset() < moiladDay.getTime()) {
        moiladDay.setDate(moiladDay.getDate() + 1);
    }
    const moiladDayInWords = days[moiladDay.getDay()];
    const dayOrNight = moiladDay.getUTCHours() >= 6 && moiladDay.getUTCHours() < 18 ? 'ביום ' : 'בליל ';
    const moladHours = moiladDay.getUTCHours();
    const moladMinutes = moiladDay.getUTCMinutes();
    const moladSeconds = moiladDay.getUTCSeconds();
    const totalChalakim = (moladHours * 1080) + (moladMinutes * 18) + Math.floor(moladSeconds / 3);
    const chalakim = totalChalakim % 18;   
    moiladDay.setHours(moiladDay.getUTCHours() + 2);
    const moiladTime = format_time(moiladDay)
    let chalakimText;
    if (chalakim == 0) {
        chalakimText = '';
    }
    else if (chalakim == 1) {
        chalakimText = ' וחלק אחד';
    } else {
        chalakimText = ' ו-' + chalakim + ' חלקים';
    }
    const moiladText = (' המולד יהיה ' + dayOrNight + moiladDayInWords + ' בשעה ' + moiladTime + chalakimText);
    console.log("moiladText:", moiladText );
    return moiladText;

}

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

setInterval(() => {
    insertIn('#time', (formatTimeWithSeconds(new Date())));
}, 1000);

Hebcal.events.on('ready', refresh());



