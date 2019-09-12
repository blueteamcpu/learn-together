// Eventually this little diddy below would allow us to pull in the
// api resource grabber script. For the moment I'm not calling it though
// So run ./resources/grabs.js separately to get the courses/topics
// Path to the course and topic api getters
//const getResources = path.join(__dirname, 'resources', 'grabs.js');


function runScript(scriptPath, callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
    let invoked = false;

    let process = childProcess.fork(scriptPath);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}

// Now we can run a script and invoke a callback when complete, e.g.
// runScript(getResources, function (err) {
//     if (err) throw err;
//     console.log(`finished running some-script.js`);
// });
