// Lets see if we can pull in some information to actually use for our app eh

// Pretty much everything is defined globally so just make new stuff and use it
// in the `doTheSeeding` function :)
const childProcess = require('child_process');
const path = require('path');

const models = require('../server/db/index.js');
const { db } = models;
const userList = require('./seedlings/userSeed');
const groupList = require('./seedlings/groupSeed');


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
