import pkg from './package'
import Fetch from 'node-fetch'
import Joi from 'joi'

const fetch = async (uri, format) =>{
  const response = await Fetch(uri)
  const result = await response.json()
  if (format) {return format(result)} else {return result}
};

const format5day = (results) => ({
  forecastWeather: results.list.map((result) => (
  { temp: result.main.temp,
    high: result.main.temp_max,
    low: result.main.temp_min,
    date_time: result.dt_txt}))})

const formatCurrent = (result) => (
    {weather: result.weather.description,
      temp: result.main.temp,
    high: result.main.temp_max,
    low: result.main.temp_min
    })


const App_URI = "236c69057c3830b14b6c70a60d80b4d3";

export default {
  pkg,
  async register(server, options = {}) {
    server.route({
      method: ['GET'],
      path: '/v1/weather/current',
      options: {
        tags: ['api'],
        validate: {
          query: {
            city: Joi.string().regex(/^[a-zA-Z ]+$/),
            zipcode: Joi.string().min(5).max(10)
          }
        }
      },
      async handler(req) {
        const {city, zipcode = 84101} = req.query
        if (city) {
          return await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},us&appid=${App_URI}&units=imperial`, formatCurrent)
         } else {
         return await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=${App_URI}&units=imperial`, formatCurrent)
        }
      }
    })

    server.route({
      method: ['GET'],
      path: '/v1/weather/forecast',
      options: {
        tags: ['api'],
        validate: {
          query: {
            city: Joi.string().regex(/^[a-zA-Z ]+$/),
            zipcode: Joi.string().min(5).max(10)
          }
        }
      },
      async handler(req) {
        const {city, zipcode = 84101} = req.query
        if (city) {
          return await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},us&appid=${App_URI}&units=imperial`, format5day)
        } else {
          return await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&appid=${App_URI}&units=imperial`, format5day)
        }
      }
    })
  }
}

  // .map(result =>
  //   ({
  //     name: result.city.name,
  //     weather: result.list.weather.main,
  //     temp: result.list.main.temp,
  //     high: result.list.temp_max,
  //     low: result.list.temp_min
  //   }))

// server.route({
// method: ['GET'],
// path: '/v1/weather/current?zip={zipcode}',
// handler: function (request, h) {
//
//   return 'ZipCode path!';
// }})


// /v1/weather/current?zip={zipcode}
//   /v1/weather/current?name={cityName}
//   /v1/forecasts/{zipcode}
