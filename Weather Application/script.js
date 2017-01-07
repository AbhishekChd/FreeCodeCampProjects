var html ='',city = "",region = "",country = "",loc = "",lon = "",lat = "",url = "";
var locationArr = [];

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
  $.getJSON('http://ip-api.com/json', function(data) {
    /*Fetching location data*/
    /* location format is {
                           "status": "success",
                           "country": "United States",
                           "countryCode": "US",
                           "region": "CA",
                           "regionName": "California",
                           "city": "San Francisco",
                           "zip": "94105",
                           "lat": "37.7898",
                           "lon": "-122.3942",
                           "timezone": "America\/Los_Angeles",
                           "isp": "Wikimedia Foundation",
                           "org": "Wikimedia Foundation",
                           "as": "AS14907 Wikimedia US network",
                           "query": "208.80.152.201"
                         } */
    city = data.city;
    regionName = data.regionName;
    country = data.country;
    var countryCode = data.countryCode;
    loc = data.loc;
    lat = data.lat;
    lon = data.lon;

    url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=0eba625878be18cb986e5462b3a6e92e&type=accurate&mode=json&units=metric";
    //Fetching location data=========================
    //Fetching and printing Weather data
    $.getJSON(url, function(json) {
      /*
          Weather format
          {"coord" :{"lon":77.32,"lat":28.43},
          "weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10n"}],
          "base"   :"stations",
          "main"   :{"temp":299.618,"pressure":989.05,"humidity":98,"temp_min":299.618,"temp_max":299.618,
          "sea_level":1011.7,
          "grnd_level":989.05},
          "wind":{"speed":1.46,"deg":204.5},
          "rain":{"3h":7.405},
          "clouds":{"all":56},
          "dt":1468506477,
          "sys":{"message":0.0086,"country":"IN","sunrise":1468454586,"sunset":1468504201},
          "id":1271951,
          "name":"Faridabad",
          "cod":200
          }
          */
      var pressure = Math.round((json['main']['pressure']) / 10);
      var myDateM = new Date(json['sys']['sunrise'] * 1000);
      myDateM = myDateM.toLocaleString()
      var arr = myDateM.split(',');
      var date = arr[0];
      myDateM = arr[1];  
      var myDateN = new Date(json['sys']['sunset'] * 1000);
      myDateN = myDateN.toLocaleString()
      var arr = myDateN.split(',');
      myDateN = arr[1];
      var w = json['weather'][0]['main'];
      if (w == 'Clouds') {
        document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/AbhishekChd/FreeCodeCampProjects/master/images/Weather-app-clouds-background.jpg')";
      } else if (w == 'Clear') {
        document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/AbhishekChd/FreeCodeCampProjects/master/images/Weather-app-clear-background.jpg')";
      } else if (w == 'Thunderstorm' || w == 'Drizzle' || w == 'Rain') {
        document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/AbhishekChd/FreeCodeCampProjects/master/images/Weather-app-rainy-background.jpg')";
      } else if (w == 'Snow') {
        document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/AbhishekChd/FreeCodeCampProjects/master/images/Weather-app-snow-background.jpg')";
      } else {
        document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/AbhishekChd/FreeCodeCampProjects/master/images/Weather-app-default-background.jpg')";
      }
      var t = json['main']['temp'],
        t_min = json['main']['temp_min'],
        t_max = json['main']['temp_max'];
      if (unit == 'F') {
        t = convert(t);
        t_min = convert(t_min);
        t_max = convert(t_max);
      }

      htmlCode = '<pre><b>Weather   </b>:' + '<b>' + json['weather'][0]['main'] + '</b>, ' + json['weather'][0]['description'] + '<br/><b>Location  </b>:' + city + ', ' + regionName + ',<b> ' + country + '(' + countryCode + ')' + '</b>' + '<br/><b>Humidity  </b>:' + json['main']['humidity'] + '%' + '<br/><b>Pressure  </b>:' + pressure + ' kPa' + '<br/><b>Date      </b>:' + date + '<br/><b>Sunrise   </b>:' + myDateM + '<br/><b>Sunset    </b>:' + myDateN + '<br/><b>Latitude  </b>:' + lat + '<br/><b>Longitude </b>:' + lon + '<br/><b>Wind Speed</b>:' + json['wind']['speed'] + ' m/s</pre>';

      document.getElementById('weather').innerHTML = json['weather'][0]['main'];
      document.getElementById('temp-main').innerHTML = 'Temp: ' + t;
      document.getElementById('temp-min').innerHTML = 'Min: ' + t_min;
      document.getElementById('temp-max').innerHTML = 'Max: ' + t_max;
      document.getElementById('location').innerHTML = htmlCode;

    });
  });
}