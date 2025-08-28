const express = require('express');
const summaryRouter = express.Router();

summaryRouter.get('/monthly', getMonthlySummary);// get current month summary
summaryRouter.get('/', getSummary); // get summary for custom range
summaryRouter.get('/alert', getAlert); // budget overrun alert


module.exports = summaryRouter;
