const VideoModel = require("../models/video.model");
const ApiError = require("../utils/ApiError");

const getAllVideos = async () => {
  const videos = await VideoModel.find({});
  return videos;
};

const getVideoById = async (videoId) => {
  const video = await VideoModel.findById(videoId);
  if (!video) {
    throw new ApiError(404, "No video found with matching id");
  }
  return video;
};

const getVideosByGenres = async (genresArray, videos) => {
  let result = [];

  if (!videos) {
    videos = await getAllVideos();
  }

  // because genresArray can have either "ALL" or comedy,sports,education...
  if (genresArray[0] == "All") {
    return videos;
  }

  for (let i = 0; i < genresArray.length; i++) {
    let currGenreList = await videos.filter(
      (obj) => obj.genre == genresArray[i]
    );
    result = result.concat(currGenreList);
  }

  return result;
};

const getVideosByTitle = async (title, videos) => {
  let result;

  if (!videos) {
    const regex = new RegExp(title, "i");
    result = await VideoModel.find({ title: { $regex: regex } });
  } else {
    result = videos.filter((obj) =>
      obj.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (!result) {
    throw new ApiError(404, "No videos Found");
  }

  return result;
};

const getVideosByContentRating = async (contentRating) => {
  let videos = await getAllVideos();

  if (contentRating == "7+") {
    return videos;
  } else if (contentRating == "10+") {
    videos = videos.filter(
      (obj) =>
        obj.contentRating == "10+" ||
        obj.contentRating == "12+" ||
        obj.contentRating == "16+" ||
        obj.contentRating == "18+"
    );
  } else if (contentRating == "12+") {
    videos = videos.filter(
      (obj) =>
        obj.contentRating == "12+" ||
        obj.contentRating == "16+" ||
        obj.contentRating == "18+"
    );
  } else if (contentRating == "16+") {
    videos = videos.filter(
      (obj) => obj.contentRating == "16+" || obj.contentRating == "18+"
    );
  } else if ((contentRating = "18+")) {
    videos = videos.filter((obj) => obj.contentRating == "18+");
  }

  return videos;
};

const postVideos = async (payload) => {
    const { videoLink } = payload;

  // const videoLinkExist = await VideoModel.isVideoLinkExist(videoLink);
 
  // if (videoLinkExist) {
  //      throw new Error("Video Link already exist");
  // }

  const videoDoc = await VideoModel.create(payload);
    return videoDoc;
};

const sortVideosByViewCount = async (videos) => {
  let result;
  if (!videos) {
    result = await VideoModel.find({}).sort({ viewCount: -1 });
  } else {
    result = videos.sort(function (a, b) {
      return b.viewCount - a.viewCount;
    });
  }
  return result;
};

const getVideosWithGenresAndContentRating = async (
  genresArray,
  contentRating
) => {
  const videos = await getVideosByContentRating(contentRating);
  const result = await getVideosByGenres(genresArray, videos);
  if (result.length == 0) {
    throw new ApiError(404, "No video found");
  }
  return result;
};

const sortVideosByReleaseDate = async (videos) => {
  let result;
  let monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  if (!videos) {
    result = await VideoModel.find({});

    result.sort(function(a,b){
      let arr1=a.releaseDate.split(" ");
      let arr2=b.releaseDate.split(" ");
      const month1=monthsArr.findIndex((ele)=>ele==arr1[1]);
      const month2=monthsArr.findIndex((ele)=>ele==arr2[1]);
       arr1[1]=month1;
       arr2[1]=month2;
       const c=arr1.reverse().join("");
       const d=arr2.reverse().join("" );
       return d-c;

    });
  } 
  
  else {

    result=videos;
    result.sort(function(a,b){
      let arr1=a.releaseDate.split(" ");
      let arr2=b.releaseDate.split(" ");
      const month1=monthsArr.findIndex((ele)=>ele==arr1[1]);
      const month2=monthsArr.findIndex((ele)=>ele==arr2[1]);
       arr1[1]=month1;
       arr2[1]=month2;
       const c=arr1.reverse().join("");
       const d=arr2.reverse().join("" );
       return c-d;

    });
  }

  return result;
};

const updateVotes = async (videoId, vote) => {
  let video = await getVideoById(videoId);

  if (vote == "upVote") {
    const currUpVotes = video.votes.upVotes;
    video.votes.upVotes = currUpVotes + 1;
    await video.save();
    return video;
  } else if (vote == "downVote") {
    const currDownVotes = video.votes.downVotes;
    video.votes.downVotes = currDownVotes + 1;
    await video.save();
    return video;
  } else {
    throw new ApiError(
      404,
      "Please mention correct vote-type in request body."
    );
  }
};

const updateViews = async (videoId) => {
  const video = await getVideoById(videoId);
  const currViewCount = video.viewCount;
  video.viewCount = currViewCount + 1;
  await video.save();
  return video;
};

module.exports = {
  getAllVideos,
  getVideoById,
  getVideosByGenres,
  getVideosByTitle,
  getVideosByContentRating,
  postVideos,
  sortVideosByViewCount,
  getVideosWithGenresAndContentRating,
  sortVideosByReleaseDate,
  updateVotes,
  updateViews,
};
