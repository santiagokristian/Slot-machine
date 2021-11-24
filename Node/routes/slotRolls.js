const express = require('express')
const {retrieveSessionId,rollMachine} = require('../controllers/slotRolls')

const router = express.Router()

// router.post('/',rollMachine)
router.get('/',rollMachine)


module.exports = router;