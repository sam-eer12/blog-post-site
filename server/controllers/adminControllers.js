import jwt from 'jsonwebtoken';
import Blog from '../models/blog.js';
import Comment from '../models/comment.js';
export const adminLogin = async (req, res) => {
    try{
        const { email, password } = req.body;

        if ((email === process.env.ADMIN_EMAIL_1 && password === process.env.ADMIN_PASSWORD_1) || (email === process.env.ADMIN_EMAIL_2 && password === process.env.ADMIN_PASSWORD_2)) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({success: true, token });
        }

        return res.status(401).json({ message: 'Invalid credentials', success: false });
    } catch (error) {
        console.error('Error during admin login:', error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
    
};


export const getAllBlogAdmin = async (req,res)=>{
    try{
        const blogs = await Blog.find({}).sort({createdAt:-1});
        res.status(200).json({ success: true, blog: blogs });
    } catch(error){
        console.error('Error fetching admin blogs:', error);
        res.status(500).json({ success: false, message: "Error fetching blogs", error: error.message });
    }
};

export const getAllCommentsAdmin = async (req,res)=>{
    try{
        const comments = await Comment.find({}).populate('blog').sort({createdAt:-1});
        res.status(200).json({ success: true, comments });
    } catch(error){
        console.error('Error fetching admin comments:', error);
        res.status(500).json({ success: false, message: "Error fetching comments", error: error.message });
    }
};

export const getDashboard = async(req, res)=>{
    try{
        const recentBlogs = await Blog.find({}).sort({createdAt:-1}).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({isPublished: false});
        res.status(200).json({ success: true, recentBlogs, blogs, comments, drafts });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ success: false, message: "Error fetching dashboard data", error: error.message });
    }
};

export const deleteCommentById = async (req,res) => {
    try{
        const { id } = req.body;
        await Comment.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ success: false, message: "Error deleting comment", error: error.message });
    }
};

export const approveCommentById = async (req,res) => {
    try{
        const { id } = req.body;
        await Comment.findByIdAndUpdate(id, { isApproved: true });
        res.status(200).json({ success: true, message: "Comment approved successfully" });
    } catch (error) {
        console.error('Error approving comment:', error);
        res.status(500).json({ success: false, message: "Error approving comment", error: error.message });
    }
};

        