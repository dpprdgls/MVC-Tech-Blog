const { User } = require('../models');

const userController = {
  createUser: async (req, res) => {
    try {
      console.log('before creating user');
      const userData = await User.create(req.body);
      console.log('after creating user');
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.status(200).json(userData);
      });
    } catch (err) {
      console.err('error creating user', err);
      res.status(400).json(err);
    }
  },

  loginUser: async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });

      if (!userData) {
        console.log('No user found!');
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again!' });
        return;
      }

      const validPassword = await userData.checkPassword(req.body.password);

      if (!validPassword) {
        console.log('Incorrect password!');
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again!' });
        return;
      }

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.json({ user: userData, message: 'You are now logged in!' });
      });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  logoutUser: async (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  },
};

module.exports = userController;