const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    position: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "hr", "employee", "manager"],
      default: "employee",
      required: true,
    },
    company:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    hashed_password: {
      type: String,
      required: true,
      default: "$2a$10$MwGZrYW.NSE7a.rtsR9QL.MbIEHBXen80BI.O1IwHzBkHZh801oMG",
    },
    gender: {
      type: String,
      required: false,
    },
    marital_status: {
      type: String,
      required: false,
    },
    date_of_birth: {
      type: Date,
    },
    phone_number: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    profile_picture: {
      type: String, // URL to the image
    },
    employment_status: {
      type: String,
      enum: ["probation", "full-time", "on leave", "terminated"],
      default: "full-time",
    },
    date_joined: {
      type: Date,
      required: true,
    },
    date_terminated: {
      type: Date,
      required: true,
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References a manager or supervisor
    },
    emergency_contact: {
      name: String,
      phone: String,
      relation: String,
    },
    last_login: {
      type: Date,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
