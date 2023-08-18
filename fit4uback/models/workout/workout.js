const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Trainer = require('../trainer/trainerModel');

const workouts_Item_Details = new Schema({
    item_name:{
        type:String,
        required:false
    },
    item_instruction:{
        type:String,
        required:false
    },
    item_instruction_refer:{
        type:String,
        required:false
    }
})

const WorkoutSchema = new Schema({
    trainer_id: {
        type: String, 
        ref: 'Trainer', 
        required: true
    },
    trainer_name:{
        type:String,
        required:true
    },
    workout_name: {
        type: String,
        required: true
    },
    isApprove:{
        type:Boolean,
        default:true
    },
    workout_items: [workouts_Item_Details]
});

module.exports = mongoose.model('Workout', WorkoutSchema);
