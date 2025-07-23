import express from 'express';
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogAdmin, getAllCommentsAdmin, getDashboard } from '../controllers/adminControllers.js';
import auth from '../middleware/auth.js';
const adminRouter= express.Router();

adminRouter.post('/login',adminLogin);
adminRouter.get('/comments',auth, getAllCommentsAdmin);
adminRouter.get('/blogs',auth, getAllBlogAdmin);
adminRouter.post('/delete-comment',auth, deleteCommentById);
adminRouter.post('/approve-comment',auth, approveCommentById);
adminRouter.get('/dashboard',auth, getDashboard);

export default adminRouter;