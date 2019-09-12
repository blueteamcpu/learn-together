const { db, Group } = require('../server/db/index');

const aGroup = { name: 'Testing Group',
		 zipcode: '12345',
		 description: 'Doing all kinds of testing to make sure I have something sane to workwith :)',
	       };

Group.create(aGroup);
