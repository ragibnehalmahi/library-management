# Library Management API
This is a Library Management System backend built using Express, TypeScript, and MongoDB (Mongoose).  
It allows us to manage books, borrow them, and view borrowing summaries.
## 🚀 Features
✅ Create, read, update, and delete (CRUD) books
✅ Filter, sort, and limit book listing
✅ Borrow a book with due date and quantity
✅ Update book availability automatically
✅ View borrowed book summaries using MongoDB aggregation
✅ Proper validation and error handling
✅ Structured and modular code with TypeScript interfaces
## 🛠️ Technologies Used

 Node.js
 Express.js
 TypeScript
 MongoDB (Mongoose)
 dotenv
 ## 📁 Project Structure
![image](https://github.com/user-attachments/assets/8835a490-2259-4b52-97b8-db7ddd313de5)

 
 ## ⚙️ Setup Instructions

### 1️⃣ Clone the project
2️⃣ Install dependencies
 npm install
 3️⃣ Setup environment variables
MONGODB_URI=*********
PORT=5000
4️⃣ Run the project
npm run dev
then get
✅ MongoDB connected
🚀 Server running on port 5000
1.POST	/api/books	Create a book
2.GET	/api/books	Get all books (with filter)
3.GET	/api/books/:id	Get single book by ID
4.PUT	/api/books/:id	Update book info
5.DELETE	/api/books/:id	Delete book
6.POST	/api/borrow	Borrow a book
7.GET	/api/borrow	Get borrowed books summary
🧪 Testing Tools
 
Postman
