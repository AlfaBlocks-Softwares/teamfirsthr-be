const mongoose = require("mongoose");
const { check } = require("prettier");

const attendanceSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the employee assigned to the task
      required: true,
    },
    check_in: {
      type: Date,
    },
    check_out: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
