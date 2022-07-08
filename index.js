let isShowTimes = false;

const days = ['ראשון','שני','שלישי','רביעי','חמישי','ששי','שבת'];
let dayOrNight = 'יום ';

const MESSAGES = ['נא לשמור על ניקיון וקדושת בית הכנסת!', 
'כאן בביהכ"נ אוסרים הדיבור בכל שעת התפילה מתחילתה ועד סופה.',
'נא להחזיר את הספרים למקום',
'אמירת "קדיש יתום" אך ורק ליד הבימה',
' אין להשתמש בשום סלולארי בתוך ביהמ"ד אלא לדברים נחוצים', 
];

const MESSAGES_SHABAT = MESSAGES.slice(0, -1);

let positionInArray = 0;

const zmanObj = {};

let specifyMsg = 'כאן בביהכ"נ אוסרים הדיבור בכל שעת התפילה מתחילתה ועד סופה.';

// const MIN_FONT_SIZE = 3.5;
// const MAX_FONT_SIZE = 5.5;
// let fontSize = 3.5;

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
    const SHKIAH_STR = 'שקיעה:  ' + format_time(new Date(day.sunset().setMinutes(day.sunset().getMinutes() + 2)));
    const DAF_STR = 'דף היומי בבלי:  ' + daf;
    const SHMA1 = day.getZemanim().sof_zman_shma_A.getTime();
    const SHMA2 = day.getZemanim().sof_zman_shma.getTime();
    const SHMA_STR1 = 'סו"ז קר"ש א:  ' + format_time(day.getZemanim().sof_zman_shma_A);
    const SHMA_STR2 = 'סו"ז קר"ש ב:  ' + format_time(day.getZemanim().sof_zman_shma);
    const netz = 'נץ החמה: ' + format_time(day.getZemanim().neitz_hachama);
    const mincha = 'מנחה: ' + format_time(day.getZemanim().mincha_gedola);
    const nerot = 'הד"נ: ' + format_time(new Date(day.sunset().setMinutes(day.sunset().getMinutes() - 28)));
    
    zmanObj["shkiah"] = SHKIAH_STR;
    zmanObj["daf"] = DAF_STR;
    zmanObj["shma1"] = SHMA_STR1;
    zmanObj["shma2"] = SHMA_STR2;
    zmanObj["netz"] = netz;
    zmanObj["mincha"] = mincha;
    zmanObj["nerot"] = nerot;






    if (day.day == 30 || day.day == 1) {
        specifyMsg = 'יעלה ויבוא'; 
    }

    // const weeksPrayingEarlier = ['בהעלותך', 'שלח', 'קורח', 'חקת', 'בלק', 'פינחס', 'מטות'];  //includes

    // if (day.getDay() == 5 && weeksPrayingEarlier.includes(day.getParsha('h')[0])) {
    //     specifyMsg = 'השבוע זמן מנחה ער"ש 10 דקות לפני הדלקת נרות.';
    // }
    let src = 'images/SfiratHaomer' + omerDay + '.jpg';
    if (omerDay == 0) {
        // src = setMainImage(date2, day.getDay() == 6);
        //TODO
        src = 'images/empty.jpeg';
        setMessages(date, day.getDay(), SHMA_STR1, SHMA_STR2, DAF_STR, SHKIAH_STR);
        

    }
    document.querySelector('#omer img').src = src;
    replaceSofShma(SHMA1, SHMA2, SHMA_STR1, SHMA_STR2);
    insertIn('#sunset', SHKIAH_STR, isShowTimes);
    insertIn('#daf_yomi',DAF_STR , isShowTimes);
    // console.log((day.sunset() - date.getTime()) / (1000 * 60 * 15));
    warningWhenNear(day.sunset(),new Date().getTime(), '#sunset');
    setTimeout('refresh()', 1000);

}

function insertIn(divId, text, isAvailable) {
    document.querySelector(divId).innerHTML = isAvailable ? text : '';
}

function replaceSofShma(shma1, shma2, shmaStr1, shmaStr2) {
    let date = new Date();
    let seconds = date.getSeconds();
    let time = 0;

    if (Math.floor(seconds / 10) % 2 == 0) {
        insertIn('#shma', shmaStr2, isShowTimes);
        time = shma2;
    }
    else {
        insertIn('#shma', shmaStr1, isShowTimes);
        time = shma1;
    }
    
    
    warningWhenNear(time, date.getTime(), '#shma');
    // enlargeFontSizeOfShmaWhenNear(shma1, shma2, date.getTime());
}

// function setFontSize() {
//     document.querySelector('#shma').style.fontSize = fontSize + 'rem'; 
// }

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

// function enlargeFontSizeOfShmaWhenNear(shma1, shma2, now) {
//     if (shma1 - now  < (1000 * 60 * 20)  && shma2 > now) {
//         if (fontSize < MAX_FONT_SIZE) {
//             fontSize += 0.002;
            
//         }
//     }
//     else if (fontSize > MIN_FONT_SIZE) {
//         fontSize -= 0.002;
//     }
//     setFontSize();
// }

function format_time(date) {
    return (date.getHours() % 12 || 12) + ':' + pad(date.getMinutes());
}

function formatTimeWithSeconds(date) {
    return format_time(date) + ':' + pad(date.getSeconds());
}

// function setMainImage(date, isShabat) {
//     // let srcParams = 'empty';
//     // let msgText = 'כאן בביהכ"נ אוסרים הדיבור בכל שעת התפילה מתחילתה ועד סופה.';
//     // let msgShma =  'סו"ז קר"ש ב:  ' + format_time(day.getZemanim().sof_zman_shma);
//     // const msgObj = document.querySelector('#msg');
//     // msgObj.innerHTML = msgText;
//     // msgObj.style.fontSize = 6.5 - msgText.length / 30 + 'rem';
//     let srcParams = 'speakingForbidden';
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const shabatNight = isShabat && hours >= 18 && hours <= 23;
//     const shabatNightByTefila = shabatNight && hours <= 20;
//     const shabatMornning = isShabat && hours >= 8 && hours <= 11;
//     if (!isShabat && minutes % 30 == 0) {
//         srcParams = 'phoneForbidden';
//     }
//     if ((!isShabat && hours >= 6 && hours <= 9  || shabatNightByTefila || shabatMornning) && minutes % 20 == 0) {
//         srcParams = 'kadishAtBima';
//     }
//     return 'images/' + srcParams + '.jpeg'
// }

function setMessages(date, day) {
    const isShabat = day == 6;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    let msgText = 'כאן בביהכ"נ אוסרים הדיבור בכל שעת התפילה מתחילתה ועד סופה.';
    
    let msgs = !isShabat? MESSAGES : MESSAGES_SHABAT;

    
    if (seconds % 20 === 0) {
        positionInArray = Math.floor(Math.random() * (20)); 
    }

    const regularMsg = msgs[positionInArray % msgs.length];

    const zmanList = setZmanList(day, hours);

    const zman = zmanList[positionInArray % zmanList.length];
    // const zmanMsg = 3;

   
    
// console.log(seconds, Math.floor(seconds / 10));
    switch (Math.floor(seconds / 10)) {
        case 0:
            msgText = regularMsg;
            break;

        case 1:
            msgText = zman;
            break;

        case 2:
            msgText = specifyMsg;
            break;
  
        case 3:
            msgText = regularMsg;
            break;

        case 4:
            msgText = zman;
                break;
 
        case 5:
            msgText = specifyMsg;
                break;
                                          
        default:
            break;
    };

    const msgObj = document.querySelector('#msg');
    msgObj.innerHTML = msgText;
    msgObj.style.fontSize = 9.5 - msgText.length / 16 + 'rem';

    
}

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function setZmanList(day, hours) {
    let zmanList = [];
    if (hours < 12) {
        zmanList = [zmanObj["netz"], zmanObj["shma1"], zmanObj["shma2"]];
    }
    else {
         zmanList = [zmanObj["daf"], zmanObj["shkiah"]];
    }
    if (day != 5 && day != 6) {
        zmanList.push(zmanObj["mincha"]);  
    }

    if (day == 5) {
       zmanList.push(zmanObj["nerot"]);
    }
    return zmanList;


}

Hebcal.events.on('ready', refresh());


