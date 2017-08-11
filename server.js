const http = require('http')
const GtfsRealtimeBindings = require('gtfs-realtime-bindings')
const payload = require('./gtfs_rt_data').data
const port = 3000

function gtfsRTBuffer(){
	const fm = new GtfsRealtimeBindings.FeedMessage(payload)
	const buffer = fm.encode().toBuffer() //.finish()
	return buffer
}

http.createServer( (req, res) => {
	res.writeHead(200, {
		'content-disposition': 'attachment; filename="gtfs"',
		'content-type': 'application/force-download'
	})
	res.write(gtfsRTBuffer(), 'binary')
	res.end()
}).listen(parseInt(port, 10))
console.log(`GTFS server listen on http://localhost:${port}`)