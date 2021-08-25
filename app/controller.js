const MeetId = require("./models/meetId");

exports.meetById = (req, res, next, meetId) => {
  MeetId.find({ meetId: meetId }).exec((err, data) => {
    if (err || !data) {
      return res.status(400).json({
        error: "No meeting found",
      });
    }
    req.meetData = data;
    next();
  });
};

exports.saveCallId = (req, res) => {
  const streamData = new MeetId(req.body);
  streamData.save((err, stream) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json(stream);
  });
};

exports.getCallId = (req, res) => {
  return res.json(req.meetData[0].streamData);
};
