//DOM Elements

const time = document.getElementById('time'),
	quote = document.getElementById('quote'),
	author = document.getElementById('author'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    place = document.getElementById('location'),
    temp = document.getElementById('temp'),
    condition = document.getElementById('condition')
focus = document.getElementById('focus'),
btcPrice = document.getElementById('btcPrice'),ethPrice = document.getElementById('ethPrice');


//you can put a comma after a declaration to declare multiple variables at once.

//get quote

function getQuote() {
	axios.get('https://thesimpsonsquoteapi.glitch.me/quotes').then(function(res){
		console.log(res.data);
		quote.innerText = res.data[0].quote;
		author.innerText = res.data[0].character;
	})
}
getQuote();

//get quote

//GeoLocation
const API_KEY = '3ec8de42bcc8a44738c4c555ced85ebe'
const geoCode_API_KEY = 'AIzaSyCUVZjVGcaXOpx_9L5qQ-3sGhDYVpQ7U4w',
	  coin_API_KEY = 'b11da64dda6738ee93296df31ad2d9e889f1f8777923eee55ccb14229e8d17fe'

if ('geolocation' in navigator) {
    //console.log('available')
    navigator.geolocation.getCurrentPosition(function(position) {
        (position.coords.latitude, position.coords.longitude);


        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        function parseCoords() {
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${geoCode_API_KEY}`).then(function(res) {
                console.log(res.data)
                let city = res.data.results[6].address_components[1].long_name;
                let state = res.data.results[6].address_components[3].long_name;
               // console.log(city)
               // console.log(state)

                function updateLocation(data) {
                    place.innerText = `${city}, ${state}`;
                }

                updateLocation(res.data);
            })
        }


        function getWeather() {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`).then(function(res) {
                console.log(res.data)
                updateWeather(res.data)

            })
        } //get weather

        function updateWeather(data) {

            temp.innerText = Math.floor(data.main.temp) ;
            condition.innerText = data.weather[0].main;
        }
        getWeather();
        parseCoords();

        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
    });
} else {
    console.log('not available')
}
//GeoLocation

//crypto price API call
function getCryptoPrice() {
	axios.get(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR&api_key=${coin_API_KEY}`).then(function(res){
		console.log(res.data);
		btcPrice.innerText = res.data.USD;
	})//gets btc price

	axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR&api_key=${coin_API_KEY}`).then(function(res1){
		console.log(res1.data);
		ethPrice.innerText = res1.data.USD;
	})//gets eth price

}
getCryptoPrice()
setTimeout(getCryptoPrice, 120000);
//crypto price API call

//Show the time function
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    //Set AM or PM

    const amPM = hour >= 12 ? 'PM' : 'AM';

    //12HR Format

    hour = hour % 12 || 12;

    //Output the time

    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

    setTimeout(showTime, 1000);
}

//Add zeroes function

function addZero(num) {
    return (parseInt(num, 10) < 10 ? '0' : '') + num;
    //if the number passed in is less than ten, add a zero.
}

//set background and greeting

function setBgGreet() {
    let today = new Date(),

        hour = today.getHours();

    if (hour < 12) {
        document.body.style.backgroundImage = 'url(./img/morning.jpg)'
        greeting.textContent = "Good Morning, "
        document.body.style.color = 'white'
        document.body.style.textShadow = '4px 4px 4px #111'

    } else if (hour < 18) {
        document.body.style.backgroundImage = 'url(./img/afternoon.jpg)'
        document.body.style.color = 'white';
        document.body.style.textShadow = "3px 3px 3px #333"
        greeting.textContent = "Good Afternoon, "

    } else {
        document.body.style.backgroundImage = 'url(./img/night.jpg)'
        document.body.style.color = 'white';
        greeting.textContent = "Evening, "
        document.getElementById("main").style.backgroundColor = 'transparent'
    }
}

//get Name

function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

//Set Name

function setName(e) {
    if (e.type === 'keypress') {
        //make sure enter is pressed
        if (e.which == 13 || keycode == 13) {
            localStorage.setItem('name', e.target.innerText)
            name.blur();
        }

    } else {
        localStorage.setItem('name', e.target.innerText)
    }
}

function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

function setFocus(e) {
    if (e.type === 'keypress') {
        //make sure enter is pressed
        if (e.which == 13 || keycode == 13) {
            localStorage.setItem('focus', e.target.innerText)
            focus.blur();
        }

    } else {
        localStorage.setItem('focus', e.target.innerText)
    }
}
// Event listeners.
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

//Run
showTime();
setBgGreet();
getName();
getFocus();