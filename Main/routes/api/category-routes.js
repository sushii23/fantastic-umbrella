const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories along with their associated products
router.get('/', (req, res) => {
  Category.findAll({
    include: [{
      model: Product
    }]
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

// GET single category by ID along with its associated products
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product
    }]
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this ID' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

// POST a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

// PUT update a category by ID
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbCategoryData => {
      if (!dbCategoryData[0]) {
        res.status(404).json({ message: 'No category found with this ID' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

// DELETE a category by ID
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this ID' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;
