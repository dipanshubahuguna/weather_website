const request = require("request")


const geoUrl = (address,callback)=>{

    const URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1IjoiZGlwYW5zaHUtMjQ2IiwiYSI6ImNrbzh0ZjVkczBiZzMycnFtZWNhemZ0MHAifQ.-SegEP8KBrzuLM4gWWqClQ#downloadJSON=true&"

    request({url : URL, json : true} , (error,response) => {
        if(error){
            callback("Unable to connect!!",undefined)
        }else if(response.body.features.length === 0){
            callback("Loactaion not found!!",undefined)
        }else{
            callback(undefined,{
                latitude : response.body.features[0].center[1], 
                longitude : response.body.features[0].center[0],
                placeName :  response.body.features[0].place_name
            })
        }
    })

}

module.exports = geoUrl

