var WEATHER_API_URL = 'https://fcc-weather-api.glitch.me/api/current';

var html = "",
  city = "",
  region = "",
  country = "",
  loc = "",
  lon = "",
  lat = "";

var convert = function (C) {
  var F;
  F = (C * (9 / 5)) + 32;
  return F.toFixed(2);
};
var toFahrenheit = function () {
  getLocation;
  var y = document.getElementsByClassName("unit");
  var i;
  for (i = 0; i < y.length; i++) {
    y[i].innerHTML = '&#8457;';
  }
  $('#ButtonC').removeClass('btn-primary');
  $('#ButtonF').addClass('btn-primary');
  $('#ButtonC').addClass('btn-default');
};
var toCelsius = function () {
  getLocation;
  var y = document.getElementsByClassName("unit");
  var i;
  for (i = 0; i < y.length; i++) {
    y[i].innerHTML = '&#8451;';
  }
  $('#ButtonF').removeClass('btn-primary');
  $('#ButtonC').addClass('btn-primary');
  $('#ButtonF').addClass('btn-default');
};
var findWeather = function () {
  if ($('#ButtonC').hasClass('btn-primary')) {
    toCelsius();
  } else if ($('#ButtonF').hasClass('btn-primary')) {
    toFahrenheit();
  }
};

var getLocation = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherData);
  }else{
    console.log("Geo Location not supported");
  }
};

var getWeatherData = function (locationData) {
  var lat = locationData['coords']['latitude'],
      lon = locationData['coords']['longitude'];
  $.ajax({
    url: WEATHER_API_URL,
    data: {
      lat: lat,
      lon: lon
    },
    type: 'GET',
    dataType: 'json',
    success: renderData
  });
}

var renderData = function (data) {
  console.log(data)
  var temp = data['main']['temp'],
    weather_type = data['weather'][0]['main'],
    weather_desc = data['weather'][0]['description'],
    icon = data['weather'][0]['icon'],
    iso_date = new Date(data['dt'] * 1000),
    date = iso_date.toLocaleDateString(),
    time_updated = iso_date.toLocaleTimeString(),
    pressure = data['main']['pressure'],
    humidity = data['main']['humidity'],
    sunrise = new Date(data['sys']['sunrise'] * 1000).toLocaleTimeString(),
    sunset = new Date(data['sys']['sunset'] * 1000).toLocaleTimeString(),
    lat = data['coord']['lat'],
    lon = data['coord']['lon'],
    windSpeed = data['wind']['speed'],
    inclination = data['wind']['deg'];

  html = '<pre><b>Weather </b>:<b>' + weather_type + '</b>, ' + weather_desc +
    '<br><b>Location  </b>:<b>' + city + ' ' + data['name'] + ',<b> ' + country + '(' + data['sys']['country'] + ')' + '</b>' +
    '<br/><b>Humidity  </b>:' + humidity + '%' +
    '<br/><b>Pressure </b>: ' + pressure + ' kPa' +
    '<br/><b>Date Updated </b>: ' + date +
    '<br/><b>Sunrise </b>: ' + sunrise +
    '<br/><b>Sunset </b>: ' + sunset +
    '<br/><b>Latitude  </b>:' + lat +
    '<br/><b>Longitude </b>:' + lon +
    '<br/><b>Wind Speed</b>:' + windSpeed + ' m/s at ' + inclination + 'deg</pre>';
  $('#location').html(html);
  $('#temp-main').html(temp + ' (&#8451;)');
  $('#weather').text(weather_type);
  $('#icon').find("img").attr({
    src: icon
  });
  console.log(html);
}
$(function () {
  $(getLocation);
});
