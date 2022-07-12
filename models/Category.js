const mongoose = require('mongoose');
const slugfiy= require('slugify');
const Schema = mongoose.Schema;


const CategoryeSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    slug: {
        type:String,
        unique:true,
    }
});

CategoryeSchema.pre('validate', function(next){
    this.slug=slugfiy(this.name,{
        lower:true,
        String:true
    })
    next();
})


const Category = mongoose.model('Category', CategoryeSchema);
module.exports=Category;
