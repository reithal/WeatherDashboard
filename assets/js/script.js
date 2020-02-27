/* 
  script.js  
  Author: Carlos Mazon
  TODO: Update Date and description
  Date: 
*/

const apiURL = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?appid=e46ae336429ea1955308d653928f791b&units=imperial&q="

const apiForecastURL = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?appid=e46ae336429ea1955308d653928f791b&units=imperial&q="




function debugToConsole(entry) {
  console.log(entry);
  console.log("Main Temp: ",entry.main.temp.toFixed(1),"&deg;F")
  renderToday(entry)

}
function debugAgain(entry) {
  
  console.log(entry);
  //console.log("Main Temp: ",entry.list[0].main.temp.toFixed(1),"&deg;F")
  renderForecast(entry)

}

function makeAjaxRequest(url, callback) {
  $.ajax (
    {
      url: url,
      method: "GET",
      headers: {
        "x-requested-with": "xhr" 
      }
    }).then(function(response){
    
      callback(response);

    }).fail(function(textStatus) { 
      console.error(textStatus.statusText)
    })
};

function renderToday(results) {
  $('#todayIcon>img').replaceWith(`<img src="http://openweathermap.org/img/wn/${results.weather[0].icon}@2x.png" alt="weather icon"></img>`);
  $('#today>h3').replaceWith(`<h3 class="card-title">${results.name}</h3>`);
  $('#today> .condition').text(`${results.weather[0].description}`)
  const timeUpdated = moment.unix(results.dt);
  $('#today > p > small').text(`Last Updated ${timeUpdated.fromNow()}`);
  $('#main').text(`${results.main.temp.toFixed(1)}\xB0 / ${results.main.feels_like.toFixed(1)}\xB0 F`)
  $('#loHi').text(`${results.main.temp_min.toFixed(1)}\xB0 / ${results.main.temp_max.toFixed(1)}\xB0 F`)
  $('#winds').text(`${Math.round(results.wind.speed)} m/s`)

}

function renderForecast(forecastResult) {
  console.log(forecastResult);
  counter = 0;
  for (i = 0; i < 5; i++) {

    var day = '#day' + (i + 1);
    const timeUpdated = moment.unix(forecastResult.list[i].dt);
    $(day + '>img').replaceWith(`<img width="50%" src="http://openweathermap.org/img/wn/${forecastResult.list[i].weather[0].icon}@2x.png" alt="weather icon"></img>`);
    $(day + '> .date').text(timeUpdated.format("M/DD"));
    $(day + '> .temp').text(`Temp: ${forecastResult.list[i].main.temp.toFixed(1)}\xB0 F`);
    $(day + '> .humidity').text(`Humidity: ${forecastResult.list[i].main.humidity}`);
  }

  $('#todayIcon>img').replaceWith(`<img src="http://openweathermap.org/img/wn/${results.weather[0].icon}@2x.png" alt="weather icon"></img>`);
  $('#today>h3').replaceWith(`<h3 class="card-title">${results.name}</h3>`);
  const timeUpdated = moment.unix(results.dt);
  $('#today > p > small').text(`Last Updated ${timeUpdated.fromNow()}`);
  $('#main').text(`${results.main.temp.toFixed(1)}\xB0 / ${results.main.feels_like.toFixed(1)}\xB0 F`)
  $('#loHi').text(`${results.main.temp_min.toFixed(1)}\xB0 / ${results.main.temp_max.toFixed(1)}\xB0 F`)
}

$(document).ready(function () {

  setTimeout(function () {
    $('#sidebar').toggleClass('active');},2000);

  $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

  // Build out the default cities
  cities.forEach(city => {
    var liCity = $('<li>').addClass("cityItem");
    $(liCity).attr("id",city);
    $('<a>').attr("href", "#").text(city).appendTo(liCity);
    $('#citySubmenu').append(liCity);
    
  });

  $(document).on("click", ".cityItem", function(){
    var cityId = $(this).attr("id") + ",US";
    makeAjaxRequest(apiURL+cityId,renderToday);
    makeAjaxRequest(apiForecastURL+cityId,renderForecast);
  
  
  });


});

makeAjaxRequest(apiURL + "Miami,US",debugToConsole);
makeAjaxRequest(apiForecastURL+"Miami", debugAgain);