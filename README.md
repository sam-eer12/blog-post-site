# Amethyst Wave

A full-stack blog application built with React.js frontend and Node.js/Express backend. This application allows users to read blog posts and provides an admin panel for managing blog content and comments.

## 🚀 Features

### User Features
- **Browse Blog Posts**: View all published blog posts on the homepage
- **Read Individual Posts**: Click on any blog post to read the full content
- **Newsletter Subscription**: Subscribe to the newsletter for updates
- **Responsive Design**: Optimized for both desktop and mobile devices

### Admin Features
- **Admin Dashboard**: Complete admin panel with analytics and overview
- **Blog Management**: Create, edit, and delete blog posts
- **Rich Text Editor**: Built-in Quill editor for writing blog content
- **Image Upload**: Upload and manage blog images with ImageKit integration
- **Comment Management**: View and moderate user comments
- **Authentication**: Secure admin login system with JWT tokens

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Quill.js** - Rich text editor for blog content
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Toast notifications
- **Motion** - Animation library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **Google GenAI** - AI integration for content generation
- **ImageKit** - Image management and optimization
- **Multer** - File upload middleware
- **CORS** - Cross-Origin Resource Sharing

## 📁 Project Structure

```
amethyst-wave/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context for state management
│   │   └── assets/        # Images and icons
│   ├── package.json
│   └── vite.config.js
├── server/                # Backend Express application
│   ├── configs/          # Database and service configurations
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── uploads/         # File upload directory
│   └── server.js        # Main server file
└── package.json         # Root package.json with dev scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd amethyst-wave
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/blogpost
   JWT_SECRET=your_jwt_secret_key
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin123
   
   # ImageKit Configuration
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   
   # Google GenAI API Key
   GOOGLE_API_KEY=your_google_genai_api_key
   ```

4. **Start the development servers**
   ```bash
   # From the root directory - starts both frontend and backend
   npm run dev
   ```
   
   Or run them separately:
   ```bash
   # Frontend only (from root)
   npm run frontend
   
   # Backend only (from root)
   npm run backend
   ```

### Production Deployment

This project is configured for deployment on Vercel:

1. **Frontend Deployment**: Deploy the `client` folder to Vercel
2. **Backend Deployment**: Deploy the `server` folder to Vercel as a Node.js function

The project includes `vercel.json` configuration files for both frontend and backend.

## 📝 API Endpoints

### Blog Routes (`/api/blog`)
- `GET /blogs` - Get all blog posts
- `GET /blog/:id` - Get a specific blog post
- `POST /comment` - Add a comment to a blog post

### Admin Routes (`/api/admin`)
- `POST /login` - Admin login
- `POST /add-blog` - Create a new blog post
- `GET /blogs` - Get all blogs (admin view)
- `DELETE /blog/:id` - Delete a blog post
- `GET /comments` - Get all comments
- `DELETE /comment/:id` - Delete a comment

## 🎨 Features in Detail

### Blog Management
- Create rich-text blog posts with embedded images
- Upload and manage blog featured images
- Schedule and publish posts
- SEO-friendly URLs and metadata

### Admin Dashboard
- Overview of total blogs, comments, and site analytics
- Quick access to all management features
- Responsive admin interface

### Comment System
- Users can comment on blog posts
- Admin moderation for comments
- Real-time comment display

## 🔧 Development

### Available Scripts

**Root Level:**
- `npm run dev` - Start both frontend and backend in development mode
- `npm run frontend` - Start only the frontend development server
- `npm run backend` - Start only the backend development server

**Client:**
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Server:**
- `npm start` - Start production server
- `npm run server` - Start development server with nodemon

## 🚀 Deployment

### Vercel Deployment

1. **Frontend (Client)**:
   - Deploy the `client` folder to Vercel
   - Build command: `npm run build`
   - Output directory: `dist`

2. **Backend (Server)**:
   - Deploy the `server` folder to Vercel
   - The `vercel.json` configuration handles the Node.js function setup

### Environment Variables for Production

Make sure to set all required environment variables in your deployment platform:
- Database connection string
- JWT secret
- ImageKit credentials
- Google GenAI API key

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

If you have any questions or need help with setup, please create an issue in the repository.

---

**Happy Blogging! ✨**
