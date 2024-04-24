
//window.location.replace("https://aoklivestrim.com/");
const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

const daysInMonth = ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'יא', 'יב', 'יג', 'יד', 'טו', 'טז', 'יז', 'יח', 'יט', 'כ', 'כא', 'כב', 'כג', 'כד', 'כה', 'כו', 'כז', 'כח', 'כט', 'ל'];

const VAL = { 0: '', 1: 'א', 2: 'ב', 3: 'ג', 4: 'ד', 5: 'ה', 6: 'ו', 7: 'ז', 8: 'ח', 9: 'ט', 10: 'י', 20: 'כ', 30: 'ל', 40: 'מ', 50: 'נ', 60: 'ס', 70: 'ע', 80: 'פ', 90: 'צ', 100: 'ק', 200: 'ר', 300: 'ש', 400: 'ת' };

let dayOrNight = 'יום ';



const MESSAGE = 'כאן בביהכ"נ אוסרים הדיבור בכל שעת התפילה מתחילתה ועד סופה';

let positionInArray = 0;

const zmanObj = {};

let opacity = 1;
let changeOpacity = 1;

let showTehilim = false;

let colorClass = 'black';


//For Adar;
const mishMsg = 'משנכנס אדר מרבים בשמחה'.split('');
let mishArr = [];
const colors = ['red', 'blue', 'yellow', 'green', 'orange', 'brown', 'black', 'purple', 'gold', 'pink', 'gray', 'turquoise', 'beige', 'maroon'];
let indexAdar = 0;


// setMishenichnas();



function refresh() {
    let specifyMsg = [];
    // const warningMsgs = [];
    let date = new Date();
    //let date2 = new Date();
    let dateLater = new Date();
    let dateEarlier = new Date();
    dateLater = dateLater.setMinutes(dateLater.getMinutes() - 13);
    dateEarlier = dateEarlier.setMinutes(dateEarlier.getMinutes() + 29);

    let day = new Hebcal.HDate();

    if (day.sunset() < dateLater) {
        day = day.next();
        dayOrNight = 'ליל ';
         isNight = true;
    }
    else {
        dayOrNight = 'יום ';
        isNight = false;
    }





    const omerDay = day.omer();
    const masechtaAndDafArr = day.dafyomi('h').split(" ");
    const dayOfMonth = daysInMonth[day.day];
    const month = day.getMonthName('h');
    const yearNumber = day.getFullYear() - 5700;
    const sofZman1 = day.getZemanim().sof_zman_shma_A;
    const sofZman2 = day.getZemanim().sof_zman_shma;
    const units = yearNumber % 10;
    const tens = yearNumber - units;
    const yearHebrew = 'תש' + (!units ? '"' : '') + VAL[tens] + (units ? '"' + VAL[units] : '');
    const SHKIAH_STR = format_time(new Date(day.sunset().setMinutes(day.sunset().getMinutes() + 2)));
    const MASECHTA_STR = masechtaAndDafArr.slice(0, masechtaAndDafArr.length - 1).join(' ');
    const DAF_STR = masechtaAndDafArr[masechtaAndDafArr.length - 1];

    const SHMA_STR1 = "זמן א'  " + format_time(sofZman1);
    const SHMA_STR2 = "זמן ב'  " + format_time(sofZman2);
    //const DATE_STR = dayOfMonth + ' ' + month + ' ' + yearHebrew;
    const netz = 'נץ החמה: ' + format_time(day.getZemanim().neitz_hachama);
    const mincha = 'מנחה: ' + format_time(day.getZemanim().mincha_gedola);
    const nerot = 'הדלקת נרות%' + format_time(new Date(day.sunset().setMinutes(day.sunset().getMinutes() - 28))) + '@';




    // zmanObj["shkiah"] = SHKIAH_STR;
    // zmanObj["daf"] = DAF_STR;
    // zmanObj["shma1"] = SHMA_STR1;
    // zmanObj["shma2"] = SHMA_STR2;
    // zmanObj["netz"] = netz;
    // zmanObj["mincha"] = mincha;
    // zmanObj["nerot"] = nerot;


    insertIn('#day', (dayOrNight + days[day.getDay()]).replace('ליל ראשון', 'מוצ"ש') + getParsha());
    insertIn('#shkiah', SHKIAH_STR);
    insertIn('#masechta', MASECHTA_STR);
    insertIn('#daf', DAF_STR);
    insertIn('#shma2', SHMA_STR2);
    insertIn('#shma1', SHMA_STR1);
    //insertIn('#date', DATE_STR);
    insertIn('#day-of-month', dayOfMonth);
    insertIn('#month', month);
    insertIn('#year', yearHebrew);



    if (isSiumMasechet(day)) {
        specifyMsg.push('הדרן עלך מסכת ' + MASECHTA_STR);
        showTehilim = true;
        colorClass = "blue";
    }

    if (day.getDay() == 5 && dayOrNight == 'יום ') {
        specifyMsg.push(nerot);
    }

    if (isNearToShkiah(day.sunset().setMinutes(day.sunset().getMinutes() + 1), date)) {
        specifyMsg.push("%שקיעת החמה@%" + SHKIAH_STR);
        colorClass = "black";
    }


    if (isHoliday(day)) {
        // const war = new Warning('יעלה ויבוא', 'red');
        specifyMsg.push('יעלה ויבוא');
        colorClass = "red";
    }

    if (isZom(date, day)) {
        specifyMsg.push('עננו');
        colorClass = "red";
    }

    if (day.month == 5 && ((day.getDay() == 0 && day.day == 10) || (day.getDay() != 6 && day.day == 9))) {
        specifyMsg.push('%נחם%@עננו@');
        colorClass = "red";
    }

    if (isStartMoridHatal(day, date)) {
        specifyMsg.push('מוריד הטל');
        colorClass = "red";
    }

    if (isStartBorchenu(day)) {
        specifyMsg.push('ברכנו');
        colorClass = "red";
    }

    if (isStartMoridHageshem(day, date)) {
        specifyMsg.push('%משיב הרוח%@ומוריד הגשם@');
        colorClass = "red";
    }

    if (isStartBorechOlenu(day)) {
        specifyMsg.push('ברך עלינו');
        colorClass = "red";
    }

    if (isAlHanisim(day)) {
        specifyMsg.push('על הניסים');
        colorClass = "red";
    }

    if (isShowTehilim(date, day) && tehilimByDays[day.day]) {
        specifyMsg.push(`%פרקי תהלים@%` + tehilimByDays[day.day] || '');
        showTehilim = true;
        colorClass = "blue";
    }
    //else showTehilim = false;

    if (isNearToSofZman(sofZman2, date) && Math.floor(date.getSeconds() / 10) % 3 == 0) {
        specifyMsg.push(`%סוזק"ש ב'@%` + format_time(sofZman2));
        colorClass = "red";
    }
    
    if (omerDay > 0 && Math.floor(date.getSeconds() / 10) % 3 == 1) {
        specifyMsg.push(daysInMonth[omerDay] + "' לעומר");
        colorClass = "blut";
    }

    if (isNearToSofZman(sofZman1, date) && Math.floor(date.getSeconds() / 10) % 3 == 0) {
        specifyMsg.push(`%סוזק"ש א'@%` + format_time(sofZman1));
        showTehilim = false;
        colorClass = "red";
    }

    if (isSpeakTehilim(day, date)) {
        const tehilimSeder = getTehilimDay(day);
        if (tehilimSeder) {
            specifyMsg.push(`%תהלים@%` + 'סדר ' + tehilimSeder);
            showTehilim = true;
        };
        colorClass = "blue";
    }





    // debugger;
    // console.log(Math.floor(date.getSeconds() / 20), date.getSeconds(), date.getSeconds() / 20)

   // writeSize(opacity)
    let src = 'images/SfiratHaomer' + omerDay + '.jpg';

    let isLeapYear = new Hebcal.Month(day.month, day.year).isLeapYear();
    const adar = isLeapYear ? 13 : 12;
    // const adarDays = day.month == adar || (day.month == 11 && day.day == 30);
    if (omerDay == 0 || !isNight) {
        src = 'images/empty2.jpg';
        setMessages(date, day, specifyMsg);
        document.querySelector('#omer img').classList.remove("up");
    }

    if (omerDay > 0 && isNight) {
        document.querySelector('#omer img').classList.add("up");
        setCandles(day, dateEarlier);

    }


    if (false && (day.month == 12 || day.month == 13 || (day.month == 11 && day.day == 30))) {
        // src = 'images/purimBG.pdf'

        const purimSrc = 'images/purim' + Math.round(date.getMinutes() / 3) % 10 + '.jpg';
        const purim = document.getElementById('purim');
        purim.src = purimSrc;
        opacity = opacity + 10 * changeOpacity;
        purim.style.opacity = opacity > -1 ? (opacity / 100) : 0;

        if (opacity >= 150) {
            changeOpacity *= -1;
        }
        if (opacity < -600) {
            changeOpacity *= -1;
        }

        // console.log(purim.style.opacity);
    }
    document.querySelector('#omer img').src = src;



    setTimeout('refresh()', 2000);



}

function setCandles(day, dateEarlier) {
    const candlesImages = document.querySelectorAll('.candles');
    if (day.getDay() == 6 || (day.getDay() == 5 && day.sunset() < dateEarlier)) {
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


function setMessages(date, day, specifyMsg) {
    const dayInWeek = day.getDay();
    const isShabat = dayInWeek == 6;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    let sizeForAndroid = 1;
    const msgObj = document.querySelector('#msg');
    const mainImage = document.querySelector('#main-img');
    const divsToHide = document.getElementsByClassName('dth');
    if (day.month == 11 && day.day == 29 && day.sunset() <= date && day.sunset() - date < (1000 * 60 * 15)) {
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
        let msgText = specifyMsg[specifyMsg.length - 1] || 'כאן בביהכ"נ אוסרים הדיבור בכל שעת התפילה מתחילתה ועד סופה';
        const moiladTxt = showZmanMoilad(day, hours, minutes);
        if (moiladTxt) {
            msgObj.style.lineHeight = '100%';
            msgText = moiladTxt;
        }
        console.log('window.innerWidth:', window.innerWidth, 'window.innerHeight', window.innerHeight);
        console.log('width:', window.screen.width, 'height:', window.screen.height)

        if (window.screen.height < 400 && window.screen.width < 900) {
            sizeForAndroid = 0.5;
        }
        msgObj.style.fontSize = (10 - msgText.length / 12) * sizeForAndroid + 'rem';
        msgObj.innerHTML = msgText.replace('%', '<div>').replace('@', '</div>').replace('%', '<div class="in-div">').replace('@', '</div>');

        if (msgObj.classList.length > 2 && !msgObj.classList.contains(colorClass)) {
            const classList = msgObj.classList.value.split(" ");
            const oldClass = classList[classList.length - 1];
            msgObj.classList.replace(oldClass, colorClass);
        }
    }
}


function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function setZmanList(dayInWeek, hours) {
    let zmanList = [];
    if (hours < 12 || hours > 19) {
        zmanList = [zmanObj["netz"], zmanObj["shma1"], zmanObj["shma2"]];
    }
    else {
        zmanList = [zmanObj["daf"], zmanObj["shkiah"]];
    }


    if (dayInWeek == 5) {
        zmanList.push(zmanObj["nerot"]);
    }
    //console.log('zmanList', zmanList);
    return zmanList;


}

function writeSize(opacity) {
    //const innerHeight = window.innerHeight;
    //const innerWidth window.innerWidth;
    //const height = window.screen.height;
    //const width = window.screen.width;
    insertIn('#size', 'opacity: ' + opacity);
}

function showZmanMoilad(day, hours, minutes) {
    const currentMonth = new Hebcal.Month(day.month, day.year);


    if (currentMonth.find('shabbat_mevarchim').length && currentMonth.find('shabbat_mevarchim')[0].day == day.day && ((hours == 9 && minutes > 40) || (hours == 10 && minutes < 52))) {
        const moilad = currentMonth.next().molad();
        const moiladDay = days[moilad.doy];
        const dayOrNight = moilad.hour >= 6 && moilad.hour < 18 ? 'ביום ' : 'בליל ';
        const moiladTime = (moilad.hour % 12 || 12) + ':' + moilad.minutes + '';
        const moiladChalakim = moilad.chalakim;
        let moiladTxt = (' המולד יהיה ' + dayOrNight + moiladDay + ' בשעה ' + moiladTime + ' ו-' + moiladChalakim + ' חלקים');
        return moiladTxt;
    }
}

function isZom(date, day) {
    let isLeapYear = new Hebcal.Month(day.month, day.year).isLeapYear();
    const dayInWeek = day.getDay();
    if (date < day.getZemanim().chatzot || date > day.getZemanim().tzeit) {
        return false;
    }
    const tamuzZom = day.month == 4 && ((dayInWeek == 0 && day.day == 18) || (dayInWeek != 6 && day.day == 17));
    //     const avZom = day.month == 5 && ((dayInWeek == 0 && day.day == 10) || (dayInWeek != 6 && day.day == 9)); 
    const tishreiZom = day.month == 7 && ((dayInWeek == 0 && day.day == 4) || (dayInWeek != 6 && day.day == 3));
    const tevetZom = day.month == 10 && day.day == 11;
    const adar = isLeapYear ? 13 : 12;
    const adarZom = day.month == adar && ((dayInWeek == 4 && day.day == 12) || (dayInWeek != 6 && day.day == 14));
    return tamuzZom || tishreiZom || tevetZom || adarZom;
}

function isHoliday(day) {
    const roshChodesh = day.day == 30 || day.day == 1;
    // const roshChodeshBug = day.month != 5 && day.month != 6 && day.day == 2;
    const cholHamoedDays = [15, 16, 17, 18, 19, 20, 21];
    const pesach = day.month == 1 && cholHamoedDays.includes(day.day);
    const shavuot = day.month == 3 && day.day == 7;
    const roshHashana = day.month == 7 && day.day == 2;
    const cipur = day.month == 7 && day.day == 10;
    const sucot = day.month == 7 && (cholHamoedDays.includes(day.day) || day.day == 22);
    return roshChodesh || pesach || shavuot || roshHashana || cipur || sucot;
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

function isShowTehilim(date, day) {
    //debugger;
    if (day.getDay() != 6) {
        if ([6, 7, 8, 9].includes(date.getHours()) || (date.getHours() == 10 && date.getMinutes() < 20)) {
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

function isAlHanisim(day) {
    const chanucaDays = [25, 26, 27, 28, 29, 30];
    const cislevSmall = new Hebcal.HDate("כו כסלו").daysInMonth() == 29;
    let isLeapYear = new Hebcal.Month(day.month, day.year).isLeapYear();
    const chanucaCislev = day.month == 9 && chanucaDays.includes(day.day);
    const chanucaTevet = day.month == 10 && (day.day == 1 || day.day == 2 || day.day == 3 || cislevSmall && day.day == 4);
    const adar = isLeapYear ? 13 : 12;
    const purim = day.day == 15 && day.month == adar;
    return chanucaCislev || chanucaTevet || purim;
}

function isSpeakTehilim(day, date) {
    if (day.getDay() != 6 && (day.month == 7 || (day.month == 6 && day.getDay() != 5))) {
        return true;
    }
}

function getTehilimDay(day) {
    const elulYear = day.month == 6 ? day.year : day.year - 1;
    const tishreiYear = day.month == 7 ? day.year : day.year + 1;
    debugger;
    const elulDays = new Hebcal.HDate(1, 6, elulYear).getMonthObject().days;
    const tishreiDays = new Hebcal.HDate(1, 7, tishreiYear).getMonthObject().days.slice(2, 8);
    const elulAndTishrei = [...elulDays, ...tishreiDays];
    let seder = 1;
    for (let i = 0; i < elulAndTishrei.length; i++) {
        const d = elulAndTishrei[i];
        if ((d.month == 6 && d.getDay() != 5 && d.getDay() != 6) || d.month != 6) {

            console.log("seder:", seder);
            console.log("יום בשבוע:", d.getDay() + 1);
            console.log("יום בחודש:", d.day);
            if (d.day == day.day && d.month == day.month) {
                return daysInMonth[seder];
            }
            seder++;
        }
    }
}

function isStartMoridHatal(day, date) {
    const hours = date.getHours();
    if (day.month == 1) {
        if (day.day == 16 || (day.day == 16 && hours > 10 && hours < 19)) {
            return true;
        }
    }
}

function isStartBorchenu(day) {
    if (day.month == 1 && (day.day == 17 || day.day == 18) && day.getDay() != 6) {
        return true;
    }
}

function getParsha() {
    let label = ' פרשת ';
    const parsha = new Hebcal.HDate().getParsha('h')[0] || '';

    if (['חול המועד פסח', 'חול המועד סוכות', 'שמיני עצרת'].includes(parsha)) {
        label = ' שבוע של ';
    }

    return label + parsha;
}

function isStartMoridHageshem(day, date) {
    const hours = date.getHours();
    if (day.month == 7) {
        if (day.day == 24 || day.day == 23 || (day.day == 22 && hours > 10 && hours < 19)) {
            return true;
        }
    }
}

function isStartBorechOlenu(day) {
    if (day.month == 8 && (day.day == 7 || day.day == 8) && day.getDay() != 6) {
        return true;
    }
}
setInterval(() => {
    insertIn('#time', (formatTimeWithSeconds(new Date())));
}, 1000);

Hebcal.events.on('ready', refresh());


// class Warning {
//     msg;
//     color;
//     fontSize;
//     constructor(msg, color) {
//         this.msg = msg;
//         this.color = color;
//     }
// }


