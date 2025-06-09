import "./styles.css"

async function getWeatherInfo(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?key=C6FBP5Z6JJBC692EUYSKV6CFL`;
  const response = await fetch(url, { mode: 'cors' });
  return response.json();
}

function processWeatherData(weatherData, unit) {
  const curr = weatherData.currentConditions;

  let temp = curr.temp;
  let feels = curr.feelslike;

  if (unit === 'C') {
    temp = ((temp - 32) * 5 / 9).toFixed(1);
    feels = ((feels - 32) * 5 / 9).toFixed(1);
  } else {
    temp = temp.toFixed(1);
    feels = feels.toFixed(1);
  }

  return {
    address: weatherData.resolvedAddress,
    desc: weatherData.description,
    condition: curr.conditions,
    feels,
    humid: curr.humidity,
    icon: curr.icon,
    temp
  };
}
