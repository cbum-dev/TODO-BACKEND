
# Task Manager API

A simple RESTful Task Management API built with **Node.js**, **Express**, and **TypeScript**.

## Features

- Create, read, update, delete tasks
- Filter tasks by `status` and `title`
- Input validation using Zod
- UUID-based task IDs
- Type-safe TypeScript codebase

---

## Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/cbum-dev/TODO-BACKEND
cd TODO-BACKEND
````

2. **Install dependencies:**

```bash
npm install
```

3. **Run the app in development:**

```bash
npm run dev
```

---

## API Routes

### POST `/api/tasks` — Create a new task

**Request Body:**

```json
{
  "title": "Buy groceries",
  "description": "Milk, Eggs, Bread",
  "status": "PENDING"
}
```

**Response:**

```json
{
  "id": "uuid",
  "title": "Buy groceries",
  "description": "Milk, Eggs, Bread",
  "status": "PENDING",
  "createdAt": "2025-07-26T12:00:00Z",
  "updatedAt": "2025-07-26T12:00:00Z"
}
```

**Example:**

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, Eggs, Bread", "status": "PENDING"}'
```

---

### GET `/api/tasks` — Get all tasks (with optional filters)

**Query Parameters:**

* `status`: Filter by status (e.g., `PENDING`)
* `title`: Partial title match (e.g., `grocery`)

**Example:**

```bash
curl "http://localhost:3000/api/tasks?status=COMPLETED&title=groceries"
```

**Response:**

```json
[
  {
    "id": "uuid",
    "title": "Buy groceries",
    "description": "Milk, Eggs, Bread",
    "status": "COMPLETED",
    "createdAt": "2025-07-25T10:00:00Z",
    "updatedAt": "2025-07-25T12:00:00Z"
  }
]
```

---

### GET `/api/tasks/:id` — Get a task by ID

**Example:**

```bash
curl http://localhost:3000/api/tasks/123e4567-e89b-12d3-a456-426614174000
```

**Response:**

```json
{
  "id": "uuid",
  "title": "Buy groceries",
  "description": "Milk, Eggs, Bread",
  "status": "PENDING",
  "createdAt": "2025-07-26T12:00:00Z",
  "updatedAt": "2025-07-26T12:00:00Z"
}
```

---

### PATCH `/api/tasks/:id` — Update a task (partial update)

**Request Body:**

```json
{
  "status": "COMPLETED"
}
```

**Example:**

```bash
curl -X PATCH http://localhost:3000/api/tasks/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{"status": "COMPLETED"}'
```

---

### DELETE `/api/tasks/:id` — Delete a task

**Example:**

```bash
curl -X DELETE http://localhost:3000/api/tasks/123e4567-e89b-12d3-a456-426614174000
```

---