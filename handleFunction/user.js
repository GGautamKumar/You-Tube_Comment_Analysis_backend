const axios = require("axios");
const TITLE_URL = "https://www.googleapis.com/youtube/v3/videos";
const BASE_URL = "https://www.googleapis.com/youtube/v3/commentThreads";
const API_KEY = process.env.YOUTUBE_API_KEY;

const getVideoId = (url) => {
  const regex =
    /(?:v=|\/videos\/|embed\/|youtu.be\/|\/v\/|\/e\/|watch\?v=|watch\?.+&v=)([\w-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const getVideoTitle = async (videoId) => {
  try {
    const title = await axios.get(TITLE_URL, {
      params: {
        part: "snippet",
        id: videoId,
        key: API_KEY,
      },
    });
    const videoTitle = title.data.items[0].snippet.title;
    return videoTitle;
  } catch (error) {
    console.log(error);
    return;
  }
};

const URL = "https://www.googleapis.com/youtube/v3/commentThreads";
/*
const getVideoComments = async (VIDEO_ID) => {
  let comments = [];
  let nextPageToken = "";
  let params = {
    part: "snippet",
    videoId: VIDEO_ID,
    key: API_KEY,
    maxResults: 100,
  };

  try {
    while (true) {
      if (nextPageToken) params.pageToken = nextPageToken;

      const response = await axios.get(URL, { params });
      const items = response.data.items || [];

      items.forEach((item) => {
        const comment = item.snippet.topLevelComment.snippet.textDisplay;
        comments.push(comment);
      });

      nextPageToken = response.data.nextPageToken;
      if (!nextPageToken) break;
    }

    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error.message);
  }
};
*/
const getVideoComments = async (VIDEO_ID) => {
  let comments = [];
  let nextPageToken = "";
  let params = {
    part: "snippet",
    videoId: VIDEO_ID,
    key: API_KEY,
    maxResults: 10, // Fetch 100 per request
  };

  try {
    for (let i = 0; i < 2; i++) { // Limit to 2 API requests (200 comments max)
      if (nextPageToken) params.pageToken = nextPageToken;

      const response = await axios.get(URL, { params });
      const items = response.data.items || [];

      items.forEach((item) => {
        const comment = item.snippet.topLevelComment.snippet.textDisplay;
        comments.push(comment);
      });

      nextPageToken = response.data.nextPageToken;
      if (!nextPageToken) break; // Stop if no more pages
    }

    console.log(`Fetched ${comments.length} comments`);
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    return []; // Return an empty array on failure
  }
};
/*
const getCommentMonth = async (videoId) => {
  const arr = new Array(12).fill(0);
  const cy = new Date().getFullYear();

  try {
    let nextPageToken = "";
    let commentsByMonth = {};
    do {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/commentThreads",
        {
          params: {
            key: API_KEY,
            videoId: videoId,
            part: "snippet",
            maxResults: 100,
            pageToken: nextPageToken,
          },
        }
      );

      response.data.items.forEach((item) => {
        const comment = item.snippet.topLevelComment.snippet;
        const text = comment.textDisplay;
        const publishedAt = new Date(comment.publishedAt);
        const m = publishedAt.getMonth() + 1;
        const y = publishedAt.getFullYear();
        const monthYear = `${publishedAt.getFullYear()}-${(
          publishedAt.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}`;

        if (!commentsByMonth[monthYear]) {
          commentsByMonth[monthYear] = [];
        }

        commentsByMonth[monthYear].push({ text, date: m });
        if (y === cy) arr[m - 1]++;
      });

      nextPageToken = response.data.nextPageToken || "";
    } while (nextPageToken);

    return arr;
  } catch (error) {
    console.log(error);
  }
};*/

const getVideoComments = async (VIDEO_ID) => {
  let comments = [];
  let params = {
    part: "snippet",
    videoId: VIDEO_ID,
    key: API_KEY,
    maxResults: 10, // ✅ Fetch only 100 comments
  };

  try {
    const response = await axios.get(URL, { params });
    const items = response.data.items || [];

    items.forEach((item) => {
      const comment = item.snippet.topLevelComment.snippet.textDisplay;
      comments.push(comment);
    });

    console.log(`Fetched ${comments.length} comments`);
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    return []; // Return an empty array on failure
  }
};

const getCommentMonth = async (videoId) => {
  const arr = new Array(12).fill(0);
  const cy = new Date().getFullYear();

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/commentThreads",
      {
        params: {
          key: API_KEY,
          videoId: videoId,
          part: "snippet",
          maxResults: 100, // ✅ Fetch only 100 comments (No pagination)
        },
      }
    );

    response.data.items.forEach((item) => {
      const comment = item.snippet.topLevelComment.snippet;
      const publishedAt = new Date(comment.publishedAt);
      const month = publishedAt.getMonth(); // 0-based (0 = Jan, 11 = Dec)
      const year = publishedAt.getFullYear();

      if (year === cy) {
        arr[month]++; // Increment count for this month
      }
    });

    return arr;
  } catch (error) {
    console.log("Error fetching comment months:", error.message);
    return arr;
  }
};


exports.getVideoId = getVideoId;
exports.getVideoTitle = getVideoTitle;
exports.getVideoComments = getVideoComments;
exports.getCommentMonth = getCommentMonth;
