const link = "https://api.openweathermap.org/data/2.5/weather?q=";
const appid = "&appid=7638a6a66e6374d974d5bc9ed55e1ced";

let bg = 'home';

function getWeather()
{
	let city = document.getElementById('search').value;
	let api = link + city + appid;
	
	let request = new XMLHttpRequest();
	request.open('GET',api,true);
	request.onload = function()
	{
		var obj = JSON.parse(this.response);
		console.log(obj);
		
		if(obj.cod == 404){return alert('Sorry could not find the city you were looking for');}
		
		document.getElementById('weather').innerHTML = obj.weather[0].main;
		document.getElementById('location').innerHTML = obj.name;
		document.getElementById('temperature').innerHTML = Math.round((obj.main.temp - 273.15) * 100) / 100;
		img = obj.weather[0].icon;
		document.getElementById('icon').src = 'https://openweathermap.org/img/w/'+img+'.png';
		
		if(img == '01d' || img == '02d' || img == '03d' || img == '004d'){bg = 'clearD'}
		else if(img == '01n' || img == '02n' || img == '03n' || img == '004n'){bg = 'clearN'}
		else if(img == '09d' || img == '10d' || img == '11d'){bg = 'rainD'}
		else if(img == '09n' || img == '10n' || img == '11n'){bg = 'rainN'}
		else if(img == '13d'){bg = 'snowD'}
		else if(img == '13n'){bg = 'snowN'}
		else if(img == '50d'){bg = 'fogD'}
		else if(img == '50n'){bg = 'fogN'}
		else{bg = 'home'}
		
		document.getElementById('card').style.display = 'block'
		document.body.style.backgroundImage = 'url(images/'+bg+'.png)';
	}
	if(request.status==200){console.log('Error');}
	request.send()
}