import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    interval: {
      type: Number, 
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String, 
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Reminder = mongoose.model("Reminder", ReminderSchema);
export default Reminder;

//ReminderSchema(start caps) - constructor / class-like object