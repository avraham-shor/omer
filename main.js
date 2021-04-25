var Hebcal = require('hebcal');
var omer = Hebcal.HDate.prototype.omer();

function image() {
    a.innerHTML = omer;
    setTimeout(image(), 1000);
}