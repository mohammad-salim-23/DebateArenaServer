# 🗃️ DebateArena Backend

This is the **backend server** for the DebateArena platform – a real-time debate and argument management system. It handles user authentication, debates, arguments, voting, and scoreboard functionalities.

---

## ✨ Features

✅ User authentication (Register & Login)  
✅ Debate creation and management  
✅ Argument submission with toxic word filtering  
✅ Voting system for arguments  
✅ Scoreboard tracking  
✅ JWT-based secure authentication  
✅ Structured with **TypeScript**, **Express.js**, and **Mongoose**

---

## 💻 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **Zod** (Request validation)
- **JWT** (Authentication)
- **bcryptjs** (Password hashing)
- **Vercel** (Deployment)

---

## ⚙️ Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/debatearena-backend.git
cd debatearena-backend
Install Dependencies

bash
Copy
Edit
npm install
# or
yarn install
Create .env file

Create a .env file in the root with:

env
Copy
Edit
PORT=5000
DATABASE_URL=mongodb+srv://username:password@cluster0.mongodb.net/debatearena
JWT_SECRET=your_jwt_secret_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_IMAGE_HOSTING_API_KEY=your_imgbb_api_key
Run the Server

bash
Copy
Edit
npm run dev
# or
yarn dev
The server will start at http://localhost:5000.

🛠️ Project Structure
sql
Copy
Edit
src/
├── app/
│   ├── middlewares/
│   ├── module/
│   │   ├── user/
│   │   ├── debate/
│   │   ├── argument/
│   │   ├── voting/
│   │   └── scoreBoard/
│   └── routers.ts
├── utils/
├── server.ts
└── app.ts
🔌 API Endpoints
✅ Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user

✅ Debate Routes
Method	Endpoint	Description
POST	/api/debates	Create a new debate
GET	/api/debates	Get all debates
GET	/api/debates/:id	Get debate by ID
POST	/api/debates/join/:id	Join debate side

✅ Argument Routes
Method	Endpoint	Description
POST	/api/arguments	Create argument (with toxic word check)
GET	/api/arguments/:debateId	Get arguments by debate
PUT	/api/arguments/:id	Update argument
DELETE	/api/arguments/:id	Delete argument

✅ Voting Routes
Method	Endpoint	Description
POST	/api/vote/:id	Vote an argument

✅ Scoreboard Routes
Method	Endpoint	Description
GET	/api/score	Get scoreboard data

🔐 Authentication
Uses JWT tokens for protected routes.

Tokens must be sent via Authorization headers for user-only routes.

⚠️ Environment Variables
Ensure the following are set:

DATABASE_URL

JWT_SECRET

NEXTAUTH_SECRET

NEXT_PUBLIC_IMAGE_HOSTING_API_KEY

📦 Deployment
The server is deployed on Vercel. Adjust your CORS settings in app.ts as per frontend deployment URLs.

👥 Contribution Guidelines
Fork the repository.

Create your feature branch: git checkout -b feature/YourFeature

Commit your changes: git commit -m 'Add YourFeature'

Push to the branch: git push origin feature/YourFeature

Submit a pull request.

📄 License
This project is open-sourced under the MIT License.

🤝 Contact
For queries, please reach out via LinkedIn or email at yourmail@example.com.

Alhamdulillah for everything.

yaml
Copy
Edit

---

✅ **Replace placeholders**:

- GitHub repo URL  
- MongoDB credentials  
- Your LinkedIn/email links

Let me know if you want **frontend README** or **API Swagger documentat