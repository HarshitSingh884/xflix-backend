const router=require("express").Router();
const videosRoute=require("./videos.route");

router.use("/videos",videosRoute);


module.exports=router;