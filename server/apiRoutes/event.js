const router = require('express').Router();
const { Op } = require('sequelize');
const {
  Event,
  EventAttendee,
  User,
  Group,
  GroupMember,
} = require('../db/index');
const { titleCase } = require('../../utils/index');

router.get('/explore', async (req, res, next) => {
  try {
    let { term, section } = req.query;
    const query = { limit: 20 };

    query.offset = section ? parseInt(section, 10) * 20 : 0;

    if (term) {
      term = term.trim().toLowerCase();

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

//TODO: put routes in a more logical order

//create new event
//TODO: add admin/group owner restrictions to this
router.post('/newevent', async (req, res, next) => {
  try {
    const newEvent = await Event.create({
      ...req.body.event,
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
router.put('/events/:id', async (req, res, next) => {
  try {
    const updatedEvent = await Event.update(
      { ...req.body.event },
      {
        where: { id: req.params.id },
      }
    );
    res.send(updatedEvent);
  } catch (err) {
    next(err);
  }
});

//get single event
router.get('/events/:id', async (req, res, next) => {
  try {
    const event = await Event.findOne({ where: { id: req.params.id } });
    res.send(event);
  } catch (err) {
    next(err);
  }
});

//delete event
//TODO: add restrictions

router.delete('/events/:id', async (req, res, next) => {
  try {
    const deletedEvent = await Event.destroy({ where: { id: req.params.id } });
    res.send(deletedEvent);
  } catch (err) {
    next(err);
  }
});

//get all events
//TODO: add whatever we are doing for loading, paginating, filtering, ordering
router.get('/events', async (req, res, next) => {
  try {
    const events = await Event.findAll();
    res.send(events);
  } catch (err) {
    next(err);
  }
});

//get all attendees for an event
router.get('/events/:id', async (req, res, next) => {
  try {
    const event = await Event.findOne({ where: { id: req.params.id } });
    const eventAttendees = await event.getUsers();
    res.send(eventAttendees);
  } catch (err) {
    next(err);
  }
});

//get all events for the current user
router.get('/myevents', async (req, res, next) => {
  try {
    const user = req.user;
    const userEvents = await user.getEvents();
    res.send(userEvents);
  } catch (err) {
    next(err);
  }
});

//get all events for a specific group
router.get('/groups/:id/events', async (req, res, next) => {
  try {
    const group = req.params.id;
    const groupEvents = await group.getEvents();
    res.send(groupEvents);
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
      await EventAttendee.create({
        userId: req.user.id,
        eventId: req.body.eventId,
      });
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
    const attendee = await EventAttendee.destroy({
      where: { userId: req.user.id, eventId: req.body.eventId },
    });
    if (attendee) res.status(201).send();
    else throw new Error('Events', 'Unable to delete attendee');
  } catch (err) {
    next(err);
  }
});

router.use((error, req, res, next) => {
  console.log('ERROR: ', error);
  if (error.type === 'Event') {
    res.status(error.status).json({ error: { [error.field]: error.message } });
  } else {
    next(error);
  }
});

module.exports = router;
