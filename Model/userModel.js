const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  profileStatus:{
    type: String,
    required: true,
    enum: ["updated", "default"],
    default: "default",
  },
  userName: {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
  },
  phoneNumber: {
    type: Number,
    required: true,
    // unique: true,
  },
  email: {
    type: String,
    required: false,
    // unique: true
  },

  address: {
    line1: {
      type: String,
      required: false,
    },
    line2: {
      type: String,
      required: false,
    },
    landmark : {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },

    zipCode: {
      type: String,
      required: false,
    },
  },
  businessName: {
    type: String,
    required: false,
    default: "No Business Name",
  },
  role: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
    default: "/public/static/Assets/Images/profile-icon.png",
  },
  token: {
    type: String,
    required: false,
    default: "",
  },
  Subscription_isActive: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
