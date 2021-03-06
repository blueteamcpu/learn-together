const router = require('express').Router();
const { Op } = require('sequelize');
const { queryForUser, isLoggedIn } = require('../../utils/backend');
const {
  Event,
  EventAttendee,
  User,
  Group,
  GroupMember,
} = require('../db/index');
const { titleCase } = require('../../utils/index');
const getZipsNearMe = require('../../resources/zipcodesNearMe');

// eslint-disable-next-line complexity
router.get('/explore', async (req, res, next) => {
  try {
    let { term, offset, distance } = req.query;
    term = term ? term.trim().toLowerCase() : null;

    const query = {
      limit: 20,
      attributes: ['id', 'name', 'description', 'day'],
      order: [['day', 'DESC']],
    };

    query.offset = offset ? parseInt(offset, 10) * 20 : 0;

    let zipCodes = null;

    if (req.user && req.user.zipcode && distance && distance !== 'All') {
      zipCodes = await getZipsNearMe(req.user.zipcode, distance || 25);
    }

    if (zipCodes) {
      if (term) {
        query.where = {
          [Op.and]: {
            zipcode: {
              [Op.in]: zipCodes,
            },
            [Op.or]: [
              {
                name: { [Op.substring]: titleCase(term) },
              },
              {
                description: {
                  [Op.or]: [
                    {
                      [Op.substring]: term,
                    },
                    {
                      [Op.substring]: titleCase(term),
                    },
                  ],
                },
              },
            ],
          },
        };
      } else {
        query.where = {
          zipcode: {
            [Op.in]: zipCodes,
          },
        };
      }
    } else if (term) {
      query.where = {
        [Op.or]: [
          {
            name: { [Op.substring]: titleCase(term) },
          },
          {
            description: {
              [Op.or]: [
                {
                  [Op.substring]: term,
                },
                {
                  [Op.substring]: titleCase(term),
                },
              ],
            },
          },
        ],
      };
    }

    const events = await Event.findAll(query);

    const data = events.map(async event => {
      const attendeeCount = await EventAttendee.count({
        where: { eventId: event.id },
      });
      return { event, attendeeCount };
    });

    res.json(await Promise.all(data));
  } catch (error) {
    next(error);
  }
});

//get all events for the current user
router.get(
  '/myevents',
  isLoggedIn,
  queryForUser(User),
  async (req, res, next) => {
    try {
      const user = req.user;
      const userEvents = await user.getEvents({
        attributes: ['id', 'name', 'description', 'day'],
      });
      res.send(userEvents);
    } catch (err) {
      next(err);
    }
  }
);

//create new event
//TODO: add admin/group owner restrictions to this
router.post('/newevent', async (req, res, next) => {
  try {
    const day = req.body.day;
    const formattedDay = `${day.slice(3, 5)}-${day.slice(0, 2)}-${day.slice(
      6,
      10
    )}`;

    const newEvent = await Event.create({
      ...req.body,
      day: formattedDay,
      hostId: req.user.id,
      groupId: req.body.groupId,
    });

    await EventAttendee.create({ eventId: newEvent.id, userId: req.user.id });

    res.json(newEvent);
  } catch (err) {
    next(err);
  }
});

//update event info
//TODO: add restrictions
router.put('/:id', async (req, res, next) => {
  try {
    const updatedEvent = await Event.update(
      { ...req.body },
      {
        returning: true,
        where: { id: req.params.id },
      }
    );
    res.send(updatedEvent[1]);
  } catch (err) {
    next(err);
  }
});

//get single event
router.get('/:id', async (req, res, next) => {
  try {
    const event = await Event.findOne({
      where: { id: req.params.id },
      include: [
        { model: User, attributes: ['id', 'username', 'imageURL'] },
        { model: Group, attributes: ['name'] },
      ],
    });
    res.send(event);
  } catch (err) {
    next(err);
  }
});

//get all events
router.get('/', async (req, res, next) => {
  try {
    const events = await Event.findAll();
    res.send(events);
  } catch (err) {
    next(err);
  }
});

//add user to attend event
router.post('/addattendee', async (req, res, next) => {
  try {
    let validGroupMember = await GroupMember.findOne({
      where: { groupId: req.body.groupId, userId: req.user.id },
    });
    if (validGroupMember) {
      const attendee = await EventAttendee.create({
        userId: req.user.id,
        eventId: req.body.id,
      });
      const user = await User.findOne({
        where: { id: attendee.userId },
        attributes: ['id', 'username', 'imageURL'],
      });
      res.send(user);
    } else
      throw new Error(
        'Events',
        'You must be a member of this group to attend event'
      );
  } catch (err) {
    next(err);
  }
});

//remove user from attending event
router.delete('/deleteattendee', async (req, res, next) => {
  try {
    const attendee = await EventAttendee.findOne({
      where: { userId: req.user.id, eventId: req.body.id },
    });
    await EventAttendee.destroy({
      where: { userId: req.user.id, eventId: req.body.id },
      returning: true,
    });
    res.json(attendee);
  } catch (err) {
    next(err);
  }
});

//delete event
router.delete('/:id', async (req, res, next) => {
  try {
    let validEventHost = await Event.findOne({
      where: { id: req.params.id, hostId: req.user.id },
    });

    if (validEventHost) {
      const deletedEvent = await Event.destroy(
        {
          where: { id: req.params.id },
        },
        { returning: true }
      );
      res.send(deletedEvent[1]);
    } else
      throw new Error('Events', 'You must be the host to delete this event');
  } catch (err) {
    next(err);
  }
});

router.use((error, req, res, next) => {
  if (error.type === 'Event') {
    res.status(error.status).json({ error: { [error.field]: error.message } });
  } else {
    next(error);
  }
});

module.exports = router;
