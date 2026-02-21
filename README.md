# LeadOrbit CRM

LeadOrbit CRM is a production-style Customer Relationship Management (CRM) system built with the MERN stack.  
It is designed to simulate a real SaaS sales CRM used by teams to manage leads, track activities, and monitor sales pipeline performance.

This project focuses on backend architecture, scalable data modeling, and modern React state management to demonstrate industry-level MERN development skills.

## Features

- Role-based authentication (Admin / Manager / Sales)
- Lead management with pipeline stages
- Activity timeline (calls, meetings, notes, status changes)
- Lead assignment and ownership
- Reminder and follow-up tracking
- File attachments per lead
- Analytics dashboard with charts
- Audit logs and collaboration features
- Real-time updates (Socket-ready architecture)

## Tech Stack

**Frontend**
- React
- Redux Toolkit
- Axios
- React Router
- Chart.js / Recharts

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt password hashing

Modular architecture ensures each CRM feature is isolated with its own model, service, controller, and routes.

## Authentication

- Secure password hashing with bcrypt
- JWT-based authentication
- Role-based access control (RBAC)
- Protected API routes

## CRM Data Model

Core relationships:

User → owns many Leads  
Lead → has many Activities  
Activity → performed by User  

This mirrors real SaaS CRM architecture.

## Purpose

- Modular backend architecture
- Scalable MongoDB schema design
- Real CRM workflow modeling
- Production-level coding

## Author

Nikita Darji
MERN Stack Developer
