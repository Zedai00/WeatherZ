import "./styles.css"

async function getWeatherInfo(location) {
  try {

    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=C6FBP5Z6JJBC692EUYSKV6CFL`, {
      mode: "cors"
    })
    const weatherData = await response.json()
    console.log(weatherData)

  } catch (error) {
    console.log(error)

  }
}

getWeatherInfo("london")
