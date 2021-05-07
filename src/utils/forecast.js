const request = require('request')

const forecast = (lat,lon,callback) =>{

    const url = 'http://api.openweathermap.org/data/2.5/weather?appid=7696d3a937dd1fa7adcf96cee4016f7b&lat=' + lat+ '&lon='+ lon +'&units=metric'
    request({url : url, json : true} , (error,response) =>{
            if(error){
                callback('unable to connect!',undefined)
            }else if(response.body.cod === "400"){
                callback("No such location",undefined)
            }else{
                callback(undefined,response.body.weather[0].main + " outside"+" and It's currently "+ response.body.main.temp +" degrees out in "+ response.body.name)
            }
    })

}    

module.exports = forecast


