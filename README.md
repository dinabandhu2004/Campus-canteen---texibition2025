# Campus-canteen---texibition2025

# 🍽️ Campus Canteen - Smart Ordering & Billing System

This is a hackathon project developed in 7 hours — a fully functional food ordering and billing system for a campus canteen. It supports both email/password and Google login, menu browsing, order placement, and billing with mock payment methods.

---

## 🚀 Features

- 🔐 **Authentication** via Email/Password 
- 📋 **Interactive Menu UI** with categories like breakfast
- 🛒 **Cart and Order Summary** with quantity controls
- 💳 **Mock Payment Options** (Credit, Wallet, Bank Transfer)
- 🧾 **Print-Ready Billing Interface**
- ⚙️ **Basic Backend API** (Node.js + Express) with JWT

---

## 🛠️ Tech Stack

- HTML, CSS, JavaScript
- Node.js & Express.js
- JWT (for user session)
- Google OAuth2
- Font Awesome Icons

---

## 📂 Project Structure

- `index.html` — Login page with email and Google login
- `auth.js` — Handles authentication logic and redirects
- `menu.html` — Menu and cart-based order page
- `server.js` — Node.js backend handling login auth and Google token verification
- `settings.json` — Live server config for VSCode (port 5501)

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/campus-canteen.git
cd campus-canteen
2. Install server dependencies
bash
Copy
Edit
npm install
3. Configure Google Sign-In
Replace 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com' in both:

auth.js

server.js

With your own Google OAuth Client ID (get it from https://console.cloud.google.com/apis/credentials)

4. Start the backend
bash
Copy
Edit
node server.js
The backend server will run on http://localhost:3000.

🧪 Using the App
🔑 Login
Email Login: Use the hardcoded user user@example.com with password password

Google Login: Works if configured with a valid Google OAuth client ID

🧾 Menu & Orders
Login via index.html

Redirects to menu.html 
Browse food items, add to cart, and choose payment option

Print the bill using the provided button

📄 License
MIT License — feel free to use, modify, or expand.
