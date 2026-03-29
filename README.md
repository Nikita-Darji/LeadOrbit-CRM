# LeadOrbit CRM

LeadOrbit CRM is a production-style Customer Relationship Management (CRM) system built with the MERN stack.  
It is designed to simulate a real SaaS sales CRM used by teams to manage leads, track activities, and monitor sales pipeline performance.

This project focuses on backend architecture, scalable data modeling, and modern React state management to demonstrate industry-level MERN development skills.

<img width="1366" height="600" alt="{837CA4E2-0378-4D43-AAEE-3C3C603C9C72}" src="https://github.com/user-attachments/assets/d37256f8-6927-42dd-98d4-bbf4a5eee56f" />

<img width="1343" height="598" alt="{24EB0207-3C7F-4AAC-A9C6-0F9A23F0D4EB}" src="https://github.com/user-attachments/assets/e7549f94-59eb-4773-8aec-876da122ffc5" />
<img width="1355" height="596" alt="{33D89F0D-85C4-4565-9DC3-88DDC11455D7}" src="https://github.com/user-attachments/assets/f3a35581-e831-460a-990c-8b0c8462706a" />
<img width="1349" height="598" alt="{5BC0F5B8-80EE-4D44-8617-3AA4838FAB9D}" src="https://github.com/user-attachments/assets/3f991f10-02a6-46f3-87de-fa61bfd752ab" />
<img width="1351" height="598" alt="{4C1D2CA2-A30C-4D42-A30E-D4F07B85E098}" src="https://github.com/user-attachments/assets/7934c60a-69db-4a76-b808-a10297bb661c" />


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
