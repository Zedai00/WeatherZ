import "./styles.css"

async function getWeatherInfo(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?key=C6FBP5Z6JJBC692EUYSKV6CFL`;
  const response = await fetch(url, { mode: 'cors' });
  return response.json();
}
