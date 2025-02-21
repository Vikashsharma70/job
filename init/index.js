const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const Listing = require('../models/listing.js');
const initData = require('./data.js');


const DBurl = 'mongodb://127.0.0.1:27017/job';
main().then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));

async function main() {
    await mongoose.connect (DBurl)
}


const initDb = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({
      ...obj , owner:"67b4dc7a7c014a1608d105a9"
    }))
     const res = await Listing.insertMany(initData.data);
     console.log("Data Inserted", res);
}

initDb();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
