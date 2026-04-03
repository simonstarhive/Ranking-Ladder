#  Tennis Ladder System

A full-stack web application for managing tennis rankings and match scores for clubs and organizations.
Designed for scalability, real-world usage, and multi-organization expansion.

---

##  Live Demo

https://starhivehydra.ddns.net/rankingladder/

---

##  Table of Contents

* [About](#about)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Architecture](#architecture)
* [Getting Started](#getting-started)
* [Environment Variables](#environment-variables)
* [Running the Project](#running-the-project)
* [API Examples](#api-examples)
* [Testing](#testing)
* [Deployment](#deployment)
* [Future Improvements](#future-improvements)
* [Author](#author)

---

##  About

The Tennis Ladder System allows tennis clubs to:

* Manage player rankings (Men/Women)
* Record match scores
* Provide an admin dashboard for ranking control
* Maintain structured competitive ladders

This project simulates a real-world system used by organizations such as university tennis clubs.

---

##  Features

###  User Features

* View rankings (Men/Women)
* View match scores
* Report match results (pending admin approval)

###  Admin Features

* Add/Edit/Delete players
* Manage rankings dynamically (auto reordering system)
* Add/Edit/Delete match scores
* Role-based authentication (Admin vs User)

###  System Features

* REST API backend
* Persistent database (MariaDB)
* Environment-based configuration
* Cloud-ready deployment (Render)

---

##  Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* React Router

### Backend

* Spring Boot
* Java 17
* Spring Data JPA
* Spring Security

### Database

* MariaDB

### Deployment

* Render (Backend)
* Custom domain / Cloud hosting (Frontend)

---

##  Architecture

```
Frontend (React)
        ↓
REST API (Spring Boot)
        ↓
MariaDB Database
```

Supports future scaling into multi-tenant architecture for multiple organizations.

---

##  Getting Started

You can run this project in **2 ways**:

---

#  Option 1 — Run with Docker 

This requires **only Docker installed**.

### 1. Install Docker

 https://www.docker.com/products/docker-desktop

---

### 2. Clone the repository

```bash
git clone https://github.com/your-username/tennis-ladder.git
cd tennis-ladder
```

---

### 3. Run the backend

```bash
docker build -t tennis-backend .
docker run -p 8080:8080 tennis-backend
```

---

### 4. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

---

 Frontend: http://localhost:5173
 Backend: http://localhost:8080

---

#  Option 2 — Run Manually (No Docker)

### Prerequisites

* Node.js (v18+)
* Java 17
* Maven
* MariaDB

---

##  Database Setup

Create database:

```sql
CREATE DATABASE ranking_ladder_db;
```

---

##  Environment Variables

Create a `.env` file in backend:

```env
DB_URL=jdbc:mariadb://localhost:3306/ranking_ladder_db
DB_USERNAME=your_username
DB_PASSWORD=your_password

ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

---

##  Run Backend

```bash
cd backend
mvn spring-boot:run
```

---

##  Run Frontend

```bash
cd frontend
npm install
npm run dev
```

---

#  API Examples

## Get Rankings

```
GET /api/rankings?category=MEN
```

## Add Score

```
POST /api/scores
```

Example body:

```json
{
  "playerA": "Juan Carlos",
  "playerB": "Pedro Mora",
  "score": "6-2",
  "gender": "MALE"
}
```

---

## Update Score

```
PUT /api/scores/{id}
```

---

## Get Scores

```
GET /api/scores?gender=MALE
```

---

#  Testing

### Backend

```bash
mvn test
```

### Frontend

```bash
npm run dev
```

---

#  Deployment

### Backend

* Hosted on Render
* Uses environment variables for production configuration

### Frontend

* Hosted on cloud / CDN
* Connected via API base URL

---

#  Future Improvements

* Multi-tenancy (support multiple schools)
* Email-based score approval system
* Player authentication system (JWT)
* Match history analytics
* Mobile app version

---

#  Author

**Angel Wu**
Computer Science Student

---

#  Why This Project Matters

This project demonstrates:

* Full-stack development skills
* Real-world system design
* Deployment and cloud integration
* Scalable architecture planning

---

#  Contact

Feel free to reach out for collaboration or questions!
