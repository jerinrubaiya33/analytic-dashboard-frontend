# Analytic Real-Time Product - Frontend
A modern, responsive dashboard for real-time product management built with Next.js and TypeScript.

<img width="600" height="400" alt="Screenshot from 2025-11-14 17-17-52" src="https://github.com/user-attachments/assets/63320763-171a-48f2-8b7a-1eee8f7992e0" />
<img width="600" height="400" alt="Screenshot from 2025-11-14 17-08-09" src="https://github.com/user-attachments/assets/dba055ea-3536-457b-ab0d-844ad7646f14" />
<img width="600" height="400" alt="Screenshot from 2025-11-14 17-39-17" src="https://github.com/user-attachments/assets/a6c64281-b9da-470e-8a8b-2244efb7dfa7" />


🚀 **Features**
🔐 Secure Authentication - JWT-based login system

📦  **Real-Time Product Management**  - Live updates via **Firestore**

🔄 **CRUD Operations** - Add, edit, delete, and change product status

📊 **Analytics Dashboard** - Interactive charts and data visualization

🏛 **State Management** - Redux Toolkit with RTK Query

🎨 **Modern UI** - Built with Shadcn UI components

📱 **Responsive Design** - Optimized for all devices


**🛠 Tech Stack**
Framework: Next.js 14 with TypeScript

Styling: **Tailwind CSS**

UI Components: **Shadcn UI**

State Management: **Redux Toolkit + RTK Query**

Charts: **Recharts**

Forms: **React Hook Form with validation**

Backend: **Firebase Firestore & Authentication**

Real-time Updates: **Firebase Listeners**

📁 **Project Structure**

```text
src/
├── app/                 # Next.js App Router pages
│   ├── login/           # Authentication page
│   ├── products/        # Product management dashboard
│   ├── analytics/       # Analytics and charts
│   └── dashboard/       # Main dashboard overview
├── components/          # Reusable React components
├── lib/                 # Core utilities and configurations
│   ├── firebase/        # Firebase configuration and services
│   ├── redux/           # Redux store, slices, and API
│   └── listeners/       # Real-time Firestore listeners
├── hooks/               # Custom React hooks
└── styles/              # Global styles and Tailwind configuration
```


⚡ Quick Start
Prerequisites
**Node.js 18+**

npm or yarn

Firebase project

**Installation**
Clone the repository

**bash**
git clone <repository-url>
cd product-dashboard-frontend
Install dependencies

**bash**
npm install
Environment Setup

Create a **.env.local** file in the root directory:

**env**
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
Run Development Server

**bash**
npm run dev
Open http://localhost:3000 in your browser.

🔐 **Demo Login**
Use these credentials to test the application:

**Email: admin@example.com
Password: password123**

🏗 Building for Production
bash
# Create production build
npm run build

# Start production server
npm start
📊 Key Functionalities
# Product Management
**Real-time Table:** Live updates from **Firestore**

**CRUD Operations:** Full create, read, update, delete capabilities

**Status Management:** Change product status with modals

**Form Validation:** Robust form handling with **React Hook Form**

# Analytics
**Interactive Charts:** Built with **Recharts library**

**Data Visualization:** Comprehensive product analytics

**Real-time Updates:** Charts update with live data

# State Management
**Redux Toolkit:** Predictable state container

**RTK Query:** Efficient data fetching and caching

**Real-time Sync:** **Firestore listeners** for live updates

# 🔧 Development
Available Scripts
bash
npm run dev          # Start development server
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
Contributing
Fork the repository

Create a feature branch
Commit your changes
Push to the branch
Open a Pull Request

🤝Any questions, please send mail **jerinrubaiyakhan11@gmail.com.**

Built using Next.js, TypeScript, and modern web technologies.
