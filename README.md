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
/client              → React frontend
/server              → Node.js backend
/screenshots         → UI screenshots
```

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/doctor-booking-app.git
cd doctor-booking-app
```

### 2. Install Dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 3. Run the Application

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm run dev
```

Visit: `http://localhost:3000`

## 🔐 Admin Panel

- URL: `http://localhost:3000/admin`
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

## 🖼️ Screenshots

Add UI screenshots from the `/screenshots` folder.

## 📝 License

This project is licensed under the MIT License.
