function showDate(){
    const date = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getDate();
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const element = document.querySelector('.date');
    element.innerHTML = `${day} ${month} ${year}`;
}
function parseData(data){
    const parsedData = {}
    parsedData.cod = data.cod;
    parsedData.temp = data.main.temp;
    parsedData.tempMin = data.main.temp_min;
    parsedData.tempMax = data.main.temp_max;
    parsedData.humidity = data.main.humidity;
    parsedData.stat = data.weather[0].main;
    parsedData.icon = data.weather[0].icon;
    parsedData.city = data.name;
    parsedData.country = data.sys.country;
    parsedData.pressure = data.main.pressure
    return parsedData
}
async function getWeather(cityName){
    const apiKey = "30d48354e72d34020ce30bfd849d4ca9";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        const parsedData = parseData(data)
        return parsedData
    } catch(err){
        alert("city not found, Try again");
    }
}
function changeDom(dataObject){
    const iconSrc = "https://openweathermap.org/img/wn/"
    const temp = document.querySelector('.temp');
    const low = document.querySelector('.low');
    const high = document.querySelector('.high');
    const cityName = document.querySelector('.city-name');
    const img = document.querySelector('.weather-data > img');
    const description = document.querySelector('.description');
    const infoChild1 = document.querySelector('.info-child1');
    const infoChild2 = document.querySelector('.info-child2');
    temp.innerHTML = `${dataObject.temp}&deg; C`;
    low.innerHTML = `L: ${dataObject.tempMin}&deg; C`;
    high.innerHTML = `H: ${dataObject.tempMax}&deg; C`;
    cityName.innerHTML = `${dataObject.city}, ${dataObject.country}`;
    img.src = iconSrc + dataObject.icon + "@2x.png";
    description.innerHTML = dataObject.stat;
    infoChild1.innerHTML = `Humidity: ${dataObject.humidity}%`;
    infoChild2.innerHTML = `Pressure: ${dataObject.pressure}hPa`;

}
const input = document.querySelector('input')
async function run(){
    const data = await getWeather("london")
    changeDom(data)
    showDate()
    input.addEventListener('keypress',async function (e) {
        if(e.key === 'Enter'){
            if(input.value !== '' && /^[a-zA-Z ]+$/.test(input.value)){
                let value = input.value.trim()
                input.value = ''
                const search = await getWeather(value)
                changeDom(search)
            }else{
                alert("Please enter a valid city name")
                input.value = ''
            }
        }
    })
}
run()