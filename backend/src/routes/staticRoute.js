const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.clearCookie('teacherToken').clearCookie('studentToken').status(200).end();
});

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'Markwise API Healthpoint OK!' });
});

module.exports = router;
