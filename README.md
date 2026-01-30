# Annotation Studio

Annotation Studio is a modern web application that allows authenticated users to draw, edit, and manage rectangle annotations on a canvas. The application is built using Next.js, React Konva, Material UI, and a secure Node.js backend with JWT-based authentication.

---

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes for authenticated users

### Canvas & Annotations
- Draw rectangle annotations using click-and-drag
- Select, move, resize, and delete annotations
- Visual feedback for selected annotations
- Inspector panel displaying position and dimensions

### Data Persistence
- Annotations are stored per user
- Full CRUD operations via REST APIs
- Secure access control for all annotation endpoints

### User Interface
- Professional dark-themed UI using Material UI
- Clean layout with inspector panel and canvas workspace
- Responsive and user-friendly design

---

## Tech Stack

### Frontend
- Next.js (App Router)
- React
- React Konva
- Material UI (MUI)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## Project Structure

annotation-app/
├── app/
│ ├── canvas/ # Canvas page
│ ├── register/ # Register page
│ ├── layout.jsx # App layout
│ └── page.jsx # Login page
├── components/
│ └── CanvasStage.jsx # Konva canvas component
├── lib/
│ └── api.js # Axios instance
├── README.md
└── package.json


---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

---

### Clone the Repository

```bash
git clone <your-private-github-repo-url>
cd annotation-app
Install Dependencies
npm install
Environment Configuration
Create a .env.local file in the frontend root directory:

NEXT_PUBLIC_API_URL=http://localhost:5000/api
Run the Application
npm run dev
Open your browser at:

http://localhost:3000
API Endpoints
Authentication
Method	Endpoint	Description
POST	/auth/register	Register user
POST	/auth/login	Login user
Annotations
Method	Endpoint	Description
POST	/annotations	Create annotation
GET	/annotations	Get all user annotations
GET	/annotations/:id	Get annotation by ID
PUT	/annotations/:id	Update annotation
DELETE	/annotations/:id	Delete annotation
Security
Passwords are hashed using bcrypt

JWT-based stateless authentication

Authorization middleware protects all routes

Users can only access their own annotations

Deployment
Frontend deployed using Vercel

Backend can be deployed on Render, Railway, or AWS

Environment variables are configured per deployment

Collaborator
The following collaborator has been added to the repository as requested:

anees_ahmad@vecros.com
Notes
Only the React Konva library is used for canvas functionality

No additional drawing or canvas libraries were used

The application is structured for scalability and maintainability

License
This project is created for assignment submission and evaluation purposes.
