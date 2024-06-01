import scheduleModel from "../models/scheduleModel.js";
import usersModel from "../models/usersModel.js";

export const createSchedule = async (req, res) => {
  const { targetUserId, scheduledTime } = req.body;
  const schedulerId = req.user._id;

  // validation
  if (!targetUserId || !scheduledTime) {
    return res.status(400).send({ message: "Missing required fields." });
  }

  try {
    const existingSchedule = await scheduleModel.findOne({
      schedulerId,
      targetUserId,
      scheduledTime, // You might need a more complex check depending on how you store dates
    });
    if (existingSchedule) {
      return res
        .status(409)
        .send({ success: false, message: "Schedule already exists." });
    }

    const scheduler = await usersModel.findById(schedulerId);
    const targetuser = await usersModel.findById(targetUserId);

    const schedule = new scheduleModel({
      schedulerId,
      targetUserId,
      scheduledTime,
      schedulername: scheduler ? scheduler.name : "unknown",
      targetUsername: targetuser ? targetuser.name : "unknown",
    });
    await schedule.save();
    res.status(201).send({
      success: true,
      message: "Meeting Scehduled Successfully",
      schedule,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error while scheduling meeting!",
      error: error.message,
    });
  }
};

export const getschedulesbyId = async (req, res) => {
  try {
    const userId = req.user._id;
    const schedule = await scheduleModel.find({
      $or: [{ schedulerId: userId }, { targetUserId: userId }],
    });
    res.status(200).send({
      success: true,
      schedule,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
