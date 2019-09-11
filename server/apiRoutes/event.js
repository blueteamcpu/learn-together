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

router.post('/newevent', async (req, res, next) => {
  try {
    const newEvent = await Event.create({
      ...req.body.event,
      hostId: req.user.id,
      groupId: req.body.groupId,
    });

    await EventAttendee.create({ eventId: newEvent.id, userId: req.user.id });

    res.send(newEvent);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
