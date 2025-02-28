const { date } = require("joi");
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    industry: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    zip_code: {
      type: String,
    },
    logo: {
      type: String, // URL to the company's logo
    },
    founded_year: {
      type: Number,
    },
    employee_count: {
      type: Number,
      default: 0,
    },
    departments: [String],
    announcements: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
          required: true,
        },
        link: {
          type: String, // Optional external link for more details
        },
        is_new: {
          type: Boolean,
          default: true,
        },
        created_by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // User who created the announcement
          required: true,
        },
        priority: {
          type: String,
          enum: ["low", "medium", "high"],
          default: "medium",
        },
        visibility: {
          type: String,
          enum: ["all", "department", "role"],
          default: "all",
        },
        visible_to: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department", // Only required if visibility is "department"
          },
        ],
        attachments: [
          {
            file_name: String,
            file_url: String, // URL to the uploaded file
            uploaded_at: { type: Date, default: Date.now },
          },
        ],
        is_active: {
          type: Boolean,
          default: true,
        },
      },
    ],

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

module.exports = mongoose.model("Company", companySchema);
