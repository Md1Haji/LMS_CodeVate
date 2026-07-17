# LMS Backend

Node.js + Express + MongoDB backend for the LearnSphere Learning Management System.

## Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev  # http://localhost:5000
```

## Seed Demo Data

```bash
npm run seed
```

Creates demo accounts:
- admin@lms.local / Password123!
- instructor@lms.local / Password123!
- tutor@lms.local / Password123!
- student@lms.local / Password123!

## Project Structure

```
src/
├── config/
│   └── db.js                    # MongoDB connection
├── middleware/
│   ├── auth.js                  # JWT verification
│   ├── authorize.js             # Role-based access
│   └── errorHandler.js          # Centralized error handling
├── models/
│   ├── User.js                  # User schema (all roles)
│   ├── Course.js                # Course schema
│   ├── Enrollment.js            # Student-Course junction
│   ├── Assignment.js            # Course assignments
│   ├── Submission.js            # Student submissions
│   ├── Review.js                # Course reviews
│   └── Achievement.js           # Platform badges
├── modules/
│   ├── auth/
│   │   ├── auth.controller.js
│   │   └── auth.routes.js
│   ├── admin/
│   │   ├── admin.controller.js
│   │   └── admin.routes.js
│   ├── instructor/
│   │   ├── instructor.controller.js
│   │   └── instructor.routes.js
│   ├── student/
│   │   ├── student.controller.js
│   │   └── student.routes.js
│   └── tutor/
│       ├── tutor.controller.js
│       └── tutor.routes.js
└── utils/
    ├── generateToken.js         # JWT utilities
    └── seed.js                  # Demo data
```

## API Endpoints

### Authentication (Public)
- `POST /api/auth/register` - Create student account
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user (protected)

### Admin (Protected)
- `GET /api/admin/dashboard` - Platform stats
- `GET /api/admin/users` - List users
- `POST /api/admin/users` - Create user
- `PATCH /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/courses` - List courses
- `PATCH /api/admin/courses/:id` - Update course
- `DELETE /api/admin/courses/:id` - Delete course
- `GET /api/admin/achievements` - List achievements
- `POST /api/admin/achievements` - Create achievement
- `PATCH /api/admin/achievements/:id` - Update achievement
- `DELETE /api/admin/achievements/:id` - Delete achievement
- `GET /api/admin/reviews` - List reviews
- `DELETE /api/admin/reviews/:id` - Delete review

## Environment Variables

```
MONGO_URI              # MongoDB connection string
JWT_SECRET             # Secret key for JWT signing
JWT_EXPIRES_IN         # JWT expiration time (default: 7d)
NODE_ENV               # Environment (development/production)
PORT                   # Server port (default: 5000)
CLIENT_ORIGIN          # Frontend URL for CORS
CLOUDINARY_*           # File upload service (optional)
```

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Express 4.19
- **Database:** MongoDB with Mongoose 8.4
- **Authentication:** JWT with httpOnly cookies
- **Security:** Helmet, CORS, Rate Limiting
- **Logging:** Morgan
- **Password:** bcryptjs

## Next Steps

- Implement instructor module (course creation)
- Implement student module (browsing, enrollment)
- Implement tutor module (assignment feedback)
- Add file upload for course content
- Add payment processing
- Add notifications system
