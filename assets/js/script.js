/* 
  script.js  
  Author: Carlos Mazon
  TODO: Update Date and description
  Date: 
*/

const apiURL = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?appid=e46ae336429ea1955308d653928f791b&units=imperial&q="

const apiForecastURL = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?appid=e46ae336429ea1955308d653928f791b&units=imperial&q="

let results;

function debugToConsole(entry) {
  console.log(entry);
  console.log("Main Temp: ",entry.main.temp.toFixed(1),"&deg;F")
  renderToday()

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
      results = response;
      callback(response);

    }).fail(function(textStatus) { 
      console.error(textStatus.statusText)
    })
};

function renderToday() {
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
    var cityId = $(this).attr("id");
    makeAjaxRequest(apiURL+cityId,renderToday);

  
  
  });


});

makeAjaxRequest(apiURL + "Miami,US",debugToConsole);
