const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deadLine = Date.now() + 1000 * 60 * 60 * 24 * 7;

const simpleListing = new Schema({
  title: { type: [String],   required: true },  
  company: { type: String,  required: true },  
  location: { type: [String],  required: true },  
  requirements: { type: [String], required: true },  
  stipend: { type: String, default: "Unpaid" }, 
  technology: { type: [String], required: true },  
  applyLink: { type: String,  required: true }, 
  postedDate: { type: Date,  default: Date.now },  
  deadline: { type: Date , default: deadLine },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Listing', simpleListing);