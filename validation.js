const Joi = require("joi");
const registervalidate = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(5).required(),
		email: Joi.string().min(6).required().email(),
        mobile: Joi.number().min(2).required(),
        address:Joi.object().required(),
        password:Joi.string().required(),
        // profilepic:Joi.string().required(),
        // coverpic:Joi.string().required(),
	});
	return schema.validate(data);
};
const loginvalidate = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(6).required().email(),
        password:Joi.string().required(),
	});
	return schema.validate(data);
};

module.exports.registervalidate = registervalidate;
module.exports.loginvalidate = loginvalidate;