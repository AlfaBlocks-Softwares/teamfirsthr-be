const mongoose = require("mongoose");
const { check } = require("prettier");

const leaveSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the employee assigned to the task
      required: true,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    manager_approval: {
      type: Boolean,
    },
    hr_approval: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Leave = mongoose.model("Leave", leaveSchema);

module.exports = Leave;
