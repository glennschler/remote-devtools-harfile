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

const streamer = new HarReadStream()
const harFile = new Fs.createWriteStream(Path.join(`.`, `logs`, `out.har`))
streamer.pipe(harFile)

const remoteDebugChrome = new RemoteDebugChrome()
remoteDebugChrome.connect(remoterOptions)

remoteDebugChrome.once('connected', function connect() {
  console.log(`connected`)
})

remoteDebugChrome.on('harEntry', function onHarEntry (err, harEntry) {
  if (err !== null && err !== undefined) console.log(`remoteDebugChrome: ${err.stack}`)
  else {
    console.log(harEntry.request.url)
    streamer.append(`${JSON.stringify(harEntry)}\n`)
  }
})
