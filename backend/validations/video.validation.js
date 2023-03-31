const Joi=require("joi");
const {objectId}=require("./custom.validation");

const getVideo={
    params: Joi.object().keys({
        videoId: Joi.string().custom(objectId),
      }),
};

module.exports={getVideo};
