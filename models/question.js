const { Schema, model } = require("mongoose");

const QuestionSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    views: [{ type: Schema.Types.ObjectId, ref: "User" }],
    upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    answers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Schema.Types.Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = model("Question", QuestionSchema);
