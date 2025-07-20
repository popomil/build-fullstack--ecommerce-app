E-Commerce Frontend with React.js, Strapi & Chakra UI
(Replace this with an actual screenshot of your running application!)

A modern e-commerce frontend built with React.js, Strapi (headless CMS), and Chakra UI. This application features robust user authentication, dynamic product listings with resilient offline handling, and visual feedback through skeleton loaders and toast notifications.

✨ Features
User Authentication

Secure login/signup with comprehensive form validation using react-hook-form and yup.

JWT-based session management (integrated with Strapi's authentication).

Automatic token expiration check and logout.

Offline Resilience

Detects internet disconnection and provides real-time toast notifications.

Displays skeleton loading states during API fetch delays for a smoother user experience.

UI/UX

Fully responsive design powered by Chakra UI components.

Dark/light mode support for personalized viewing.

User-friendly toast notifications for feedback (react-hot-toast).

API Integration

Fetches product data and handles user authentication seamlessly with a Strapi backend.

🛠️ Tech Stack
Frontend: React.js, React Router, Axios

Styling: Chakra UI (with custom theme extensions)

Backend: Strapi (headless CMS) - Note: This project is the frontend; a separate Strapi instance is required.

State Management: Redux Toolkit (for global state management of authentication and products)

Form Handling: react-hook-form with yup for schema validation

Notifications: react-hot-toast

JWT Decoding: jwt-decode

🚀 Installation & Setup
To get this project up and running locally, follow these steps:

Clone the repository:

git clone https://github.com/your-username/ecommerce-frontend.git
cd ecommerce-frontend

Install dependencies:

npm install
# or
yarn install

Set up your Strapi Backend:

This frontend requires a running Strapi backend. If you don't have one, you'll need to set it up separately.

Ensure your Strapi instance has:

A products collection type (with fields like name, description, price, and optionally image).

User authentication enabled (users can register and log in).

Appropriate permissions set in Strapi for public and authenticated users to access products and authentication endpoints.

Configure API Base URL:

Open the src/App.js (or src/index.js depending on your structure, but in the provided code, it's inside App.js where API_BASE_URL is defined).

Locate the API_BASE_URL constant:

const API_BASE_URL = 'http://localhost:1337/api'; // Replace with your Strapi backend URL

Change http://localhost:1337/api to the actual URL of your Strapi backend.

Start the development server:

npm run dev
# or
yarn dev

The application should now be running in your browser, typically at http://localhost:5173 (or another port if 5173 is in use).
