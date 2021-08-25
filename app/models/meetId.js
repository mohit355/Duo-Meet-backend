const mongoose = require("mongoose");

const meedtIdSchema = mongoose.Schema({
  meetId: {
    type: String,
    required: true,
  },
  streamData: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("MeetId", meedtIdSchema);
