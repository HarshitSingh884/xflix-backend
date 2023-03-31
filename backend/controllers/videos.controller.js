const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const { videoService } = require("../services");

const getVideos = catchAsync(async (req, res) => {
  let resultData;
  let genresArray;
  const { genres, sortBy, title, contentRating } = req.query;

  if (!Object.keys(req.query).length) {
    resultData = await videoService.getAllVideos();
  }

  if (genres && contentRating) {
    genresArray = genres.split(",");
    resultData = await videoService.getVideosWithGenresAndContentRating(
      genresArray,
      contentRating
    );
  } else if (genres) {
    genresArray = genres.split(",");
    resultData = await videoService.getVideosByGenres(genresArray, resultData);
  } else if (contentRating) {
    resultData = await videoService.getVideosByContentRating(contentRating);
  }

  if (sortBy) {
    if (sortBy == "viewCount") {
      resultData = await videoService.sortVideosByViewCount(resultData);
    } else if (sortBy =="releaseDate") {
      resultData = await videoService.sortVideosByReleaseDate(resultData);
    } else {
      throw new ApiError(400,"\"sortBy\" must be one of [viewCount, releaseDate]");
    }
  }

  if (title) {
    resultData = await videoService.getVideosByTitle(title, resultData);
  }

  if (!resultData) {
    throw new ApiError(httpStatus.NOT_FOUND, "No videos found!");
  }

  res.status(200).send({ videos: resultData });


});






const getVideoById = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const video = await videoService.getVideoById(videoId);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, "Video not found.");
  }
  res.status(200).send(video);
});




const postVideos = async (req, res) => {
  const videoDoc = await videoService.postVideos(req.body);
  res.status(201).json(videoDoc);
};




// Request Body for updateVotes:
//       {
//       "vote":"downVote"
//       }

const updateVotes = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const { vote } = req.body;
  const result = await videoService.updateVotes(videoId, vote);
  res.status(200).send(result);
});




const updateViews = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const result = await videoService.updateViews(videoId);
  res.status(200).send(result);
});





module.exports = {
  getVideos,
  getVideoById,
  postVideos,
  updateVotes,
  updateViews,
};
