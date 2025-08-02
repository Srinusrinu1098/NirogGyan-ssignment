# Doctor Booking Application

A full-stack doctor appointment booking system with admin panel functionality and patient appointment booking.

## 🚀 Features

- View list of doctors with details and availability
- Book appointment with patient name, email, selected date and time
- Admin panel to Add/Edit/Delete doctors
- Backend REST API to manage doctors
- Responsive UI built with React and TailwindCSS

## 🛠️ Tech Stack

- **Frontend:** React.js, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** JSON file
- **Libraries:** multer, bcryptjs, express-validator, jsonwebtoken (optional)

## 📁 Folder Structure

```
/admin              → React Next.js
/backend              → Node.js backend
/frontend         → react.js Next.js
```

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Srinusrinu1098/NirogGyan-ssignment.git

```

### 2. Install Dependencies

```bash
# admin
cd admin
npm install

# Backend
cd backend
npm install

# frontend
cd frontend
npm install
```

### 3. Run the Application

```bash

# Start admin
cd admin
npm run dev
# Start backend
node server.js

# Start frontend
cd frontend
npm run dev
```

frontend Visit: `https://nirog-gyan-ssignment-rvst.vercel.app/`
backend Visit: `https://niroggyan-ssignment.onrender.com`

## 🔐 Admin Panel

- URL: `https://nirog-gyan-ssignment.vercel.app/`
- Features:
  - Add new doctor
  - Edit existing doctor
  - Delete doctor
  - Data stored in JSON file

## 🧠 API Endpoints

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | /api/doctors     | Get all doctors   |
| GET    | /api/doctors/:id | Get single doctor |
| POST   | /api/doctors     | Add doctor        |
| PUT    | /api/doctors/:id | Update doctor     |
| DELETE | /api/doctors/:id | Delete doctor     |

## 📋 Appointment Booking Flow

1. User selects a doctor from the list
2. Available slots are displayed
3. User enters:
   - Patient name
   - Email
   - Selects date and time
4. Appointment is marked as "Booked"

## 📝 License

This project is licensed under the MIT License.
