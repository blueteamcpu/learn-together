// Lets see if we can pull in some information to actually use for our app eh

// Pretty much everything is defined globally so just make new stuff and use it
// in the `doTheSeeding` function :)
const childProcess = require('child_process');
const path = require('path');

const models = require('../server/db/index.js');
const { db } = models;
const userList = require('./seedlings/userSeed');
const groupList = require('./seedlings/groupSeed');
const eventList = require('./seedlings/eventSeed');

// This spins everything up, all the functions are below
doTheSeeding();

async function doTheSeeding() {
  try {
    await db.sync({ force: true });
    const users = await Promise.all(genList(userList, models.User));
    const groups = await Promise.all(genList(groupList, models.Group));
    const events = await Promise.all(genList(eventList, models.Event));

    // Associate groups to a user
    await Promise.all(users.map(u => {
      return models.GroupMember.create({userId: u.id,
					groupId: groups[Math.floor(Math.random() * groups.length)].id,
				       });
    }));

    // Get all the associations taken care of for the events
    /* Caution, this code bit is commented out because it requires a newer version of Node
       than what you are most likely using. Node v 12 is required for the Array.flat() method
    */
    // const test = await Promise.all(events.map(e => {
    //   const result = [];
    //   result.push(events[0].update({ hostId: users[0].id, groupId: groups[0].id }));
    //   result.push(models.EventAttendee.create({ eventId: events[0].id, userId: users[0].id }));
    //   return result;
    // }).flat());

    // So this is a bit of a hack in getting a single event associated with the other
    // table associations.
    await events[0].update({ hostId: users[0].id, groupId: groups[0].id });
    await models.EventAttendee.create({ eventId: events[0].id, userId: users[0].id });
    await events[1].update({ hostId: users[0].id, groupId: groups[0].id });
    await models.EventAttendee.create({ eventId: events[1].id, userId: users[0].id });
    db.close();
  }
  catch(e) {
    console.log(e);
  }
}

function genList(list, model) {
  return list.map((i) => model.create({ ...i }));
}
