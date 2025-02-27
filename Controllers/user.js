
const { aiResult, aiResultComment } = require("../handleFunction/geminiAI.js");
const { getVideoId, getVideoTitle, getVideoComments, getCommentMonth } = require("../handleFunction/user.js");
const User = require("../Models/user.js");

let agree = 0, disagree = 0, neutral = 0;

const Add = async (req, res) => {
  const url = req.body.url;
  console.log(url);

  const videoId = getVideoId(url);
  if (!videoId) {
    console.error("Invalid YouTube URL");
    return res.status(400).json({ message: "Invalid YouTube URL" });
  }

  const userExit = await User.findOne({ videoId });
  if (userExit) {
    const _id = userExit._id;
    await User.findByIdAndDelete(_id);
  }

  const comments = await getVideoComments(videoId);
  const videoTitle = await getVideoTitle(videoId);
  const commentMonth = await getCommentMonth(videoId);

  console.log(`Comments for Video ID: ${videoId}`);

  
  await Promise.all(comments.map(async (comment) => {
    try {
      const result = await aiResult(comment, videoId);
     

      if (result.includes("Agree")) {
        agree++;
        console.log("agree:", agree);
      } else if (result.includes("Disagree")) {
        disagree++;
      } else {
        neutral++;
      }
    } catch (error) {
      console.error("Error processing comment:", error);
    }
  }));

  
  const keywords = await aiResultComment(comments);

  const user = new User({
    videoId,
    Agree: agree,
    Disagree: disagree,
    Neutral: neutral,
    keywords: keywords,
    Months: commentMonth,
  });

  const saveData = await user.save();
  

  return res.json({ message: "Data saved successfully", saveData });
};

exports.Add = Add;

