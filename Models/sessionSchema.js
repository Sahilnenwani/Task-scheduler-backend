const mongoose=require('mongoose');


const sessionSchema=new mongoose.Schema({
  
    refreshToken:{
        type:String,
        unique:true,
    },
    accessToken:{
        type:String,
        unique:true,
    }
    
})

const session=mongoose.model("session",sessionSchema);
// session.createIndexes();
module.exports=session;