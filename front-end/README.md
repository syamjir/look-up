# LiveConnect 🔗💬

A full-stack real-time chat application with **text messaging**, **video/audio calling**, built using **Microservices**, **Clean Architecture**, and **Dockerized deployment**.

---

## 🚀 Features

- 🔒 JWT Authentication & Role-based Access
- 💬 Real-time 1-on-1 and Group Chat (Socket.IO)
- 🎥 WebRTC-based Video & Audio Calling
- 📨 In-App Notifications
- ☁️ Scalable Microservice Architecture
- 🧱 Backend built with Clean Architecture principles
- 🐳 Dockerized Microservices with optional Kubernetes support
- ⚙️ CI/CD with GitHub Actions

---

## 🧰 Tech Stack

### Frontend

- React (with Zustand/Redux)
- Tailwind CSS or Chakra UI
- Socket.IO client
- WebRTC

### Backend

- Node.js + Express
- MongoDB or PostgreSQL
- Redis (cache/pub-sub)
- Socket.IO server
- JWT for Auth
- RabbitMQ / Kafka (optional for event streaming)

### DevOps & Infra

- Docker + Docker Compose
- Kubernetes (optional)
- GitHub Actions (CI/CD)
- NGINX or API Gateway

---

## 📁 Monorepo Structure

liveconnect/
├── gateway-api/ # API Gateway for routing
├── auth-service/ # Authentication microservice
├── user-service/ # Handles user data and profile
├── chat-service/ # Chat logic + socket communication
├── call-service/ # WebRTC signaling logic
├── notification-service/ # Push or socket notifications
├── frontend/ # React client
├── shared/ # Common utils/interfaces
├── docker-compose.yml # Compose file
└── README.md

---

## 🧱 Clean Architecture (Example - chat-service)

chat-service/
├── src/
│ ├── controllers/
│ ├── use-cases/
│ ├── repositories/
│ ├── models/
│ ├── routes/
│ └── services/
├── config/
├── app.js
└── server.js

## 🛠️ Setup Instructions

### Prerequisites

- Node.js
- Docker & Docker Compose
- (Optional) Kubernetes (minikube/k3s)
- MongoDB/PostgreSQL (used via containers)

### Clone & Run

```bash
git clone https://github.com/yourusername/liveconnect.git
cd liveconnect
docker-compose up --build
```

src/
├── adapters/
│ └── http/
│ ├── controllers/
│ │ └── auth.controller.ts
│ └── routes/
│ └── auth.routes.ts
│
├── application/
│ └── auth/
│ └── auth.usecase.ts
│
├── domain/
│ ├── entities/
│ │ └── user.entity.ts
│ └── repositories/
│ └── user.repository.ts
│
├── infrastructure/
│ └── database/
├── connection/
└── mongo.connection.ts
│ ├── models/
│ └── user.model.ts
│ └── repositories/
│ └── user.mongo.repository.ts
│
├── shared/
│ └── utils/
│ └── hash.ts
│
└── server.ts
