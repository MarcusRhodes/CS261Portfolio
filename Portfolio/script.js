window.addEventListener("load", event => {
    if (!document.cookie.value) {
		setCookie("treats", 0, 1.5);
		setCookie("tricks", 0, 1.5);
	}
});

var flag = "";
	
function setCookie(cname, cvalue, exdays) {
	let savedCookie = getCookie(cname);
	if (savedCookie == "") savedCookie = 0;
	if (savedCookie == 0) {
    	var d = new Date();
    	d.setTime(d.getTime() + (exdays*24*60*60*1000));
    	var expires = "expires=" + d.toGMTString();
    	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    } else {
    	document.cookie = cname + "=" + (parseInt(savedCookie) + cvalue) + ";" + expires + ";path=/";
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(cname) {
    var c = getCookie(cname);
    if (c != "") {
        alert(c);
    } else {
        alert("Uh Oh");
    }
}

function deleteCookie() {
	document.cookie = "treats=0;expires=;path=/";
	document.cookie = "tricks=0;expires=;path=/";
}

function treat() {
    setCookie("treats", 1, 0.5);
    flag = "treat";
    addFlag();
    document.getElementById('div1').innerHTML = null;
    document.getElementById('div1').innerHTML = "A TREAT!<br>You have " + getCookie("treats") + " treats!";
    return;
}

function trick() {
    setCookie("tricks", 1, 0.5);
    flag = "trick";
    addFlag();
    document.getElementById('div1').innerHTML = null;
    document.getElementById('div1').innerHTML = "A TRICK!<br>You have tricked " + getCookie("tricks") + " people!";
    return;
}

var mymap = L.map('mapid').setView([43.818353, -111.782335], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFyY3VzcmhvZGVzIiwiYSI6ImNqbjZlOGxxbTAybnYzcXFpcjd6djVvcnYifQ.zggwq7w18xjNoIHn2tqg3g'
}).addTo(mymap);

var treatIcon = L.icon({
    iconUrl: 'treat.png',
    iconSize:     [55, 55], // size of the icon
    iconAnchor:   [20, 55] // point of the icon which will correspond to marker's location
});

var trickIcon = L.icon({
    iconUrl: 'trick.png',
    iconSize:     [60, 60], // size of the icon
    iconAnchor:   [20, 55] // point of the icon which will correspond to marker's location
});

var marker = L.marker([43.818353, -111.782335]).addTo(mymap);

function addFlag() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        alert("This app requires your location to work!");
    }
}

function showPosition(position) {
    if (flag == "treat") L.marker([position.coords.latitude, position.coords.longitude], {icon: treatIcon}).addTo(mymap);
    if (flag == "trick") L.marker([position.coords.latitude, position.coords.longitude], {icon: trickIcon}).addTo(mymap);
}


