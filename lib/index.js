'use strict'

const HarReadStream = require('./harReadStream')
const Fs = require('fs')
const Path = require('path')
const RemoteDebugChrome = require('remote-devtools-har')

/** As defined options for the chrome-remote-interface module
* @see https://github.com/cyrus-and/chrome-remote-interface#cdpoptions-callback
*/
const remoterOptions = {
  host: 'localhost',
  port: 9222,
  secure: false,
  target: null,
  protocol: null,
  remote: false
}

const options = {
  remoterOptions: remoterOptions,
  filters: {
    ignoreRespMime: [/^image\/[^/]+/, /^application\/x-font-woff/, /^text\/css/],
    ignoreRespUrl: [/\.woff2/],
    ignoreRespBodyBase64: true
  }
}

const streamer = new HarReadStream()
const harFile = Fs.createWriteStream(Path.join(`.`, `logs`, `out.har`))
streamer.pipe(harFile)

const remoteDebugChrome = new RemoteDebugChrome()
remoteDebugChrome.connect(options)

remoteDebugChrome.once('connected', function connect () {
  console.log(`connected`)
})

remoteDebugChrome.on('harEntry', function onHarEntry (err, harEntry) {
  if (err !== null && err !== undefined) console.log(`remoteDebugChrome: ${err.stack}`)
  else {
    console.log(harEntry.request.url)
    streamer.append(`${JSON.stringify(harEntry)}\n`)
  }
})
