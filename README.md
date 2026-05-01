# Markwise

A full-stack web application built using React.js, Node.js, Express.js, and MongoDB. It enables teachers to generate QR codes for marking attendance, while students can scan these codes to record their presence. The system ensures secure authentication, real-time attendance tracking, and role-based access control.

## Deployed Link

Project is deployed to Vercel: [Link](https://attendance-management-system-rose.vercel.app/)

## Tech Stack

- **Front-End**: React, Tailwind, ShadCN, Redux, Axios
- **Back-End**: Node, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: jsonwebtoken, bcrypt
- **Other Tools**: Vercel, Render, UptimeRobot, qrcode, html5-qrcode

## 🔑 Features

- **QR Code Generation**: Teachers can generate unique QR codes for each class session.
- **Real-Time Attendance Tracking**: Attendance is recorded instantly upon scanning.
- **Role-Based Access Control**: Separate functionalities for teachers and students.
- **Secure Authentication**: JWT-based authentication with password hashing using bcrypt.
- **Responsive Design**: Built with Tailwind CSS and ShadCN for a modern, responsive UI.

### Demo Video

If you want a guide on how to use the product, refer to **[Demo](https://www.youtube.com/watch?v=q1NrGr6ikPM)** video.

## Installation

### Local Development

1. Clone the repository

```bash
git clone https://github.com/anand-shete/Markwise
cd Markwise
```

2. Install dependencies

```bash
cd frontend
npm install
cd ../backend
npm install
```

3. Configure environment variables

Rename `.env.example` to `.env` in the `backend` directory and add following variables

```bash
MONGO_URL=your_MONGO_URL
JWT_SECRET_KEY=your_JWT_SECRET_KEY
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Rename `.env.example` to `.env` in `frontend` directory and add following variables

```bash
VITE_RENDER_API=http://localhost:3000/api
```

4.  Start the Backend server

```bash
npm run start
```

Inside a new terminal, start frontend development server

```bash
npm run dev
```

## Troubleshooting

- **MongoDB Connection Error**: Ensure your `MONGO_URL` is correct and that your IP is whitelisted in MongoDB Atlas.
- **CORS Issues**: Verify that the `FRONTEND_URL` matches the backend URL and port.
- **QR Code Not Scanning**: Ensure the `html5-qrcode` library is properly installed and camera permissions are granted in the browser.

## API Endpoints

POST `/api/student/signup` → Registers a new student.  
GET `/api/student/check-auth` → Checks if a student is authenticated.  
POST `/api/student/attendanceMarked/:id` → Marks attendance of student for the scanned QR code.  
POST `/api/teacher/generateQrCode/:id` → Generates a QR code for a specific class session.

## Contact

For questions or feedback, feel free to reach out:

- **Email**: [anandshete1234@gmail.com](mailto:anandshete1234@gmail.com)
- **GitHub**: [anand-shete](https://github.com/anand-shete)
- **LinkedIn**: [anand-shete](https://www.linkedin.com/in/anand-shete)

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to fork the repository and create a pull request.



## Future Implementation
- Containerize frontend and backend applications
- Make UI responsive in client-side
- Add ShadCN Charts for detailed analysis
