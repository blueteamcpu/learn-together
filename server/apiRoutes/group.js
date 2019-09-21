const router = require('express').Router();
const { Op } = require('sequelize');
const { Group, GroupMember, User } = require('../db/index');
const { titleCase } = require('../../utils/index');
const { queryForUser, isLoggedIn } = require('../../utils/backend');
const getZipsNearMe = require('../../resources/zipcodesNearMe');

// eslint-disable-next-line complexity
router.get('/explore', async (req, res, next) => {
  try {
    let { term, offset, distance } = req.query;
    term = term ? term.trim().toLowerCase() : null;

    const query = {
      limit: 20,
      attributes: ['id', 'name', 'description'],
      include: [{ model: User, attributes: ['id'] }],
    };

    query.offset = offset ? parseInt(offset, 10) * 20 : 0;

    let zipCodes = null;

    if (req.user && req.user.zipcode) {
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
                description: { [Op.substring]: term },
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
            description: { [Op.substring]: term },
          },
        ],
      };
    }

    const groups = await Group.findAll(query);

    res.json(groups);
  } catch (error) {
    next(error);
  }
});

router.post('/newgroup', async (req, res, next) => {
  try {
    const newGroup = await Group.create({ name: req.body.name,
					  description: req.body.description,
					  zipcode: req.body.zipCode,
					  ownerId: req.user.id,
					  topicId: req.body.topicId,
					});
    await GroupMember.create({
      isAdmin: true,
      groupId: newGroup.id,
      userId: req.user.id,
    });

    res.status(201).send(newGroup);
  } catch (error) {
    next(error);
  }
});

// NICK: TODO Finish this route to facilitate detailed Groups and all the thingies
router.get('/detail/:groupId/:context?', async (req, res, next) => {
  const context = req.params.context;
  try {
    const group = await Group.findByPk(req.params.groupId);
    const isMember = req.user ? await GroupMember.findOne({ where: {groupId: group.id, userId: req.user.id}}) : null;
    let isAdmin = false;
    if(isMember !== null) isAdmin = isMember.isAdmin;
    switch (context) {
      case 'members': {
        const members = await group.getUsers({
          attributes: ['username', 'imageURL', 'id'],
        });
        res.send({ group, members: [...members],
		   isAdmin, isMember: isMember ? true : false });
        break;
      }
      case 'events': {
        const events = await group.getEvents();
        res.send({ group, events: [...events], isAdmin,
		   isMember: isMember ? true : false });
        break;
      }
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.get('/all/:section?', async (req, res, next) => {
  try {
    let filters = {};
    let order = {};
    const section = req.params.section ? req.params.section * 25 : 0;
    if (req.body.filter) {
      for (let f of req.body.filter) {
        if (f.hasOwnProperty('zipcode')) {
          // All all custom filters here
          filters.zipcode = f.zipcode;
        }
      }
    }
    if (req.body.order) {
      for (let o of req.body.order) {
        if (o.hasOwnProperty('createdAt')) {
          // All all custom order here
          order.createdAt = o.createdAt;
        }
      }
    }
    const groupsAll = await Group.findAll({
      where: { ...filters },
      order: Object.keys(order).length !== 0 ? [...order] : null,
      offset: section * 25,
      limit: 25,
    });
    res.send(groupsAll);
  } catch (error) {
    next(error);
  }
});

// Gets all users for a specific group
router.get('/groupusers', async (req, res, next) => {
  try {
    const group = Group.findByPk(req.body.groupId);
    const groupUsers = group.getUsers();
    res.send(groupUsers);
  } catch (error) {
    next(error);
  }
});

// Gets all groups for a specific user
router.get(
  '/mygroups',
  isLoggedIn,
  queryForUser(User),
  async (req, res, next) => {
    try {
      // I think this is right, I'm going to have to test it.
      const userGroups = await req.user.getGroups({
        attributes: ['id', 'name', 'description'],
      });
      res.send(userGroups);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/create', async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

// Add a user to the group of their behalf
router.post('/addmember', async (req, res, next) => {
  try {
    // So we need to check that the logged in user can actually add a person to the group
    // The client should put checks in place to not let this happen, but who knows what
    // Sneaky people can do. We need to check on the server as well.
    let validOwner = GroupMember.findOne({
      where: {
        groupId: req.body.groupId,
        userId: req.session.userId,
        isAdmin: true,
      },
    });
    if (validOwner) {
      const group = await GroupMember.create({
        userId: req.body.userId,
        groupId: req.body.groupId,
      });
      res.status(201).send();
    } else {
      res.status(403).send();
    }
  } catch (error) {
    next(error);
  }
});

// This is for an admin/owner to remove a user from a group
router.delete('/removemember', async (req, res, next) => {
  try {
    // So we need to check that the logged in user can actually add a person to the group
    // The client should put checks in place to not let this happen, but who knows what
    // Sneaky people can do. We need to check on the server as well.
    let validOwner = GroupMember.findOne({
      where: {
        groupId: req.body.groupId,
        userId: req.session.userId,
        isAdmin: true,
      },
    });
    if (validOwner) {
      const numberRemoved = await GroupMember.destroy({
        where: { userId: req.body.userId, groupId: req.body.groupId },
      });
      if (numberRemoved) res.status(201).send();
      else throw new Error('Groups', 'Unable to remove member from group');
    } else {
      res.status(403).send();
    }
  } catch (error) {
    next(error);
  }
});

router.post('/addself', async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.session.userId);
    const group = await GroupMember.create({
      userId: req.session.userId,
      groupId: req.body.groupId,
    });

    res.status(201).send();
  } catch (error) {
    next(error);
  }
});

router.delete('/removeself', async (req, res, next) => {
  try {
    const numberRemoved = await GroupMember.destroy({
      where: { userId: req.session.userId, groupId: req.body.groupId },
    });
    if (numberRemoved) res.status(201).send();
    else throw new Error('Groups', 'Unable to remove member from group');
  } catch (error) {
    next(error);
  }
});

//get all events for a specific group
router.get('/:id/events', async (req, res, next) => {
  try {
    const group = await Group.findByPk({ where: { id: req.params.id } });
    const groupEvents = await group.getEvents();
    res.send(groupEvents);
  } catch (err) {
    next(err);
  }
});

router.use((error, req, res, next) => {
  if (error.type === 'Groups') {
    res.status(error.status).json({ error: { [error.field]: error.message } });
  } else {
    next(error);
  }
});

module.exports = router;
