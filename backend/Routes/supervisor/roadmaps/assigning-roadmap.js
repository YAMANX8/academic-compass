const router = require('express').Router();
const pool = require('../../../database/db');
const authorization = require('../../../middleware/authorization');
const checkPermission = require('../../../middleware/check-permissions');
const fs = require('fs');
const uploadVideo = require('../../../lib/multer-video');

// api for get assigning roadmaps







module.exports = router;