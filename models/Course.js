const mongoose = require('mongoose');
const slugfiy= require('slugify');
const Schema = mongoose.Schema;


const CourseSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    slug: {
        type:String,
        unique:true,
    },
    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }
});

CourseSchema.pre('validate', function(next){
    this.slug=slugfiy(this.name,{
        lower:true,
        String:true
    })
    next();
})


const Course = mongoose.model('Course', CourseSchema);
module.exports=Course;
