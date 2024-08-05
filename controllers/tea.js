const { ObjectId } = require('mongodb');
const zod = require('zod')
const teaModel = require('../model/tea.js')
const jwt = require('jsonwebtoken');
const userModel = require('../model/user.js')
const createTeaBody = zod.object({
  count: zod.number(),
  time: zod.coerce.date(),
})

const addTea = async (req, res) => {
  try {
    const { success } = createTeaBody.safeParse(req.body)
    const { count, time } = req.body;
    const decodedToken = jwt.decode(req.headers.token, "billa");

    const userId = decodedToken.id;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    const added = await teaModel.create({
      userId, count, time
    });
    return res.json({
      data: [{ userId, count, time }],
      message: "Tea Added",
      success: true
    });

  } catch (error) {
    console.error('Error adding tea:', error);
    return res.status(500).json({ message: "Server error", success: false });
  }


}

module.exports = { addTea }
