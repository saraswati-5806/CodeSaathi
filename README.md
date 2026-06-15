# CodeSaathi — AI-Powered LMS & Online Coding Platform

CodeSaathi is a full-stack AI-powered Learning Management System built for Sqrock IT Solutions Week 4 Web Development Task. It allows students to enroll in courses, attend live classes, solve coding challenges, attempt quizzes, use AI study tools, track progress, earn XP, and generate certificates.

## Features

### Student
- Register/Login
- Browse and enroll in courses
- View lectures and progress
- Solve coding challenges
- Attempt quizzes
- Use AI Study Workspace
- Use Vault + RAG notes assistant
- Track XP, badges, leaderboard
- Generate and view certificates

### Instructor
- Login as instructor
- Create courses
- Add lectures
- Create coding challenges
- Schedule live classes
- Create quizzes and assessments

### AI Features
- AI Study Workspace
- Summary generation
- Flashcard generation
- Quiz from notes
- Vault + RAG based study assistant

## Tech Stack

### Frontend
- Next.js / React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JWT
- bcryptjs
- Role-Based Access Control

### Other
- Cloudinary-ready structure
- Gemini-ready AI structure
- REST APIs

## Folder Structure

```txt
CodeSaathi/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   └── components/
│   └── package.json
└── README.md

Local Setup
Backend
cd backend
npm install
npm run dev

Backend runs on:

http://localhost:5000
Frontend
cd frontend
npm install
npm run dev -- --webpack

Frontend runs on:

http://localhost:3000
Environment Variables
backend/.env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLIENT_URL=http://localhost:3000
frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
Main Pages
/
 /dashboard
 /instructor/dashboard
 /courses
 /coding
 /quiz
 /study-workspace
 /leaderboard
 /certificates
Demo Credentials
Student
Email: student@codesaathi.com
Password: Student@123
Instructor
Email: instructor@codesaathi.com
Password: Instructor@123
API Modules
Auth API
Course API
Live Class API
Coding Challenge API
Quiz API
Vault + RAG API
AI Workspace API
Leaderboard API
Notification API
Certificate API
Progress API

Deployment

Frontend can be deployed on Vercel. Backend can be deployed on Render. Database is hosted on MongoDB Atlas.

Author

Saraswati Panigrahi
B.Sc. IT Student
GitHub: https://github.com/saraswati-5806