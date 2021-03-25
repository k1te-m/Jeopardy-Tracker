const User = require("../models/User");

module.exports = {
  followUser: async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
      const user = await User.findOne({ _id: id });
      const username = req.body.username;

      const user2 = await User.findOne({ username: username });

      user.following.push(username);
      user2.followers.push(user.username);

      await user.save();
      await user2.save();

      res.send(user);
    } catch (error) {
      res.status(422).json(error);
    }
  },
};
