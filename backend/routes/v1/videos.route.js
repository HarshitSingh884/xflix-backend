const router=require("express").Router();
const validate = require("../../middlewares/validate");
const productValidation = require("../../validations/video.validation");
// const {getVideos,getVideoById,postVideos,updateVotes,updateViews}=require("../../controllers/videos.controller");
const videoController=require("../../controllers/videos.controller");

// router.get("/",(req,res)=>{console.log("Hello router")});
router.get("/",videoController.getVideos);
router.get("/:videoId",validate(productValidation.getVideo),videoController.getVideoById);
router.post("/",videoController.postVideos);

 
/**
 * Request Body for updateVotes:
      {
      "vote":"downVote"
      }
 */
router.patch("/:videoId/votes",validate(productValidation.getVideo),videoController.updateVotes);

router.patch("/:videoId/views",validate(productValidation.getVideo),videoController.updateViews);


module.exports=router;