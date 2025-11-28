const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/baggista");
const ownerSchema = mongoose.Schema({
    fullname: {
        type: String,
        require:true
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    products:{
        type:Array,
        require:true,
    },
    picture:{
        type:String,
        require:true,
    },
    gstin:{
         type:String,
    },

})

module.exports = mongoose.model("owner",ownerSchema);