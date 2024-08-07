
//window.location.replace("https://aoklivestrim.com/");

//Globals;
const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

const daysInMonth = ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'יא', 'יב', 'יג', 'יד', 'טו', 'טז', 'יז', 'יח', 'יט', 'כ', 'כא', 'כב', 'כג', 'כד', 'כה', 'כו', 'כז', 'כח', 'כט', 'ל'];

const VAL = { 0: '', 1: 'א', 2: 'ב', 3: 'ג', 4: 'ד', 5: 'ה', 6: 'ו', 7: 'ז', 8: 'ח', 9: 'ט', 10: 'י', 20: 'כ', 30: 'ל', 40: 'מ', 50: 'נ', 60: 'ס', 70: 'ע', 80: 'פ', 90: 'צ', 100: 'ק', 200: 'ר', 300: 'ש', 400: 'ת' };

const tensInOmer = ['','עשר', 'עשרים', 'שלשים', 'ארבעים'];

const unitsInOmer = ['', 'אחד', 'שני', 'שלשה', 'ארבעה', 'חמשה', 'ששה', 'שבעה', 'שמונה', 'תשעה'];

// amont time nerot before shkiah in current city.
let nerotFromStorage;
//getAmountTimeNerotBeforeShkiah();

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

// //For Adar;
// const mishMsg = 'משנכנס אדר מרבים בשמחה'.split('');
// let mishArr = [];
// const colors = ['red', 'blue', 'yellow', 'green', 'orange', 'brown', 'black', 'purple', 'gold', 'pink', 'gray', 'turquoise', 'beige', 'maroon'];
// let indexAdar = 0;


// setMishenichnas();



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



    if (day.sunset() < dateLater && dateLater - day.sunset() > (22*60*1000) && dateLater - day.sunset() < (52*60*1000)) {
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



    const omerDay = day.omer();
    const masechtaAndDafArr = day.dafyomi('h').split(" ");
    const dayOfMonth = daysInMonth[dayInMonth];
    const monthHebrew = day.getMonthName('h');
    const yearNumber = day.getFullYear() - 5700;
    const sofZman1 = day.getZemanim().sof_zman_shma_A;
    const sofZman2 = day.getZemanim().sof_zman_shma;
    const units = yearNumber % 10;
    const tens = yearNumber - units;
    const yearHebrew = 'תש' + (!units ? '"' : '') + VAL[tens] + (units ? '"' + VAL[units] : '');
    const SHKIAH_STR = format_time(new Date(dayUntil12.sunset().setMinutes(dayUntil12.sunset().getMinutes() + 1)));
    const MASECHTA_STR = masechtaAndDafArr.slice(0, masechtaAndDafArr.length - 1).join(' ');
    const DAF_STR = masechtaAndDafArr[masechtaAndDafArr.length - 1];

    const SHMA_STR1 = "זמן א'  " + format_time(sofZman1);
    const SHMA_STR2 = "זמן ב'  " + format_time(sofZman2);
    const netz = 'נץ החמה: ' + format_time(day.getZemanim().neitz_hachama);
    const mincha = 'מנחה: ' + format_time(day.getZemanim().mincha_gedola);
    const nerot = 'הדלקת נרות%' + format_time(new Date(day.sunset().setMinutes(day.sunset().getMinutes() - (nerotFromStorage || 30) +1 ))) + '@';




    insertIn('#day', (dayOrNight + days[dayInWeek]).replace('ליל ראשון', 'מוצ"ש') + getParsha());
    insertIn('#shkiah', SHKIAH_STR);
    insertIn('#masechta', MASECHTA_STR);
    insertIn('#daf', DAF_STR);
    insertIn('#shma2', SHMA_STR2);
    insertIn('#shma1', SHMA_STR1);
    //insertIn('#date', DATE_STR);
    insertIn('#day-of-month', dayOfMonth);
    insertIn('#month', monthHebrew);
    insertIn('#year', yearHebrew);


    setIsHoliday();

    if (isSiumMasechet(day)) {
        specifyMsg.push({color: 'darkblue', text: 'הדרן עלך מסכת ' + MASECHTA_STR});
    }

    if (dayInWeek == 5 && dayOrNight == 'יום ') {
        specifyMsg.push({color: 'darkblue', text: nerot});
    }

    if (isNearToShkiah(day.sunset().setMinutes(day.sunset().getMinutes() + 1), date)) {
        specifyMsg.push({color: 'black', text: "%שקיעת החמה@%" + SHKIAH_STR});
    }


    if (isHolidayOrCholHamoed()) {
        specifyMsg.push({color: 'red', text: 'יעלה ויבוא'});
    }

    if (isZom(date, day)) {
        specifyMsg.push({color: 'red', text: 'עננו'});
    }

    if (month == 5 && ((dayInWeek == 0 && dayInMonth == 10) || (dayInWeek != 6 && dayInMonth == 9))) {
        specifyMsg.push({color: 'red', text: '%נחם%@עננו@'});
    }

    if (isStartMoridHatal()) {
        specifyMsg.push({color: 'red', text: 'מוריד הטל'});
    }

    if (isShowTehilim() && tehilimByDays[dayInMonth] && tehilimByDays[dayInMonth].length ) {
        specifyMsg.push({color: 'darkblue', text: `%פרקי תהלים@%` + tehilimByDays[dayInMonth] || ''});
    }
    
    if (isStartBorchenu()) {
        specifyMsg.push({color: 'red', text: 'ברכנו'});
    }

    if (isStartMoridHageshem()) {
        specifyMsg.push({color: 'red', text: '%משיב הרוח%@ומוריד הגשם@'});
    }

    if (isStartBorechOlenu()) {
        specifyMsg.push({color: 'red', text: 'ברך עלינו'});
    }

    if (isAlHanisim()) {
        specifyMsg.push({color: 'red', text: 'על הניסים'});
    }

    if (isNearToSofZman(sofZman2, date)) {
        specifyMsg.push({color: 'red', text: `%סוזק"ש ב'@%` + format_time(sofZman2)});
    }
    
    if (omerDay > 0) {
        specifyMsg.push({color: 'black', text: getSefira(omerDay)});
    }

    if (isNearToSofZman(sofZman1, date)) {
        specifyMsg.push({color: 'red', text: `%סוזק"ש א'@%` + format_time(sofZman1)});
    }

    if (isSpeakTehilim()) {
        const tehilimSeder = getTehilimDay();
        if (tehilimSeder) {
            specifyMsg.push({color: 'darkblue', text: `%תהלים@%` + 'סדר ' + tehilimSeder});   
        };
    }

    if (isEndColelim()) {
        specifyMsg.push({color: 'black', text: '%לומד יקר !@% אנא, החזר את הספרים שהשתמשת בהם למקומם.'});
    }

   // writeSize(opacity)
    let src = 'images/SfiratHaomer' + omerDay + '.jpg';

    if (omerDay == 0 || !isStartNight) {
        src = 'images/empty2.jpg';
        setMessages(day, specifyMsg);
        document.querySelector('#omer img').classList.remove("up");
    }

    if (omerDay > 0 && isStartNight) {
        document.querySelector('#omer img').classList.add("up");
        setCandles(day, dateEarlier);

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

function getAmountTimeNerotBeforeShkiah() {
    const minutes = localStorage.getItem('nerotBeforeShkiah');
    if (minutes) {
        nerotFromStorage = +minutes;
    }
    nerotFromStorage = setAndGetNerotToTheStorage();
}

function setAndGetNerotToTheStorage() {
    const minutes = prompt('כמה דקות לפני השקיעה, הדלקת הנרות בעירכם?');
    if (minutes && !isNaN(minutes)) {
        localStorage.setItem('nerotBeforeShkiah', minutes);
        return +minutes;
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
    // const mainImage = document.querySelector('#main-img');
    // const divsToHide = document.getElementsByClassName('dth');
    // if (month == 11 && dayInMonth == 29 && day.sunset() <= date && day.sunset() - date < (1000 * 60 * 15)) {
    //     Array.from(divsToHide).forEach(div => div.classList.add('hide'));

    //     debugger;
    //     msgObj.classList.remove('msg');
    //     msgObj.classList.add('msg-adar');
    //     mainImage.classList.add("image-adar");
    //     if (msgObj.innerHTML.includes('החמה')) {
    //         msgObj.innerHTML = '';
    //         indexAdar = 0;
    //         mishArr = [];

    //     }

    //     msgObj.style.fontSize = (22 - mishArr.length / 3) + 'rem';
    //     const char = mishMsg[indexAdar];
    //     const divChar = document.createElement('span');
    //     const rand1 = Math.floor(Math.random() * colors.length);
    //     const rand2 = Math.floor(Math.random() * colors.length);
    //     divChar.style.color = colors[rand1];
    //     divChar.style.textShadow = '10px -5px ' + colors[rand2]
    //     divChar.innerHTML = char;
    //     divChar.classList.add('chars-adar');
    //     msgObj.append(divChar);
    //     mishArr.push(char);
    //     indexAdar++;
    //     if (indexAdar > mishMsg.length) {
    //         indexAdar = 0;
    //         msgObj.innerHTML = '';
    //         mishArr = [];
    //     }
    // }
    // else {
    // msgObj.classList.add('msg');
    // mainImage.classList.remove("image-adar");
    // Array.from(divsToHide).forEach(div => div.classList.remove('hide'));
    //seconds / 10) % 3 == 0
    
    // let i = 0;
    // if (specifyMsg.length >= 0) {
    //     i = seconds / 15 % specifyMsg.length;
    //     console.log( i);

    // }

    let msg = specifyMsg[Math.floor(seconds / 10 % specifyMsg.length)];
    let msgText = msg?.text   || MESSAGE;
    let color = msg?.color || 'black';
    const moiladTxt = showZmanMoilad(day, hours, minutes);
    if (moiladTxt) {
        msgObj.style.lineHeight = '100%';
        msgText = moiladTxt;
    }
    // console.log('window.innerWidth:', window.innerWidth, 'window.innerHeight', window.innerHeight);
    // console.log('width:', window.screen.width, 'height:', window.screen.height)

    if (window.screen.height < 400 && window.screen.width < 900) {
        sizeForAndroid = 0.5;
    }
    msgObj.style.fontSize = (10 - msgText.length / 12) * sizeForAndroid + 'rem';
    msgObj.style.color = color;
    msgObj.innerHTML = msgText.replace('%', '<div>').replace('@', '</div>').replace('%', '<div class="in-div">').replace('@', '</div>');

}


function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}


function writeSize() {
    const innerHeight = window.innerHeight;
    const innerWidth = window.innerWidth;
    const height = window.screen.height;
    const width = window.screen.width;
   insertIn('#size', 'innerHeight: ' + innerHeight + '; innerWidth: ' + innerWidth + '; height: ' + height + '; width: ' + width); 
}

function showZmanMoilad(day, hours, minutes) {
    const currentMonth = new Hebcal.Month(month, year);


    if (currentMonth.find('shabbat_mevarchim').length && currentMonth.find('shabbat_mevarchim')[0].day == dayInMonth && ((hours == 9 && minutes > 40) || (hours == 10 && minutes < 52))) {
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
    let isLeapYear = new Hebcal.Month(month, year).isLeapYear();
    if (date < day.getZemanim().chatzot || date > day.getZemanim().tzeit) {
        return false;
    }
    const tamuzZom = month == 4 && ((dayInWeek == 0 && dayInMonth == 18) || (dayInWeek != 6 && dayInMonth == 17));
    //     const avZom = month == 5 && ((dayInWeek == 0 && dayInMonth == 10) || (dayInWeek != 6 && dayInMonth == 9)); 
    const tishreiZom = month == 7 && ((dayInWeek == 0 && dayInMonth == 4) || (dayInWeek != 6 && dayInMonth == 3));
    const tevetZom = month == 10 && dayInMonth == 11;
    const adar = isLeapYear ? 13 : 12;
    const adarZom = month == adar && ((dayInWeek == 4 && dayInMonth == 12) || (dayInWeek != 6 && dayInMonth == 14));
    return tamuzZom || tishreiZom || tevetZom || adarZom;
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
    const chanucaTevet = month == 10 && (dayInMonth == 1 || dayInMonth == 2 || dayInMonth == 3 || cislevSmall && dayInMonth == 4);
    const adar = isLeapYear ? 13 : 12;
    const purim = dayInMonth == 15 && month == adar;
    return chanucaCislev || chanucaTevet || purim;
}

function isSpeakTehilim() {
    if (dayInWeek != 6 && (month == 7 || (month == 6 && dayInWeek != 5))) {
        return true;
    }
}

function getTehilimDay() {
    const elulYear = month == 6 ? year : year - 1;
    const tishreiYear = month == 7 ? year : year + 1;
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
            if (d.day == dayInMonth && d.month == month) {
                return daysInMonth[seder];
            }
            seder++;
        }
    }
}

function isStartMoridHatal() {
    if (month == 1) {
        if (dayInMonth == 16 || (dayInMonth == 16 && hours > 10 && hours < 19)) {
            return true;
        }
    }
}

function isStartBorchenu() {
    if (month == 1 && (dayInMonth == 17 || dayInMonth == 18) && dayInWeek != 6) {
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
    const WEEKS = omerDay > 7 ? ' שהם ' + (unitsInOmer[Math.floor(omerDay / 7)] + ' שבועות').replace('אחד שבועות', 'שבוע אחד') : '';
    const TENS_IN_OMER = omerDay > 9 ? (and + tensInOmer[tens / 10] + ' ').replace('עשר ', 'עשרה ').replace('ועשרה ', 'עשר ') : ' ';
    const UNITS_IN_OMER = unitsInOmer[units];
    const DAYS_IN_WEEK = (omerDay > 8 && omerDay % 7 != 0) ? ' ו' + (unitsInOmer[omerDay % 7] + ' ימים').replace('אחד ימים','יום אחד') : '';
    const omerDays = (UNITS_IN_OMER + TENS_IN_OMER + YOM).replace('אחד ימים', 'יום אחד').replace('י ו', 'ים ו').replace('י ע', 'ים ע');
    return "היום " + omerDays + WEEKS + DAYS_IN_WEEK + " לעומר";
    
}

function getParsha() {
    let label = ' פרשת ';
    //TODO remove after shabat
    const parsha = dayUntil12.getParsha('h')[0] || '';

    if (['חול המועד פסח', 'חול המועד סוכות', 'שמיני עצרת'].includes(parsha)) {
        label = ' שבוע של ';
    }

    return label + parsha;
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
setInterval(() => {
    insertIn('#time', (formatTimeWithSeconds(new Date())));
}, 1000);

Hebcal.events.on('ready', refresh());



