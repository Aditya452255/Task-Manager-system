const mongoose =require(`mongoose`);

const taskschema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter name'],
        maxlength:[20,'Name cannot be more than 20 characters'],
        trim: true,
    },
    completed:{
        type:Boolean,
        default:false,
    },
})

module.exports = mongoose.model(`Task`,taskschema)