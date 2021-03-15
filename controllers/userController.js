const User = require("../models/User");

module.exports = {
  getUser: (req, res) => {
    const id = req.params.id;
    User.find({ _id: id })
      .select("-password")
      .then((user) => res.json(user))
      .catch((error) => res.status(422).json(error));
  },
};
