### remote-devtools-harfile

An example implementation of the [remote-devtools-har](https://github.com/glennschler/remote-devtools-har) module to gather HAR log entries from a seperate Google Chrome process.

Stream to file all the HAR entries emitted from [remote-devtools-har](https://github.com/glennschler/remote-devtools-har). A better example would create a valid HAR file, not just these [HTTP Archive (HAR) v1.2 entries](https://github.com/ahmadnassri/har-spec/blob/master/versions/1.2.md#entries).

#### Start Google Chrome with the default remote debugger port number, plus other possible command line arguments:

```bash
--remote-debugging-port=9222 \
--user-data-dir=$TMPDIR/chrome/tmp1 \
--no-default-browser-check \
--enable-net-benchmarking \
--no-first-run --no-proxy-server
```

#### Then start this example
On Windows optionally download the  `devToolsHarFile.exe` contained in the latest [Release](https://github.com/glennschler/remote-devtools-harfile/releases/) instead of installing this repository and it's dependencies.

```bash
mkdir logs
node .

# optionally run the devToolsHarFile.exe
devToolsHarFile.exe
```

Navigate in the Chrome browser. Only the first tab will be captured. Review the `./logs/out.har` file for all the HAR entries which were captured.

#### For reference:
* [Chrome DevTools Protocol Viewer - Network Domain](https://chromedevtools.github.io/devtools-protocol/tot/Network)

  * Network domain allows tracking network activities of the page. It exposes information about http, file, data and other requests and responses, their headers, bodies, timing, etc. 
