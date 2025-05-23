const { default: axios } = require("axios");

const getNearbyPlace=(category,lat,lng)=>axios.get('/api/nearby-places?category='+category+'&lat='+lat+'&lng='+lng);

const searchPlace=(searchtext,lat,lng)=>axios.get('/api/google-search?searchtext='+
searchtext+"&lat="+lat+"&lng="+lng);

export default {
    getNearbyPlace,
    searchPlace
}