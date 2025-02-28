const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    assigned_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the employee assigned to the task
      required: true,
    },
    assigned_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the manager or HR assigning the task
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in progress", "completed", "on hold"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    due_date: {
      type: Date,
      required: false,
    },
    completed_at: {
      type: Date,
    },
    attachments: [
      {
        filename: String,
        url: String, // URL to the uploaded file
        uploaded_at: { type: Date, default: Date.now },
      },
    ],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Who made the comment
        text: String,
        created_at: { type: Date, default: Date.now },
      },
    ],
    history: [
      {
        action: {
          type: String,
          enum: [
            "task created",
            "task updated",
            "status changed",
            "priority changed",
            "due date changed",
            "task assigned",
            "task reassigned",
            "task completed",
            "task reopened",
            "comment added",
            "comment edited",
            "comment deleted",
            "attachment added",
            "attachment removed",
          ],
          required: true,
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Who performed the action
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;
