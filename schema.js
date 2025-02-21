// const Joi = require('joi');

// const listingSchema = Joi.object({
//     title: Joi.string().required(),
//     company:Joi.string().required(),
//     location: Joi.string().required(),
//     requirements: Joi.string().required(),
//     stipend: Joi.number().required(),
//     technology: Joi.string().required(),
//     applyLink: Joi.string().required(),
//     postedDate: Joi.date().required(),
//     deadline: Joi.date().required(),
// })

// module.exports = listingSchema;

const Joi = require('joi');

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    company: Joi.string().required(),
    location: Joi.string().required(),
    requirements: Joi.string().optional(),
    technology: Joi.string().optional(),
    applyLink: Joi.string().uri().required(),
    postedDate: Joi.date().optional(),
    deadline: Joi.date().optional()
  }).required()  // Ensure this is required
});

module.exports = listingSchema;
