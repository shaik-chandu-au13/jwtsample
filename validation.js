const Joi = require("joi");
const registervalidate = (data) => {
	console.log(data)
	const schema = Joi.object({
		firstname: Joi.string().max(10).required(),
		lastname: Joi.string().min(1),
		email: Joi.string().min(6).required().email(),
        phone: Joi.number().min(2).required(),
        
        password:Joi.string().required(),
		passwordConfirmation:Joi.string().required(),
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