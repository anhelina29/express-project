const express = require('express');
const router = express.Router();
const themeCtrl = require('./theme.ctrl');

router.post('/', themeCtrl.theme);

module.exports = router;
