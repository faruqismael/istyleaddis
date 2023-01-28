const router = require("express").Router();
const { User } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  console.log("==============");
  User.findAll()
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find one user by its `id` value
  // be sure to include its associated Products
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this ID" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new user
  const { email, password, passwordConfirm, role = "admin" } = req.body;

  if (password !== passwordConfirm) {
    req.session.error = "Password did not match";

    return res.redirect("/create/admin");
  }
  const user = { email, password, role };

  User.create(user)
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a user by its `id` value
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((dbUserData) => {
    if (!dbUserData[0]) {
      res.status(404).json({ message: "No user found with this ID" });
      return;
    }
    res.json(dbUserData);
  });
});

router.delete("/:id", (req, res) => {
  // delete a user by its `id` value
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this ID" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
