# Project Blueprint: Dynamic Resume Orchestrator

This project uses a **React** frontend, a **Go** backend (Chi router), and **MongoDB** to allow for dynamic resume generation based on project selection.

## 🏗️ Technical Stack

* **Frontend:** React (Vite), Clerk (Auth), TailwindCSS (Styling).
* **Backend:** Go, `chi` (Router), `mongo-go-driver` (Database).
* **Database:** MongoDB Atlas (NoSQL).
* **Infrastructure:** Docker (Multi-container), GitHub Actions (CI/CD).

---

## 📂 Project Structure

```text
.
├── .github/workflows/
│   └── deploy.yml            # CI/CD Pipeline
├── backend/
│   ├── cmd/api/main.go       # Entry point
│   ├── internal/
│   │   ├── database/         # MongoDB connection & Repo logic
│   │   ├── handlers/         # HTTP Handlers (Chi)
│   │   ├── middleware/       # Auth/Clerk validation
│   │   └── models/           # BSON/JSON Structs
│   ├── Dockerfile            # Multi-stage Go build
│   └── go.mod
├── frontend/
│   ├── src/
│   │   ├── components/       # ResumePreview, ProjectCard
│   │   ├── hooks/            # Data fetching
│   │   └── App.jsx
│   ├── Dockerfile            # Nginx-based build
│   └── package.json
└── docker-compose.yml        # Orchestrates App + DB locally

```

---

## 🚀 Implementation Phase 1: The Foundation (Auth & Infrastructure)

The goal is to get a "Protected" welcome message on the screen.

1. **Setup Clerk:** Create a project in the Clerk Dashboard.
2. **Frontend Auth:** Wrap the React app in `<ClerkProvider>`. Create a simple sign-in page.
3. **Backend Auth Middleware:** * In Go, create a middleware that checks the `Authorization: Bearer <token>` header.
* Use Clerk's SDK or a JWT library to validate the token before allowing access to API routes.


4. **Dockerization:** Write the initial Dockerfiles. Ensure the frontend can communicate with the backend via `localhost:8080`.

---

## 📊 Implementation Phase 2: Data & NoSQL Modeling

Since you are new to NoSQL, remember: **The Go Struct is your Schema.**

1. **Define Project Struct:**
```go
type Project struct {
    ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
    UserID      string             `bson:"user_id" json:"user_id"` // From Clerk
    Title       string             `bson:"title" json:"title"`
    Description string             `bson:"description" json:"description"`
    Tags        []string           `bson:"tags" json:"tags"`       // ["Go", "React", "NoSQL"]
    IsSelected  bool               `bson:"is_selected" json:"is_selected"`
}

```


2. **MongoDB Setup:** Use MongoDB Atlas (Free Tier).
3. **Repository Pattern:** In `internal/database`, write functions like `GetProjects(userID string)` and `UpdateProjectSelection(id string, selected bool)`.

---

## 🎨 Implementation Phase 3: The Orchestration Logic

This is the core "Problem Solver" for your resume remake issue.

1. **The Selector UI:** Create a dashboard where you can toggle projects on and off.
2. **Derived State (The Magic):**
* On the frontend, create a helper function: `getResumeSkills(selectedProjects)`.
* This function iterates through the `tags` of all selected projects and returns a unique list of tools to display in the "Skills" section.


3. **Summary Logic:** * If "Go" is a frequent tag in selected projects, swap the summary template to emphasize "Backend Engineering."
4. **Ordering:** Implement a simple "Move Up/Move Down" index swap in your React state to reorder the project array.

---

## 🔄 Implementation Phase 4: CI/CD Pipeline

Automate your deployment using GitHub Actions.

1. **Workflow File:** Create `.github/workflows/deploy.yml`.
2. **Steps:**
* **Lint/Test:** Run `go test` and `npm run lint`.
* **Build Images:** Use `docker build -t my-repo/resume-backend ./backend`.
* **Push:** Push images to Docker Hub or GitHub Packages.
* **Deploy:** SSH into your server and run `docker-compose pull && docker-compose up -d`.



---

## 🔮 Future Roadmap

* **Work Experience Module:** Apply the same "toggle" logic to previous jobs.
* **PDF Export:** Use `react-to-print` or CSS Print Media Queries to save the generated view as a clean PDF.
* **AI Integration:** Paste a Job Description and let an LLM suggest which of your existing projects are the best "Selected" matches.

---

### Your First Step

Start by initializing the Go backend with `chi` and creating a single protected `/ping` route that requires a Clerk JWT. This ensures your "hassle" (Authentication) is solved before you build the fun parts.
