var html ='',city = "",region = "",country = "",loc = "",lon = "",lat = "";
var locationArr = [];
var client_id = 'appid=0eba625878be18cb986e5462b3a6e92e';
var url = 'http://api.openweathermap.org/data/2.5/weather';
var weather_url;
var convert = function(C) {
  var F;
  F = (C * (9 / 5)) + 32;
  return F.toFixed(2);
}
var toFahrenheit = function() {
  getWeather('F');
  var y = document.getElementsByClassName("unit");
  var i;
  for (i = 0; i < y.length; i++) {
    y[i].innerHTML = '(&#8457;)';
  }
  $('#ButtonC').removeClass('btn-primary')
  $('#ButtonF').addClass('btn-primary')
  $('#ButtonC').addClass('btn-default')
}
var toCelsius = function() {
  getWeather('C');
  var y = document.getElementsByClassName("unit");
  var i;
  for (i = 0; i < y.length; i++) {
    y[i].innerHTML = '(&#8451;)';
  }
  $('#ButtonF').removeClass('btn-primary')
  $('#ButtonC').addClass('btn-primary')
  $('#ButtonF').addClass('btn-default')
}
var findWeather = function() {
  if ($('#ButtonC').hasClass('btn-primary')) {
    toCelsius();
  } else if ($('#ButtonF').hasClass('btn-primary')) {
    toFahrenheit();
  }
}

var getWeather = function(unit) {
    var speedUnit = "m/s";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            lat = position.coords.latitude
            lon = position.coords.longitude;
            weather_url = url+'?lat='+lat+'&lon='+lon+'&'+client_id+'&units=metric';
                $.getJSON(weather_url, function(data) {
      
    
      var pressure = Math.round((data['main']['pressure']) / 10);
      var myDateM = new Date(data['sys']['sunrise'] * 1000);
      myDateM = myDateM.toLocaleString()
      var arr = myDateM.split(',');
      var date = arr[0];
      myDateM = arr[1];  
      var myDateN = new Date(data['sys']['sunset'] * 1000);
      myDateN = myDateN.toLocaleString()
      var arr = myDateN.split(',');
      myDateN = arr[1];
      var w = data['weather'][0]['id'];
      if ((w>=701 && w<=781)||(w>=801 && w<=804)) {
        document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/AbhishekChd/FreeCodeCampProjects/master/images/Weather-app-clouds-background.jpg')";
      } else if (w == 800) {
        document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/AbhishekChd/FreeCodeCampProjects/master/images/Weather-app-clear-background.jpg')";
      } else if ((w>=200 && w<=232)||(w>=300 && w<=321)||(w>=500 && w<=531)) {
        document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/AbhishekChd/FreeCodeCampProjects/master/images/Weather-app-rainy-background.jpg')";
      } else if (w>=600 && w<=622) {
        document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/AbhishekChd/FreeCodeCampProjects/master/images/Weather-app-snow-background.jpg')";
      } else {
        document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/AbhishekChd/FreeCodeCampProjects/master/images/Weather-app-default-background.jpg')";
      }
      var t = data['main']['temp'],
        t_min = data['main']['temp_min'],
        t_max = data['main']['temp_max'];
      if (unit == 'F') {
        t = convert(t);
        t_min = convert(t_min);
        t_max = convert(t_max);
      }

      htmlCode = '<pre><b>Weather   </b>:' + '<b>' + data['weather'][0]['main'] + '</b>, ' + data['weather'][0]['description'] + '<br/><b>Location  </b>:' + city + ' ' + data['name'] + ',<b> ' + country + '(' + data['sys']['country'] + ')' + '</b>' + '<br/><b>Humidity  </b>:' + data['main']['humidity'] + '%' + '<br/><b>Pressure  </b>:' + pressure + ' kPa' + '<br/><b>Date      </b>:' + date + '<br/><b>Sunrise   </b>:' + myDateM + '<br/><b>Sunset    </b>:' + myDateN + '<br/><b>Latitude  </b>:' + lat + '<br/><b>Longitude </b>:' + lon + '<br/><b>Wind Speed</b>:' + data['wind']['speed'] + ' m/s</pre>';

      document.getElementById('weather').innerHTML = data['weather'][0]['main'];
      document.getElementById('temp-main').innerHTML = 'Temp: ' + t;
      document.getElementById('temp-min').innerHTML = 'Min: ' + t_min;
      document.getElementById('temp-max').innerHTML = 'Max: ' + t_max;
      document.getElementById('location').innerHTML = htmlCode;
    });

        });
    }
    else{
        console.log("Can't access location");
    }
}