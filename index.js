
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

let specifyMsg =  []; 



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
    

    var omerDay = day.omer();
    let daf = day.dafyomi('h');
    const SHKIAH_STR = 'שקיעה:  ' + format_time(new Date(day.sunset().setMinutes(day.sunset().getMinutes() + 2)));
    const DAF_STR = 'דף היומי:  ' + daf;
    const SHMA1 = day.getZemanim().sof_zman_shma_A.getTime();
    const SHMA2 = day.getZemanim().sof_zman_shma.getTime();
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


    if (day.day == 30 || day.day == 1) {
        specifyMsg.push('יעלה ויבוא'); 
    }

    else if (getTaniyot(date, day)) {
        specifyMsg.push('עננו')
    }

    else {
            specifyMsg.push('כאן בביהכ"נ אוסרים הדיבור בכל שעת התפילה מתחילתה ועד סופה');

    }


    let src = 'images/SfiratHaomer' + omerDay + '.jpg';
    if (omerDay == 0) {

        src = 'images/empty.jpeg';
        setMessages(date, day);
        
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


function setMessages(date, day) {
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
    if (hours < 12) {
        zmanList = [zmanObj["netz"], zmanObj["shma1"], zmanObj["shma2"]];
    }
    else {
         zmanList = [zmanObj["daf"], zmanObj["shkiah"]];
    }
   

    if (dayInWeek == 5) {
       zmanList.push(zmanObj["nerot"]);
    }
    return zmanList;


}

function showZmanMoilad(day, hours, minutes) {
    let currentMonth = new Hebcal.Month(day.month, day.year);
   
    if (currentMonth.find('shabbat_mevarchim')[0].day == day.day && hours == 10 && minutes < 32) {
        const moilad = currentMonth.molad();
        const moiladDay = days[moilad.doy];
        const dayOrNight = moilad.hour >= 6 && moilad.hour < 18? 'ביום ' : 'בליל ';
        const moiladTime = (moilad.hour % 12 || 12) + ':' + moilad.minutes + '';
        const moiladChalakim = moilad.chalakim;
         let moiladTxt = (' המולד יהיה ' + dayOrNight + moiladDay + ' בשעה ' + moiladTime + ' ו-' + moiladChalakim + ' חלקים');
         return moiladTxt;
    }
}

function getTaniyot(date, day) {
    let isLeapYear = new Hebcal.Month(day.month, day.year).isLeapYear();
    const dayInWeek = day.getDay();
    if (date < day.getZemanim().chatzot || date > day.getZemanim().tzeit) {
        return false;
    }
    let tamuzZom = day.month == 4 && ((dayInWeek == 0 && day.day == 18) || (dayInWeek != 6 && day.day == 17));
    let avZom = day.month == 5 && ((dayInWeek == 0 && day.day == 10) || (dayInWeek != 6 && day.day == 9)); 
    let tishreiZom = day.month == 7 &&( (dayInWeek == 0 && day.day == 4) || (dayInWeek != 6 && day.day == 3));
    let tevetZom = day.month == 10 && day.day == 10;
    let adar = isLeapYear? 13 : 12;
    let adarZom = day.month == adar && ((dayInWeek == 4 && day.day == 11) || (dayInWeek != 6 && day.day == 13));
    return tamuzZom || avZom || tishreiZom || tevetZom || adarZom;
}



Hebcal.events.on('ready', refresh());


