const express = require('express');
const categoryRouter = express.Router();

categoryRouter.get('/', getCategory); // list user categories
categoryRouter.post('/', postCategory); // create new categories
categoryRouter.put('/:id', getCategoryById); // rename category
categoryRouter.delete('/:id', deleteCategoryById); // delete a category


module.exports = categoryRouter;