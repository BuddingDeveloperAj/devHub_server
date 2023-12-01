const express = require("express");
const {
  createQuestion,
  getQuestionById,
  getQuestions,
  upvoteQuestion,
  downvoteQuestion,
} = require("../controllers/question");
const router = express.Router();

router.route("/").post(createQuestion).get(getQuestions);

router.route("/:questionId").get(getQuestionById);

router.route("/:questionId/upvote").put(upvoteQuestion);

router.route("/:questionId/downvote").put(downvoteQuestion);

module.exports = router;
