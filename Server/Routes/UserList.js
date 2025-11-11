const Express = require('express');
const Router = Express.Router();
const User = require('../Model/UserModel');

Router.get('/Users', async (req, res) => {
  try {
    const Users = await User.find({ Status: 'hold' });
    if (!Users || Users.length === 0) {
      return res.status(404).json({ message: 'No Users Found' });
    }
    return res.status(200).json({ message: 'Successfully Responded', Uobj: Users });
  } catch (err) {    return res.status(500).json({ message: 'Something Went Wrong' });
  }
});

Router.get('/UserAccepted', async (req, res) => {
  try {
    const Users = await User.find({ Status: 'accept' });
    if (!Users || Users.length === 0) {
      return res.status(404).json({ message: 'No Accepted Users Found' });
    }
    return res.status(200).json({ message: 'Successfully Responded', Uobj: Users });
  } catch (err) {
    return res.status(500).json({ message: 'Something Went Wrong' });
  }
});

Router.put('/UserAccept/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      { Status: 'accept' },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    return res.status(200).json({ message: 'User Accepted Successfully', user });
  } catch (err) {
    return res.status(500).json({ message: 'Error updating user status' });
  }
});

module.exports = Router;
