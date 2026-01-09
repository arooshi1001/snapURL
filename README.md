# SnapURL – URL Shortener Web Application

SnapURL is a full-stack URL shortener web application that converts long URLs into short, shareable links.  
It also tracks click counts and supports automatic URL expiration.

---

## Features

- Shorten long URLs into compact links
- Redirect short URLs to original URLs
- Track number of clicks per short link
- Automatic expiration of URLs
- Clean and responsive UI
- Secure configuration using environment variables

---

## Tech Stack

### Frontend
- EJS (Embedded JavaScript Templates)
- HTML
- CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose ODM

### Utilities
- dotenv
- shortid

---

## Project Structure
<img width="621" height="499" alt="image" src="https://github.com/user-attachments/assets/c1c56c6c-6638-4ad1-afb3-94c3a0bd03f5" />

---

## Local Setup Instructions

### Step 1: Clone the Repository
git clone https://github.com/arooshi1001/snapURL.git

cd snapURL


---

### Step 2: Install Dependencies


---

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:
MONGO_URI=your_mongodb_connection_string
PORT=3000


Note:
- `.env` is not included in the repository for security reasons
- You must provide your own MongoDB connection string

---

### Step 4: Run the Application

node server.js

The server will start at:
http://localhost:3000

<img width="1919" height="891" alt="image" src="https://github.com/user-attachments/assets/b122a92f-c152-4bd5-a0d0-c98c3f57135d" />


---

## How the Application Works

1. User enters a long URL
2. Application generates a unique short code
3. Short URL redirects to the original URL
4. Click count is incremented on each visit
5. Expired URLs are blocked automatically

---

## Security Practices

- Sensitive credentials are stored using environment variables
- `.env` and `node_modules` are excluded using `.gitignore`
- Schema validation is handled using Mongoose

---

## Future Enhancements

- User authentication
- Custom short URLs
- Analytics dashboard
- QR code generation
- Production deployment with custom domain

---

## Author

Arooshi Sharma  
Electronics and Computer Engineering  
GitHub: https://github.com/arooshi1001

---

## Acknowledgements

- MongoDB Atlas
- Express.js Documentation
- Open-source community



