const mongoose = require('mongoose')
const siteSchmea = new mongoose.Schema({
    homeImage:{type:String,required:'Cannot be empty'},
    aboutImage:{type:String,required:'Cannot be empty'},
    aboutText:{type:String,required:'Cannot be empty'},
    contactImage:{type:String,required:'Cannot be empty'},
    cintactText:{type:String,required:'Cannot be empty'}




})
module.exports=mongoose.model("Site",siteSchmea)