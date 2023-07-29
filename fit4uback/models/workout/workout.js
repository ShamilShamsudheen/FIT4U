const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Trainer = require('../trainer/trainerModel');

const workouts_Item_Details = new Schema({
    item_name:{
        type:String,
        required:true
    },
    item_instruction:{
        type:String,
        required:true
    },
    item_instruction_refer:{
        type:String,
        required:true
    }
})

const WorkoutSchema = new Schema({
    trainer_id: {
        type: String, // Use String type for trainer_id
        ref: 'Trainer', // Reference to the Trainer schema
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
