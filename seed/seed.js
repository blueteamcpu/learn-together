// Lets see if we can pull in some information to actually use for our app eh

// Pretty much everything is defined globally so just make new stuff and use it
// in the `doTheSeeding` function :)
const childProcess = require('child_process');
const path = require('path');

const { getAllCourses } = require('../resources/grabs');
const models = require('../server/db/index.js');
const { db } = models;
const userList = require('./seedlings/userSeed');
const { groupList } = require('./seedlings/groupSeed');
const eventList = require('./seedlings/eventSeed');
const postList = require('./seedlings/postSeed');
const zipList = require('./seedlings/zipSeed');


// This spins everything up, all the functions are below
doTheSeeding();

async function doTheSeeding() {
  try {
    await db.sync({ force: true });
    // NOTE Justin this is the call that populates the topics.
    await getAllCourses();

    const users = await Promise.all(genList(userList, models.User));
    const events = await Promise.all(genList(eventList, models.Event));

    // take array of split topic keys and check to see if the group name has one of those words in the title NOTE: needs to be case insensitive
    groupList.forEach(g => {
      g.ownerId = users[Math.floor(Math.random() * users.length)].id
      g.zipcode = zipList[Math.floor(Math.random() * zipList.length)];
      });

    const groups = await Promise.all(groupList.map(g => {
      return models.Group.create({
        name: g.name,
        zipcode: g.zipcode,
        description: g.description,
        ownerId: g.ownerId,
      });
    }));

    //Associate groups to a user
    await Promise.all(
      groups.map(g => {
       return models.GroupMember.create({
          userId: users[Math.floor(Math.random() * users.length)].id,
          groupId: g.id,
          isAdmin: Math.random() > 0.5 ? true : false,
        });
      })
    );

    const gMs = await models.GroupMember.findAll()

    postList.forEach(p => {
      const randMember = gMs[Math.floor(Math.random() * gMs.length)]
      p.userId = randMember.userId;
      p.groupId = randMember.groupId;
    })

    await Promise.all(genList(postList, models.Post));

    // Get all the associations taken care of for the events
    /* Caution, this code bit is commented out because it requires a newer version of Node
       than what you are most likely using. Node v 12 is required for the Array.flat() method
    */

    // So this is a bit of a hack in getting a single event associated with the other
    // table associations.
    await events[0].update({ hostId: users[0].id, groupId: groups[3].id, zipcode: groups[3].zipcode });
    await models.EventAttendee.create({
      eventId: events[0].id,
      userId: users[0].id,
    });
    await events[1].update({ hostId: users[0].id, groupId: groups[0].id, zipcode: groups[0].zipcode });
    await models.EventAttendee.create({
      eventId: events[1].id,
      userId: users[0].id,
    });
    await events[2].update({ hostId: users[0].id, groupId: groups[5].id, zipcode: groups[5].zipcode });
    await models.EventAttendee.create({
      eventId: events[2].id,
      userId: users[0].id,
    });
    await events[3].update({ hostId: users[0].id, groupId: groups[7].id, zipcode: groups[7].zipcode });
    await models.EventAttendee.create({
      eventId: events[3].id,
      userId: users[0].id,
    });

    db.close();
  } catch (e) {
    console.log(e);
  }
}

function genList(list, model) {
  return list.map(i => model.create({ ...i }));
}
