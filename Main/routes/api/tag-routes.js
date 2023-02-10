const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The /api/tags endpoint

// get all tags with associated product data
router.get("/", (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
        as: "products",
      },
    ],
  })
    .then((tags) => res.json(tags))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// get single tag by id with associated product data
router.get("/:id", (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        through: ProductTag,
        as: "products",
      },
    ],
  })
    .then((tag) => {
      if (!tag) {
        return res.status(404).json({ message: "Tag not found" });
      }
      res.json(tag);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// create a new tag
router.post("/", (req, res) => {
  Tag.create(req.body)
    .then((tag) => res.json(tag))
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

// update a tag's name by its id
router.put("/:id", (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedTag) => {
      if (!updatedTag[0]) {
        return res.status(404).json({ message: "Tag not found" });
      }
      res.json(updatedTag);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

// delete a tag by its id
router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      if (!deletedTag) {
        return res.status(404).json({ message: "Tag not found" });
      }
      res.json({ message: "Tag deleted" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;
