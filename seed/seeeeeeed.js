// Lets see if we can pull in some information to actually use for our app eh

// Pretty much everything is defined globally so just make new stuff and use it
// in the `doTheSeeding` function :)
const childProcess = require('child_process');
const path = require('path');

const models = require('../server/db/index.js');
const { db } = models;
const userList = require('./seedlings/userSeed');
const groupList = require('./seedlings/groupSeed');

// Path to the course and topic api getters
// const getResources = path.join(__dirname, 'resources', 'grabs.js');

// This spins everything up, all the functions are below
doTheSeeding();

async function doTheSeeding() {
  try {
    await db.sync({ force: true });
    await Promise.all(genList(userList, models.User));
    await Promise.all(genList(groupList, models.Group));
    db.close();
  }
  catch(e) {
    console.log(e);
  }
}

function genList(list, model) {
  return list.map((i) => model.create({ ...i }));
}


// Eventually this little diddy below would allow us to pull in the
// api resource grabber script. For the moment I'm not calling it though
// So run ./resources/grabs.js separately to get the courses/topics
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


