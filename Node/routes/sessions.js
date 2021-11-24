const express = require('express')
const {newSession,checkSession,checkOutSessionCredits} = require('../controllers/sessions')
const router = express.Router()


router.get('/',newSession)
// router.get('/details',checkSession)
router.post('/checkout',checkOutSessionCredits)





module.exports = router;