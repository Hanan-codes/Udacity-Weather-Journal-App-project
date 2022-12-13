/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='

// // Personal API Key for OpenWeatherMap API
// // For temperature in Fahrenheit use units=imperial
const apiKey = '&appid=cfc6afba4fde69e4b29013e854a2fcc6&units=imperial';


//Adding an event that will fire when user clicks the generate button
document.getElementById('generate').addEventListener('click', generateRespond);


function generateRespond(e) {
    const feelings = document.getElementById('feelings').value;
    const Zip = document.getElementById('zip').value;
  
    getWeather(baseURL,Zip,apiKey)
    
    .then((data) => {
        postData('/add', {temperature: data.main.temp, date: newDate, userResponse: feelings} );
        updateUI();
    })


};


const getWeather = async (baseURL,zipCode,key) => {
    const res = await fetch(baseURL+zipCode+key);

try {

    const data = await res.json();
    return data;
} catch(error) {
    console.log('error', error);
}
};

const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newWeather = await res.json();
        return newWeather;
    }catch (error){
        console.log('error', error);
    }
}

const updateUI = async () => {
    const req = await fetch('/data');
    try{
        const newData = await req.json();
        console.log(newData);
        document.getElementById('date').innerHTML = 'Date: '+newData.date;
        document.getElementById('temp').innerHTML = 'Temperature: '+newData.temperature +'&deg F';
        document.getElementById('content').innerHTML = 'Your feelings: '+newData.userResponse;
    }catch(error) {
        console.log('error', error);
    }
}