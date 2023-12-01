const { Schema, model } = require("mongoose");

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdOn: { type: Schema.Types.Date, default: Date.now },
});

module.exports = model("Tag", TagSchema);
