const GtfsRealtimeBindings = require('gtfs-realtime-bindings')
const protobuf = require("protobufjs")
const request = require('request')

const requestSettings = {
  method: 'GET',
  //url: 'http://datamine.mta.info/mta_esi.php?key=e8ee38d7c21cbd5e0e56eb5febb598c2&feed_id=2',
  url: 'http://localhost:3000/whatever',
  encoding: null
}

request(requestSettings, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var feed = GtfsRealtimeBindings.FeedMessage.decode(body)
    //console.log(response)
    //console.log(JSON.stringify(feed))
    feed.entity.forEach(function(entity) {
      if (entity.trip_update) {
        console.log(JSON.stringify(entity.trip_update))
      }
    })
  }
})