const {Schema,model} = require('mongoose');

const blogSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    coverImage:{
        type:String,
        required:false,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'User',//reference to the User model
    }
}, {timestamps:true});

const Blog = model('blog',blogSchema);

module.exports = Blog;