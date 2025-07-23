import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(), // Use memory storage for serverless environments
    fileFilter: function(req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

export default upload;