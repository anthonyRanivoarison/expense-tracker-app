const express = require('express');
const incomesRouter = express.Router();

incomesRouter.get('/', getIncomes); // list incomes
incomesRouter.post('/', postIncomes); // create a new income
incomesRouter.get('/:id', postIncomesById);// get an income
incomesRouter.put('/:id', putIncomesById); // update an income
incomesRouter.delete('/:id', deleteIncomesById); // delete an income


module.exports = incomesRouter;
