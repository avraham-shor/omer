




const hebrewDate = require("hebrew-date");
const { getSunset } = require('sunrise-sunset-js');

let my_location_latitude;
let my_location_longitude;

main();




function get_sfirah_today(month, day) {
     switch (month) {
             case 'Nisan':
                  return day - 15                                
                  break;
            case 'Iyyar':
                  return day + 15
                  break;
            case 'Sivan':
                  return day + 44                 
                  break;

                  default:
                  return 0                  
                  break;
                  }
}

function set_location() {
     if (my_location_latitude) {
            return;          
     }
     navigator.geolocation.getCurrentPosition(function (position) {
                                    // console.log('location', position.coords.latitude, position.coords.longitude);
                                    // console.log('sunset', getSunset(position.coords.latitude, position.coords.longitude));
                                    // console.log('position' ,position);
                                    my_location_latitude = position.coords.latitude;
                                    my_location_longitude = position.coords.longitude;

                                    // my_location = getSunset(position.coords.latitude, position.coords.longitude);
                  });
//       console.log('location of Modiiin', getSunset(31.92939028391096, 35.045067435539345));
      my_location_latitude = 31.929399390245532;
      my_location_longitude = 35.045110350848105;
//       my_location = getSunset(31.929399390245532, 35.045110350848105);
}



function set_luach () {
      const date = new Date();
      date = date.setMinutes ( date.getMinutes() - 13 );
      set_location();
      const sunset = getSunset(my_location_latitude, my_location_longitude);
      const jewish_today = hebrewDate(date);
      // if (!check_if_now_sunset(today, sunset)) {
      //      return;             
      // }
      const jewish_month = jewish_today.month_name;
      let jewish_day = jewish_today.date;
      if (date > sunset) {
            jewish_day++;        
      }
      const count = get_sfirah_today(jewish_month, jewish_day);
      console.log(count);
      set_image(count);
}

function main(){
      set_luach()
      setInterval(function(){ set_luach(); }, 10000);         
}

