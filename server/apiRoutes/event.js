const router = require('express').Router();
const { Event, EventAttendee, User, Group, GroupMember } = require('../db/index');

//TODO: put routes in a more logical order

//create new event
//TODO: add admin/group owner restrictions to this
router.post('/newevent', async (req, res, next) => {
    try {
        const user = req.user;
        const newEvent = Event.create({...req.body.event, hostId: user.id, groupId: req.body.groupId });
        res.send(newEvent);
    } catch(err) {
        next(err);
    }
});

//update event info 
//TODO: add restrictions
router.put('/events/:id', async(req, res, next) => {
    try {
        const updatedEvent = await Event.update({...req.body.event}, {
            where: { id: req.params.id }
        })
        res.send(updatedEvent);
    } catch(err) {
        next(err);
    }
});

//get single event
router.get('/events/:id', async(req, res, next) => {
    try {
        const event = await Event.findOne({ where: { id: req.params.id }});
        res.send(event);
    } catch(err) {
        next(err);
    }
});

//delete event
//TODO: add restrictions

router.delete('/events/:id', async(req, res, next) => {
    try {
        const deletedEvent = await Event.destroy({ where: { id: req.params.id }});
        res.send(deletedEvent);
    } catch(err) {
        next(err);
    }
});

//get all events
//TODO: add whatever we are doing for loading, paginating, filtering, ordering
router.get('/events', async(req, res, next) => {
    try {
        const events = await Event.findAll();
        res.send(events);
    } catch(err) {
        next(err);
    }
});

//get all attendees for an event
router.get('/events/:id', async(req, res, next) => {
    try {
        const event = Event.findOne({ where: {id: req.params.id} });
        const eventAttendees = await event.getUsers();
        res.send(eventAttendees);
    } catch(err) {
        next(err);
    }
});


//get all events for the current user
router.get('/myevents', async(req, res, next) => {
    try{
        const user = req.user;
        const userEvents = await user.getEvents();
        res.send(userEvents);
    } catch(err) {
        next(err);
    }
});

//get all events for a specific group
router.get('/groups/:id/events', async(req, res, next) => {
    try {
        const group = req.params.id;
        const groupEvents = group.getEvents();
        res.send(groupEvents);
    } catch(err) {
        next(err);
    }
});

//add user to attend event
router.post('/addattendee', async(req, res, next) => {
    try {
        let validGroupMember = GroupMember.findOne({ where: { groupId: req.body.groupId, userId: req.user.id }});
        if (validGroupMember) {
            await EventAttendee.create({ userId: req.user.id, eventId: req.body.eventId });
        } else throw new Error('Events', 'You must be a member of this group to attend event');
    } catch(err) {
        next(err);
    }
});

//remove user from attending event
router.delete('/deleteattendee', async(req, res, next) => {
    try{
        const attendee = await EventAttendee.destroy({ where: { userId: req.user.id, eventId: req.body.eventId }});
        if (attendee) res.status(201).send();
        else throw new Error('Events', 'Unable to delete attendee')
    } catch(err) {
        next(err);
    }
});
