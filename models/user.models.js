const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/baggista");
const productSchema = mongoose.Schema({
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
    cart:{
        type:Array,
        require:true,
    },
    isadmin:{
        type:boolean,
        require:true,
    },
    orders:{
        type:Array,
        require:true,
    },
    contact:{
        type:Number,
        require:true,
    },
    picture:{
        type:String,
        require:true,
    }

})

module.exports = mongoose.model("user",productSchema);