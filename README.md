# Annotation Studio

Annotation Studio is a modern web application that allows authenticated users to draw, edit, and manage rectangle annotations on a canvas. The application uses React Konva for canvas rendering and a secure backend to persist annotations per user.

---

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes and APIs

### Canvas & Annotations
- Draw rectangle annotations using click and drag
- Select, move, resize, and delete rectangles
- Visual selection and resize handles
- Inspector panel showing position and dimensions

### Data Persistence
- Annotations stored per authenticated user
- Full CRUD functionality
- Secure backend APIs

### User Interface
- Professional dark-themed UI
- Built with Material UI
- Clean and responsive layout

---

## Tech Stack

### Frontend
- Next.js (App Router)
- React
- React Konva
- Material UI
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## Project Structure

```
annotation-app/
├── app/
│   ├── canvas/          # Canvas page
│   ├── register/        # Registration page
│   ├── layout.jsx       # Root layout
│   └── page.jsx         # Login page
├── components/
│   └── CanvasStage.jsx  # Konva canvas component
├── lib/
│   └── api.js           # Axios configuration
├── README.md
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB running locally or remotely
- npm or yarn

---

### Installation

Clone the repository:

```bash
git clone <private-repo-url>
cd annotation-app
```

Install dependencies:

```bash
npm install
```

---

### Environment Setup

Create a `.env.local` file in the frontend root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

### Run the Application

```bash
npm run dev
```

Open the app in your browser:

```
http://localhost:3000
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|------|----------|-------------|
| POST | /auth/register | Register user |
| POST | /auth/login | Login user |

### Annotations
| Method | Endpoint | Description |
|------|----------|-------------|
| POST | /annotations | Create annotation |
| GET | /annotations | Get all user annotations |
| GET | /annotations/:id | Get annotation by ID |
| PUT | /annotations/:id | Update annotation |
| DELETE | /annotations/:id | Delete annotation |

---

## Security

- Passwords are hashed using bcrypt
- JWT-based stateless authentication
- Authorization middleware protects all annotation routes
- Users can only access their own annotations

---

## Deployment

- Frontend deployed on Vercel
- Backend can be deployed on Render, Railway, or AWS

---

## Collaborator

The following collaborator has been added as requested:

```
anees_ahmad@vecros.com
```

---

## Notes

- Only React Konva is used for canvas functionality
- No additional canvas or drawing libraries were used
- Designed to be clean, scalable, and production-ready

---

## License

This project is developed for assignment submission and evaluation purposes.
```
