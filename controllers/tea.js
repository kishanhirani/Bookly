const zod = require('zod')
const teaModel = require('../model/tea.js')
const jwt = require('jsonwebtoken');
const moment = require('moment')
// const userModel = require('../model/user.js');
// const { Utils } = require('../helper/utils.js');

const addTea = async (req, res) => {
  try {

    const { count, slot } = req.body;

    if (count === "" || count == undefined || count == null) {
      return res.status(400).json({ message: "Count is required", success: false });
    }
    if (slot === "" || slot == undefined || slot == null) {
      return res.status(400).json({ message: "Slot is required", success: false });
    }

    const slotIndex = parseInt(slot, 10);

    if (isNaN(slotIndex) || (slotIndex !== 1 && slotIndex !== 2)) {
      return res.status(400).json({ message: "Invalid slot value", success: false });
    }

    const startOfDay = moment().startOf('day').toDate();
    const endOfDay = moment().endOf('day').toDate();
    let teaDoc = await teaModel.findOne({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });
    console.log('teadoc found');


    if (!teaDoc) {
      console.log('teadoc not found');
      teaDoc = new teaModel({
        count_1: 0,
        count_2: 0
      });
    }

    if (slotIndex === 1) {
      teaDoc.count_1 += Number(count);
    } else if (slotIndex === 2) {
      teaDoc.count_2 += Number(count);
    }

    await teaDoc.save();

    return res.json({
      data: teaDoc,
      message: "Tea updated successfully",
      success: true
    });

  } catch (error) {
    console.error('Error adding tea:', error);
    return res.status(500).json({ message: "Server error", success: false });
  }
}

const getTea = async (req, res) => {
  try {
    const { page } = req.body
    const data = await teaModel.find().sort({ createdAt: 1 }).limit(10).skip(page - 1)
    const allData = await teaModel.find()
    const totalPage = Math.ceil(allData.length / 10)
    return res.json({
      page: page,
      totalPage: totalPage,
      data: data,
      message: "",
      success: true
    });
  } catch (error) {
    console.error('Error fetching teas:', error);
    return res.status(500).json({ message: "Server error", success: false });
  }
}

const updateTea = async (req, res) => {
  try {
    const { id, count, slot } = req.body;

    if (id == null || id == undefined || id == "") {

      return res.status(400).json({ message: "id is required", success: false });
    }
    if (count == null || count == undefined || count == "") {

      return res.status(400).json({ message: "count is required", success: false });
    }
    if (slot == null || slot == undefined || slot == "") {

      return res.status(400).json({ message: "slot is required", success: false });
    }

    const updateField = slot === 1 ? 'count_1' : 'count_2';
    const update = { $inc: { [updateField]: +count } };

    const data = await teaModel.findByIdAndUpdate(id, update, { new: true });

    return res.json({
      data: data,
      message: "",
      success: true
    });

  } catch (error) {
    console.error('Error fetching teas:', error);
    return res.status(500).json({ message: "Server error", success: false });
  }
}

module.exports = { addTea, getTea, updateTea }
