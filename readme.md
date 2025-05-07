# Blogify

Blogify is a full-featured blog platform where users can create accounts, publish blog posts with images, and interact through comments.

## Features

- **User Authentication**
  - Sign up with email and password
  - Secure login with JWT authentication
  - Password encryption using crypto hashing

- **Blog Management**
  - Create blogs with rich text content
  - Upload cover images for blogs
  - View all blogs on the homepage

- **Comments System**
  - Comment on blog posts
  - View all comments on a blog

- **Responsive Design**
  - Mobile-friendly interface
  - Bootstrap-based styling

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Frontend**: EJS templates, Bootstrap 5
- **File Upload**: Multer

## Setup Instructions

1. **Clone the repository**

2. **Install dependencies**
   ```
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file with the following variables:
   ```
   MONGO_URL=mongodb://localhost:27017/blogWebApp
   PORT=8000
   ```

4. **Start the application**
   ```
   npm start
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:8000`

## Project Structure

- `models/` - Database schemas
- `views/` - EJS templates
- `routes/` - API routes
- `middlewares/` - Authentication middleware
- `services/` - Authentication services
- `public/` - Static assets and uploaded files

## Deployment

The application is configured for deployment on Vercel using the provided `vercel.json` configuration.