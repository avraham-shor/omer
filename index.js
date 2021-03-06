
const days = ['ראשון','שני','שלישי','רביעי','חמישי','ששי','שבת'];
let dayOrNight = 'יום ';

const MESSAGES = ['נא לשמור על ניקיון וקדושת בית הכנסת!', 
'כאן בביהכ"נ אוסרים הדיבור בכל שעת התפילה מתחילתה ועד סופה',
'נא להחזיר את הספרים למקום',
'אמירת "קדיש יתום" ליד הבימה',
' אין להשתמש בסלולארי בתוך ביהמ"ד אלא לדברים נחוצים', 
];

const MESSAGES_SHABAT = MESSAGES.slice(0, -1);

let positionInArray = 0;

const zmanObj = {};




function refresh() {
    let specifyMsg =  []; 
    let date = new Date();
    let dateLater = new Date();
    dateLater = dateLater.setMinutes(dateLater.getMinutes() - 18);
    var day = new Hebcal.HDate();
    
    if (day.sunset() < dateLater) {
        day = day.next();
        dayOrNight = 'ליל ';
    }
    else dayOrNight = 'יום ';
    

    var omerDay = day.omer();
    let daf = day.dafyomi('h');
    const SHKIAH_STR = 'שקיעה:  ' + format_time(new Date(day.sunset().setMinutes(day.sunset().getMinutes() + 2)));
    const DAF_STR = '  דף היומי:   ' + daf;
    const SHMA_STR1 = 'סו"ז קר"ש א:  ' + format_time(day.getZemanim().sof_zman_shma_A);
    const SHMA_STR2 = 'סו"ז קר"ש ב:  ' + format_time(day.getZemanim().sof_zman_shma);
    const netz = 'נץ החמה: ' + format_time(day.getZemanim().neitz_hachama);
    const mincha = 'מנחה: ' + format_time(day.getZemanim().mincha_gedola);
    const nerot = 'הדלקת נרות: ' + format_time(new Date(day.sunset().setMinutes(day.sunset().getMinutes() - 28)));
    
    zmanObj["shkiah"] = SHKIAH_STR;
    zmanObj["daf"] = DAF_STR;
    zmanObj["shma1"] = SHMA_STR1;
    zmanObj["shma2"] = SHMA_STR2;
    zmanObj["netz"] = netz;
    zmanObj["mincha"] = mincha;
    zmanObj["nerot"] = nerot;

    if (isHoliday(day)) {
        specifyMsg.push('יעלה ויבוא'); 
    }

    if (isZom(date, day)) {
        specifyMsg.push('עננו')
    }

    if (isStartMoridHatal(day, date)) {
        specifyMsg.push('מוריד הטל')
    }

    if (isStartBorchenu(day)) {
        specifyMsg.push('ברכנו')
    }

    if (isStartMoridHageshem(day, date)) {
        specifyMsg.push('משיב הרוח ומוריד הגשם')
    }

    if (isStartBorechOlenu(day)) {
        specifyMsg.push('ברך עלינו')
    }

    if (isAlHanisim(day)) {
        specifyMsg.push('על הניסים')
    }
    

    if (!specifyMsg.length) {
        specifyMsg.push('כאן בביהכ"נ אוסרים הדיבור בכל שעת התפילה מתחילתה ועד סופה');
    }
    // console.log(specifyMsg);

    let src = 'images/SfiratHaomer' + omerDay + '.jpg';
    if (omerDay == 0) {

        src = 'images/empty.jpeg';
        setMessages(date, day, specifyMsg);
        
    }
    document.querySelector('#omer img').src = src;

    setTimeout('refresh()', 1000);

}

function insertIn(divId, text, isAvailable) {
    document.querySelector(divId).innerHTML = isAvailable ? text : '';
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
    let msgText = 'כאן בביהכ"נ אוסרים הדיבור בכל שעת התפילה מתחילתה ועד סופה';
    
    let msgs = !isShabat? MESSAGES : MESSAGES_SHABAT;

    
    if (seconds % 20 === 0) {
        positionInArray = Math.floor(Math.random() * (20)); 
    }

    const regularMsg = msgs[positionInArray % msgs.length];

    const zmanList = setZmanList(dayInWeek, hours);

    const zman = zmanList[positionInArray % zmanList.length];

    const specifyMessage = specifyMsg[positionInArray % specifyMsg.length]


   
    

    switch (Math.floor(seconds / 10)) {
        case 0:
            msgText = regularMsg;
            break;

        case 1:
            msgText = zman;
            break;

        case 2:
            msgText = specifyMessage;
            break;
  
        case 3:
            msgText = regularMsg;
            break;

        case 4:
            msgText = zman;
                break;
 
        case 5:
            msgText = specifyMessage;
                break;
                                          
        default:
            break;
    };

    const moiladTxt = showZmanMoilad(day, hours, minutes);
    if (moiladTxt) {
        msgText = moiladTxt;
    }

    const msgObj = document.querySelector('#msg');
    msgObj.innerHTML = msgText;
    msgObj.style.fontSize = 9.5 - msgText.length / 16 + 'rem';

    
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
    
   
    if (currentMonth.find('shabbat_mevarchim').length && currentMonth.find('shabbat_mevarchim')[0].day == day.day && (hours == 9 && minutes > 50) || (hours == 10 && minutes < 32)) {
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
    const avZom = day.month == 5 && ((dayInWeek == 0 && day.day == 10) || (dayInWeek != 6 && day.day == 9)); 
    const tishreiZom = day.month == 7 &&( (dayInWeek == 0 && day.day == 5) || (dayInWeek != 6 && day.day == 4));
    const tevetZom = day.month == 10 && day.day == 11;
    const adar = isLeapYear? 13 : 12;
    const adarZom = day.month == adar && ((dayInWeek == 4 && day.day == 12) || (dayInWeek != 6 && day.day == 14));
    return tamuzZom || avZom || tishreiZom || tevetZom || adarZom;
}

function isHoliday(day) {
    const roshChodesh = day.day == 30 || day.day == 1;
    const roshChodeshBug = day.month != 5 && day.month != 6 && day.day == 2;
    const cholHamoedDays = [16, 16, 17, 18, 19, 20, 22];
    const pesach = day.month == 1 && cholHamoedDays.includes(day.day);
    const shavuot = day.month == 3 && day.day == 7;
    const roshHashana = day.month == 7 && (day.day == 2 || day.day == 3);
    const cipur = day.month == 7 && day.day == 11;
    const sucot  = day.month == 7 && (cholHamoedDays.includes(day.day) || day.day == 23);
    return roshChodesh || roshChodeshBug || pesach || shavuot || roshHashana || cipur || sucot;
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
        if (day.day == 24 || (day.day == 23 && hours > 10 && hours < 19)) {
          return true;  
        }
    }
}

function isStartBorechOlenu(day) {
    if (day.month == 8 && (day.day == 8 || day.day == 9) && day.getDay() != 6) {
       return true;
    }
}

Hebcal.events.on('ready', refresh());


