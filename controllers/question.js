const Question = require("../models/question");
const Tag = require("../models/tag");
const User = require("../models/user");

exports.createQuestion = async (req, res) => {
  try {
    const { title, content, tags, author } = req.body;

    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    return res.status(200).json({
      type: "success",
      data: {
        question,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      type: "error",
      message: "Server error occurred",
    });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      type: "success",
      data: {
        questions,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      type: "error",
      message: "Server error occurred",
    });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id name clerkId picture",
      });

    if (!question) {
      return res.status(404).json({
        type: "error",
        message: "Question not found",
      });
    }

    return res.status(200).json({
      type: "success",
      data: {
        question,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      type: "error",
      message: "Server error occurred",
    });
  }
};

exports.upvoteQuestion = async (req, res) => {
  try {
    const { userId, hasDownvoted, hasUpvoted } = req.body;
    const { questionId } = req.params;

    let updateQuery = {};

    if (hasUpvoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasDownvoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      return res.status(404).json({
        type: "error",
        message: "Question not found",
      });
    }

    return res.status(200).json({
      type: "success",
      data: {
        question,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      type: "error",
      message: "Server error occurred",
    });
  }
};

exports.downvoteQuestion = async (req, res) => {
  try {
    const { userId, hasDownvoted, hasUpvoted } = req.body;
    const { questionId } = req.params;

    let updateQuery = {};

    if (hasDownvoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasUpvoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      return res.status(404).json({
        type: "error",
        message: "Question not found",
      });
    }

    return res.status(200).json({
      type: "success",
      datae: {
        question,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      type: "error",
      message: "Server error occurred",
    });
  }
};
