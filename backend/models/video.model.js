const mongoose = require("mongoose");
const validator = require("validator");

const contentRatings = ["7+", "10+", "12+", "16+", "18+"];
const genres = ["Education", "Sports", "Comedy", "Movies", "Lifestyle"];

const videoSchema = mongoose.Schema(
  {
    title: { type: String, 
      // trim: true 
    },
    videoLink: {
      type: String,
      // trim: true,
      // validate: (value) => validator.isURL(value),
    },
    contentRating: {
      type: String,
      required: true,
      // trim: true,
      // validate(value) {
      //   if (!contentRatings.includes(value)) {
      //     throw new Error("Invalid Content Rating");
      //   }
      // },
    },
    genre: {
      type: String,
      // required: true,
      // trim: true,
      // validate(value) {
      //   if (!genres.includes(value)) {
      //     throw new Error("Invalid Genre");
      //   }
      // },
    },
    releaseDate: {
      type: String,
      // default: Date.now(),
      // default: new Date().toLocaleString("en-GB", {
      //   year: "numeric",
      //   month: "short",
      //   day: "numeric",
      // }),
      // required: true,
      // trim: true,
    },
    previewImage: {
      type: String,
      // trim: true,
      // default:
      //   "https://cdn.pixabay.com/photo/2017/03/25/04/00/youtube-2172750_960_720.png",
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    votes: {
      type: {
        upVotes: {
          type: Number,
          default: 0,
        },
        downVotes: {
          type: Number,
          default: 0,
        },
      },
      default:{
        upVotes:0,
        downVotes:0
      },
      _id: false
    }
  },
  {
    timeStamps: true,
  }
);

// videoSchema.statics.isVideoLinkExist = async function (videoLink) {
//   const response = await videoModel.findOne({ videoLink: videoLink });
//   return response;
// };

const videoModel = mongoose.model("xflixCollection", videoSchema);

module.exports = videoModel;
