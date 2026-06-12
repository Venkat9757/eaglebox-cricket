# Eagle Box Cricket

Eagle Box Cricket is a production-style cricket venue booking platform for branch-based ground reservations. Customers can select a branch, choose a date and time, and book an available ground automatically.

## Project Overview

This project is being rebuilt as a practical venue booking application for cricket grounds. The current focus is on a clean booking workflow, persistent storage, and a future-ready backend structure for admin management.

## Features

- Branch-based booking flow
- Date and time selection
- Automatic ground allocation across the selected branch
- Conflict detection for overlapping bookings
- MySQL-backed persistence for bookings and venue data
- Backend API prepared for future admin dashboard expansion

## Technology Stack

### Frontend

- React
- Vite
- CSS

### Backend

- Node.js
- Express
- MySQL

## Folder Structure

```text
frontend/
  src/
  public/
  package.json
backend/
  src/
  server.js
  package.json
  .env.example
  init.sql
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd eaglebox
```

### 2. Frontend setup

```bash
npm install
npm run dev
```

### 3. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Update the backend environment variables with your local MySQL configuration.

### 4. Create the database

Run the SQL in backend/init.sql against your MySQL server.

### 5. Start the backend

```bash
node server.js
```

## Environment Variables

The backend uses the following variables:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=eaglebox
PORT=5000
```

Do not commit your real .env file. Keep it local only.

## Future Enhancements

- Admin dashboard and booking management UI
- Branch and ground management
- Booking cancellations and status updates
- Payment integration
- Email and SMS notifications
- Deployment to Render
