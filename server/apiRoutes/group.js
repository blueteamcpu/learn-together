const router = require('express').Router();
const { Op } = require('sequelize');
const { Group, GroupMember, User } = require('../db/index.js');
const { titleCase } = require('../../utils/index');

router.get('/explore', async (req, res, next) => {
  try {
    let { term, section } = req.query;
    const query = { limit: 20 };

    query.offset = section ? parseInt(section, 10) * 20 : 0;

    if (term) {
      term = term.trim().toLowerCase();

      if (term.length) {
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
    }

    const groups = await Group.findAll(query);

    const data = groups.map(async group => {
      const memberCount = await GroupMember.count({
        where: { groupId: group.id },
      });
      return { group, memberCount };
    });

    res.json(await Promise.all(data));
  } catch (error) {
    next(error);
  }
});

router.post('/newgroup', async (req, res, next) => {
  try {
    // const newGroup = await req.user.addGroup(
    //   { ...req.body.group },
    //   { through: { ownerId: req.user.id } }
    // );
    const newGroup = await Group.create({
      ...req.body.group,
      ownerId: req.user.id,
    });

    await GroupMember.create({
      isAdmin: true,
      groupId: newGroup.id,
      userId: req.user.id,
    });

    res.status(201).json(newGroup);
  } catch (error) {
    next(error);
  }
});

// NICK: TODO Finish this route to facilitate detailed Groups and all the thingies
router.get('/detail/:groupId/:context?', async (req, res, next) => {
  const context = req.params.context;
  try {
  const group = await Group.findByPk(req.params.groupId);
  switch(context){
  case 'members': {
    const members = await group.getUsers({ attributes: ['username', 'imageURL', 'id']});
    res.send({ group, members: [...members] });
    break;
  }
  case 'events': {
    const events = await group.getEvents();
    res.send({ group, events: [...events] });
    break;
  }
  }
  }
  catch(e) {
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
router.get('/mygroups', async (req, res, next) => {
  try {
    // I think this is right, I'm going to have to test it.
    const user = await User.findByPk(req.session.userId);
    const userGroups = await user.getGroups();
    res.send(userGroups);
  } catch (error) {
    next(error);
  }
});

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

router.use((error, req, res, next) => {
  if (error.type === 'Groups') {
    res.status(error.status).json({ error: { [error.field]: error.message } });
  } else {
    next(error);
  }
});

module.exports = router;
