const express = require('express');
const receiptsRouter = express.Router();

receiptsRouter.get('/:id', getReceiptsById); // download or view receipts

module.exports = receiptsRouter;