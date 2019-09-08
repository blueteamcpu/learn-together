const router = require('express').Router();
const { Group, GroupMember, User } = require('../db/index');

router.post('/newgroup', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.session.userId);
    const newGroup = Group.create({...req.body.group});
  }
  catch (error) {
    next(error);
  }
});

router.get('/all/:next', async (req, res, next) => {
  try {
    let filters = {};
    let order = {};
    if (req.body.filter) {
      for(let f of req.body.filter) {
	if(f.hasOwnProperty('zipcode')) {
	  // All all custom filters here
	  filters.zipcode = f.zipcode;
	}
      }
      for(let o of req.body.order) {
	if(o.hasOwnProperty('createdAt')) {
	  // All all custom order here
	  filters.createdAt = o.createdAt;
	}
      }
    }
    const groupsAll = await Group.findAll(
      [{ offset: req.params.next * 25, limit: 25,
	 where: { ...filters },
	 order: [...order],
       }
      ]);
    res.send(groupsAll);
  }
  catch (error) {
    next(error);
  }
});

// Gets all users for a specific group
router.get('/groupusers', async (req, res, next) => {
  try {
    const group = Group.findByPk(req.body.groupId);
    const groupUsers = group.getUsers();
    res.send(groupUsers);
  }
  catch (error) {
    next(error);
  }
});

// Gets all groups for a specific user
router.get('/user', async (req, res, next) => {
  try{
    // I think this is right, I'm going to have to test it.
    const user = await User.findByPk(req.session.userId);
    const userGroups = await user.getGroups();
    res.send(userGroups);
  }
  catch (error) {
    next(error);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    
  }
  catch (error) {
    next(error);
  }  
});

// This will allow a user to add themself to a group, or allow a group owner or admin
// Add a user to the group of their behalf
router.post('/addmember', async (req, res, next) => {
  try{
    // So we need to check that the logged in user can actually add a person to the group
    // The client should put checks in place to not let this happen, but who knows what
    // Sneaky people can do. We need to check on the server as well.
    let validOwner = GroupMember.findOne({ where: { groupId: req.body.groupId, userId: req.session.userId, isAdmin: true }});
    if (validOwner) {
      const group = await GroupMember.create({ userId: req.body.userId, groupId: req.body.groupId});      
      res.status(201).send();
    }
    else {
      res.status(403).send();
    }
  }
  catch (error) {
    next(error);
  }
});

// This is for an admin/owner to remove a user from a group
router.delete('/removemember', async (req, res, next) => {
  try{
    // So we need to check that the logged in user can actually add a person to the group
    // The client should put checks in place to not let this happen, but who knows what
    // Sneaky people can do. We need to check on the server as well.
    let validOwner = GroupMember.findOne({ where: { groupId: req.body.groupId, userId: req.session.userId, isAdmin: true }});
    if (validOwner) {
      const numberRemoved = await GroupMember.destroy({ where: {userId: req.body.userId, groupId: req.body.groupId}});
      if(numberRemoved) res.status(201).send();    
      else throw new Error('Groups', 'Unable to remove member from group');      
    }
    else {
      res.status(403).send();
    }
  }
  catch (error) {
    next(error);
  }
});

router.post('/addself', async (req, res, next) => {
  try {
    const group = await GroupMember.create({ userId: req.session.userId, groupId: req.body.groupId});
    res.status(201).send();
  }
  catch (error) {
    next(error);
  }  
});

router.delete('/removeself', async (req, res, next) => {
  try {
    const numberRemoved = await GroupMember.destroy({ where: {userId: req.session.userId, groupId: req.body.groupId}});
    if(numberRemoved) res.status(201).send();    
    else throw new Error('Groups', 'Unable to remove member from group');
  }
  catch (error) {
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
