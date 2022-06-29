let isShowTimes = true;

const days = ['ראשון','שני','שלישי','רביעי','חמישי','ששי','שבת'];
let dayOrNight = 'יום ';

const MESSAGES = ['נא לשמור על ניקיון וקדושת בית הכנסת!', 
' אין להשתמש בשום סלולארי בתוך הבימ"ד אלא לדברים נחוצים', 
'כאן בביהכ"נ אוסרים הדיבור בכל שעת התפילה מתחילתה ועד סופה.',
'נא להחזיר את הספרים למקום',
'אמירת "קדיש יתום" אך ורק ליד הבימה'
];

const MESSAGES_SHABAT = ['נא לשמור על ניקיון וקדושת בית הכנסת!', 
'כאן בביהכ"נ אוסרים הדיבור בכל שעת התפילה מתחילתה ועד סופה.',
'נא להחזיר את הספרים למקום',
'אמירת "קדיש יתום" אך ורק ליד הבימה'
];



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
    if (day.day == 30 || day.day == 1) {
        specifyMsg = 'יעלה ויבוא'; 
    }
    let src = 'images/SfiratHaomer' + omerDay + '.jpg';
    if (omerDay == 0) {
        // src = setMainImage(date2, day.getDay() == 6);
        //TODO
        src = 'images/empty.jpeg';
        setMessages(date, day.getDay() == 6, SHMA_STR1, SHMA_STR2, DAF_STR, SHKIAH_STR);
        

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

function setMainImage(date, isShabat) {
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

function setMessages(date, isShabat, SHMA_STR1, SHMA_STR2, DAF_STR, SHKIAH_STR) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    let msgText = 'כאן בביהכ"נ אוסרים הדיבור בכל שעת התפילה מתחילתה ועד סופה.';
    
    let positionInArray = 0;
    let msgs = !isShabat? MESSAGES : MESSAGES_SHABAT;
    
    const regularMsg = msgs[positionInArray];

    let msgZman1 = SHMA_STR1;
    let msgZman2 = SHMA_STR2;

    if (hours > 10) {
        msgZman1 = SHKIAH_STR;
        msgZman2 = DAF_STR;
    }
    
// console.log(seconds, Math.floor(seconds / 10));
    switch (Math.floor(seconds / 10)) {
        case 0:
            if (positionInArray == 0) {
                positionInArray = Math.floor(Math.random() * (msgs.length));
            }
            msgText = regularMsg;
            break;

        case 1:
            positionInArray = 0
            msgText = msgZman1;
                break;

        case 2:
            msgText = specifyMsg;
                break;
  
        case 3:
            if (positionInArray == 0) {
                positionInArray = Math.floor(Math.random() * (MESSAGES.length));
            }
            msgText = regularMsg;
            break;

        case 4:
            positionInArray = 0
            msgText = msgZman2;
                break;
 
        case 4:
            msgText = specifyMsg;
                break;
                                          
        default:
            break;
    };

    const msgObj = document.querySelector('#msg');
    msgObj.innerHTML = msgText;
    msgObj.style.fontSize = 9.5 - msgText.length / 20 + 'rem';  

    
}

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

Hebcal.events.on('ready', refresh());


