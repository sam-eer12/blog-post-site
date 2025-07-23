import fs from 'fs';
import imagekit from '../configs/imagekit.js';
import Blog from '../models/blog.js';
import Comment from '../models/comment.js';
import mongoose from 'mongoose';
import main from '../configs/gemini.js';


export const addBlog = async (req, res) => {
    try {
        console.log('Add blog request received');
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);
        
        if (!req.body.blog) {
            return res.status(400).json({success: false, message: "No blog data provided"});
        }

        let blogData;
        try {
            blogData = JSON.parse(req.body.blog);
        } catch (parseError) {
            console.log('Error parsing blog data:', parseError);
            return res.status(400).json({success: false, message: "Invalid blog data format"});
        }

        const {title, subTitle, description, category, isPublished } = blogData;
        
        const imageFile = req.file;
        if (!title || !description || !category || !imageFile ) {
            console.log('Validation failed:', { title: !!title, description: !!description, category: !!category, imageFile: !!imageFile });
            return res.status(400).json({success: false, message: "Please fill all the required fields"});
        }    
        
        console.log('Reading file:', imageFile.path);
        if (!fs.existsSync(imageFile.path)) {
            return res.status(400).json({success: false, message: "Uploaded file not found"});
        }

        const filebuffer = fs.readFileSync(imageFile.path);

        console.log('Uploading to ImageKit...');
        const response = await imagekit.upload({
            file: filebuffer,
            fileName: imageFile.originalname,
            folder: "/blogs",
        });

        const optimisedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [{
                width: 800},
                {height: 600},
                {quality: "auto"},
                {format: "webp"}
            ]
        });

        const image = optimisedImageURL;

        console.log('Creating blog in database...');
        const newBlog = await Blog.create({
            title,
            subTitle,
            description,
            category,
            image,
            isPublished: isPublished || false
        });

        console.log('Blog created successfully:', newBlog._id);
        
        // Clean up uploaded file
        try {
            fs.unlinkSync(imageFile.path);
        } catch (unlinkError) {
            console.log('Error deleting temporary file:', unlinkError.message);
        }

        res.status(201).json({ success: true, message: "Blog added successfully" });
    } catch (error) {
        console.error('Error adding blog:', error);
        res.status(500).json({ success: false, message: "Error adding blog", error: error.message });
    }
};

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({isPublished: true});
        res.status(200).json({ success: true, blog: blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching blogs", error: error.message });
    }
}

export const getBlogById = async (req, res) => {
    try{
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.status(200).json({ success: true, blog });
    } catch (error) {
        console.error('Error fetching blog by ID:', error);
        res.status(500).json({ success: false, message: "Error fetching blog", error: error.message });
    }
}

export const deleteBlog = async (req, res) => {
    try {
        console.log('Delete blog request received:', req.body);
        const {id} = req.body;
        
        if (!id) {
            return res.status(400).json({ success: false, message: "Blog ID is required" });
        }

        console.log('Attempting to delete blog with ID:', id);
        const deletedBlog = await Blog.findByIdAndDelete(id);
        
        if (!deletedBlog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        console.log('Blog deleted successfully, deleting related comments...');
        await Comment.deleteMany({ blog: id });
        
        console.log('All related data deleted successfully');
        res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ success: false, message: "Error deleting blog", error: error.message });
    }
}

export const togglePublish= async(req,res)=>{
    try{
        console.log('Toggle publish request received:', req.body);
        const {id} = req.body;
        
        if (!id) {
            return res.status(400).json({ success: false, message: "Blog ID is required" });
        }

        console.log('Finding blog with ID:', id);
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        
        console.log('Current publish status:', blog.isPublished);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        console.log('New publish status:', blog.isPublished);
        
        res.status(200).json({ success: true, message: "Blog publish status toggled successfully" });
    } catch(error){
        console.error('Error toggling publish status:', error);
        res.status(500).json({ success: false, message: "Error toggling publish status", error: error.message });
    }
}

export const addComment = async (req,res)=>{
    try{
        const {blog, name,content} = req.body;
        await Comment.create({blog, name, content});
        res.status(201).json({ success: true, message: "Comment added successfully" });
    } catch(error){
        console.error('Error adding comment:', error);
        res.status(500).json({ success: false, message: "Error adding comment", error: error.message });
    }
}

export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body;
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({createdAt:-1});
        res.status(200).json({ success: true, comments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ success: false, message: "Error fetching comments", error: error.message });
    }
}

export const generateContent = async (req,res) => {
    try {
        const {prompt} = req.body;
        const content = await main(prompt + 'generate a blog content based on the prompt in simple text format ')
        res.json({ success: true, content });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ success: false, message: "Error generating content", error: error.message });
    }
}