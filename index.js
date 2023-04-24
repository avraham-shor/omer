
const days = ['ראשון','שני','שלישי','רביעי','חמישי','ששי','שבת'];

const daysInMonth = ['','א','ב','ג','ד','ה','ו','ז','ח','ט','י','יא','יב','יג','יד','טו','טז','יז','יח','יט','כ','כא','כב','כג','כד','כה','כו','כז','כח','כט','ל'];

const VAL = {0: '', 1: 'א', 2: 'ב', 3: 'ג', 4: 'ד', 5: 'ה', 6: 'ו', 7: 'ז', 8: 'ח', 9: 'ט', 10: 'י', 20: 'כ', 30: 'ל', 40: 'מ', 50: 'נ', 60: 'ס', 70: 'ע', 80: 'פ', 90: 'צ', 100: 'ק', 200: 'ר', 300: 'ש', 400: 'ת'};

let dayOrNight = 'יום ';

const MESSAGE = 'כאן בביהכ"נ אוסרים הדיבור בכל שעת התפילה מתחילתה ועד סופה';

//const MESSAGES_SHABAT = MESSAGES.slice(0, -1);

let positionInArray = 0;

const zmanObj = {};

let opacity = 1;
let changeOpacity = 1;




function refresh() {
    let specifyMsg =  []; 
    let date = new Date();
    let date2 = new Date();
    let dateLater = new Date();
    let dateEarlier = new Date();
    dateLater = dateLater.setMinutes(dateLater.getMinutes() - 13);
    dateEarlier = dateEarlier.setMinutes(dateEarlier.getMinutes() + 29);
   
    let day = new Hebcal.HDate();
    
    if (day.sunset() < dateLater) {
        day = day.next();
        dayOrNight = 'ליל ';
    }
    else dayOrNight = 'יום ';
    

    


    const omerDay = day.omer();
    const daf = day.dafyomi('h');
    const dayOfMonth = daysInMonth[day.day];
    const month = day.getMonthName('h');
    const yearNumber = day.getFullYear() - 5700;
    const units = yearNumber % 10;
    const tens = yearNumber - units;
    const yearHebrew = 'תש' + (!units? '"' : '') + VAL[tens] + (units? '"' + VAL[units] : '');
    
    const SHKIAH_STR = 'שקיעת החמה ' + format_time(new Date(day.sunset().setMinutes(day.sunset().getMinutes() + 1)));
    const DAF_STR = 'דף היומי ' + daf;
    const SHMA_STR1 = "זמן א'  " + format_time(day.getZemanim().sof_zman_shma_A);
    const SHMA_STR2 = "זמן ב'  " + format_time(day.getZemanim().sof_zman_shma);
    const DATE_STR = dayOfMonth + ' ' + month + ' ' + yearHebrew;
    const netz = 'נץ החמה: ' + format_time(day.getZemanim().neitz_hachama);
    const mincha = 'מנחה: ' + format_time(day.getZemanim().mincha_gedola);
    const nerot = 'הדלקת נרות:%' + format_time(new Date(day.sunset().setMinutes(day.sunset().getMinutes() - 29))) + '@';
    
    // zmanObj["shkiah"] = SHKIAH_STR;
    // zmanObj["daf"] = DAF_STR;
    // zmanObj["shma1"] = SHMA_STR1;
    // zmanObj["shma2"] = SHMA_STR2;
    // zmanObj["netz"] = netz;
    // zmanObj["mincha"] = mincha;
    // zmanObj["nerot"] = nerot;

    insertIn('#time',(formatTimeWithSeconds(date2)));
    insertIn('#day',(dayOrNight + days[day.getDay()]).replace('ליל ראשון', 'מוצ"ש') + " פרשת " + (day.getParsha('h')[0] || ''));
    insertIn('#shkiah', SHKIAH_STR);
    insertIn('#daf', DAF_STR);
    insertIn('#shma2', SHMA_STR2);
    insertIn('#shma1', SHMA_STR1);
    insertIn('#date', DATE_STR);







    if (isHoliday(day)) {
        specifyMsg.push('יעלה ויבוא'); 
    }

    if (isZom(date, day)) {
        specifyMsg.push('עננו')
    }
    
    if(day.month == 5 && ((day.getDay() == 0 && day.day == 10) || (day.getDay() != 6 && day.day == 9))) {
         specifyMsg.push('נחם%עננו@')
    }

    if (isStartMoridHatal(day, date)) {
        specifyMsg.push('מוריד הטל')
    }

    if (isStartBorchenu(day)) {
        specifyMsg.push('ברכנו')
    }

    if (isStartMoridHageshem(day, date)) {
        specifyMsg.push('משיב הרוח%ומוריד הגשם@')
    }

    if (isStartBorechOlenu(day)) {
        specifyMsg.push('ברך עלינו')
    }

    if (isAlHanisim(day)) {
        specifyMsg.push('על הניסים')
    }
   // "<div></div>"

    // if (!specifyMsg.length) {
    //     specifyMsg.push('כאן בביהכ"נ אוסרים הדיבור בכל שעת התפילה מתחילתה ועד סופה');
    // }
    // console.log(specifyMsg);

    let src = 'images/SfiratHaomer' + omerDay + '.jpg';

    let isLeapYear = new Hebcal.Month(day.month, day.year).isLeapYear();
    const adar = isLeapYear? 13 : 12;
    // const adarDays = day.month == adar || (day.month == 11 && day.day == 30);
    if (omerDay == 0) {
        src = 'images/empty.jpg';
        setMessages(date, day, specifyMsg);        
    }

    if (omerDay > 0) {
        document.querySelector('#omer img').classList.add("up");
        setCandles(day, dateEarlier);
        
    }
    else {
        document.querySelector('#omer img').classList.remove("up");
    }
    
    
    if (day.month == adar || (day.month == 11 && day.day == 30)) {
        // src = 'images/purimBG.pdf'

        const purimSrc = 'images/purim' + Math.round(date.getMinutes() / 3) % 10 + '.jpg';
        // console.log(Math.round(date.getMinutes() / 3) % 10);
        // console.log(Math.round(date.getMinutes() / 3));
        const purim = document.getElementById('purim');
        purim.src = purimSrc;
        opacity = opacity + 1*changeOpacity;
        purim.style.opacity = opacity > -1? (opacity / 100) : 0;
        
        if (opacity >= 300) {
            changeOpacity *= -1;
        }
       if (opacity < -300) {
        changeOpacity *= -1;
       }
        
        // console.log(purim.style.opacity);
    }
    document.querySelector('#omer img').src = src;



    setTimeout('refresh()', 1000);

    

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
    let msgText = specifyMsg[(specifyMsg.length - 1) % minutes] || 'כאן בביהכ"נ אוסרים הדיבור בכל שעת התפילה מתחילתה ועד סופה';
    
    const moiladTxt = showZmanMoilad(day, hours, minutes);
    if (moiladTxt) {
        msgText = moiladTxt;
    }

    const msgObj = document.querySelector('#msg');
    msgObj.style.fontSize = 9.6 - msgText.length / 12 + 'rem';
    msgObj.innerHTML = msgText.replace('%', '<div class="in-div">').replace('@', '</div>');
    //debugger
    if (specifyMsg.length || moiladTxt) {
        msgObj.classList.add('red');
    }
    else {
        msgObj.classList.remove('red');
    }

    // if (isAdar) {
    //     msgObj.classList.add('hide')
    // }
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

function showZmanMoilad(day, hours, minutes) {
    const currentMonth = new Hebcal.Month(day.month, day.year);
    
   
    if (currentMonth.find('shabbat_mevarchim').length && currentMonth.find('shabbat_mevarchim')[0].day == day.day && ((hours == 9 && minutes > 50) || (hours == 10 && minutes < 32))) {
        const moilad = currentMonth.next().molad();
        const moiladDay = days[moilad.doy];
        const dayOrNight = moilad.hour >= 6 && moilad.hour < 18? 'ביום ' : 'בליל ';
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
    const tishreiZom = day.month == 7 &&( (dayInWeek == 0 && day.day == 4) || (dayInWeek != 6 && day.day == 3));
    const tevetZom = day.month == 10 && day.day == 11;
    const adar = isLeapYear? 13 : 12;
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
    const sucot  = day.month == 7 && (cholHamoedDays.includes(day.day) || day.day == 22);
    return roshChodesh || pesach || shavuot || roshHashana || cipur || sucot;
}

// function isHoliday(day) {
//     const holidayDates = ["טו ניסן","טז ניסן","יז ניסן","יח ניסן","יט ניסן","כ ניסן","כא ניסן",
//                         "ו סיון","א תשרי","ב תשרי","י תשרי","טו תשרי","טז תשרי","יז תשרי","יח תשרי","יט תשרי","כ תשרי","כא תשרי","כב תשרי"];
//     const holidayObjects = holidayDates.map(date => getHebObj(date));
//     console.log(holidayObjects.map(d=> d.day),"day: ", day.day);
//     return holidayObjects.filter(holiday=> day.isSameDate(holiday)).length > 0;

// }

function getHebObj(date) {
    return new Hebcal.HDate(date);
}

function isAlHanisim(day) {
    const chanucaDays = [25, 26, 27, 28, 29, 30];
    const cislevSmall = new Hebcal.HDate("כו כסלו").daysInMonth() == 29;
    let isLeapYear = new Hebcal.Month(day.month, day.year).isLeapYear();
    const chanucaCislev = day.month == 9 && chanucaDays.includes(day.day);
    const chanucaTevet = day.month == 10 && (day.day == 1 || day.day == 2 || day.day == 3 || cislevSmall && day.day == 4);
    const adar = isLeapYear? 13 : 12;
    const purim = day.day == 15 && day.month == adar;
    return chanucaCislev || chanucaTevet || purim;
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

function isStartMoridHageshem(day, date) {
    const hours = date.getHours();
    if (day.month == 7) {
        if (day.day == 24 || day.day == 23 || (day.day == 22 && hours > 10 && hours < 19)) {
          return true;  
        }
    }
}

function isStartBorechOlenu(day) {
    if (day.month == 8 && (day.day == 7 || day.day == 8 || day.day == 9) && day.getDay() != 6) {
       return true;
    }
}

Hebcal.events.on('ready', refresh());


