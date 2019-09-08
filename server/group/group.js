const router = require('express').Router();
const { Group } = require('../db/index');

router.get('/groups/all/:next', async (req, res, next) => {
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
	  // All all custom filters here
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
    res.send({groupsAll});
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
