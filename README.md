
## **Course Selling Platform** 🎓💻  
A full-stack **course selling platform** built with **Node.js, Express, MongoDB, and JWT authentication**. Admins can create and manage courses, while users can sign up, log in, and purchase courses securely.  

### **Features** 🚀  
✅ **User Authentication** – Secure signup & login with password hashing (bcrypt) and JWT authentication.  
✅ **Admin Dashboard** – Admins can create, update, and manage courses.  
✅ **Course Purchasing** – Users can browse and buy courses.  
✅ **MongoDB Database** – Data persistence with Mongoose.  
✅ **Middleware & Validation** – Secure API with authentication middleware and data validation using Zod.  

### **Tech Stack** 🛠  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** JWT, bcrypt  
- **Validation:** Zod  
- **Hosting:** (Add if deployed, e.g., Vercel, Render, or Railway)  

### **Setup Instructions** 🏗  
1. Clone the repo:  
   ```bash
   git clone https://github.com/yourusername/course-selling-app.git
   cd course-selling-app
   ```  
2. Install dependencies:  
   ```bash
   npm install
   ```  
3. Create a `.env` file and add:  
   ```
   MONGO_URL=<your_mongo_connection_string>
   JWT_ADMIN_PASSWORD=<your_admin_jwt_secret>
   JWT_USER_PASSWORD=<your_user_jwt_secret>
   PORT=3000
   ```  
4. Start the server:  
   ```bash
   npm start
   ```  

### **Contributing** 🤝  
Feel free to fork, open issues, and submit PRs!  

---

