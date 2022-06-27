const mongoose=require("mongoose");
const { boolean } = require("webidl-conversions");
const {Schema}= mongoose;

const tasksSchema=new Schema({
    userId:
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    checkdelete: {
        type: String,
        default:false
      },
})

const tasks=mongoose.model("Tasks",tasksSchema);
// tasks.createIndexes();
module.exports=tasks;