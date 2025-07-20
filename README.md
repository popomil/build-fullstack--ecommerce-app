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
Frontend:

React.js: ^18.3.1

React Router: ^6.26.2

Axios: ^1.7.7

Styling:

Chakra UI: @chakra-ui/react@^2.10.2, @chakra-ui/icons@^2.2.4

Emotion: @emotion/react@^11.13.3, @emotion/styled@^11.13.0

Backend: Strapi (headless CMS) - Note: This project is the frontend; a separate Strapi instance is required.

State Management:

Redux Toolkit: @reduxjs/toolkit@^2.2.8

React Redux: react-redux@^9.1.2

Redux Persist: redux-persist@^6.0.0

Form Handling:

React Hook Form: react-hook-form@^7.53.0

Yup: yup@^1.4.0

Hookform Resolvers: @hookform/resolvers@^3.9.0

Notifications:

React Hot Toast: react-hot-toast@^2.4.1

JWT Decoding:

JWT Decode: jwt-decode@^4.0.0

Other Dependencies:

Headless UI React: @headlessui/react@^2.2.4

Class Variance Authority: class-variance-authority@^0.7.0

Framer Motion: framer-motion@^11.11.7

React Icons: react-icons@^5.3.0

React Slick: react-slick@^0.30.2

Tailwind Merge: tailwind-merge@^2.5.3

Universal Cookie: universal-cookie@^7.2.1

Tanstack React Query: @tanstack/react-query@^5.59.9

Development Dependencies:

Vite: vite@^5.4.8

TypeScript: typescript@^5.5.3

Autoprefixer: autoprefixer@^10.4.20

ESLint: eslint@^9.11.1, @eslint/js@^9.11.1, eslint-plugin-react-hooks@^5.1.0-rc.0, eslint-plugin-react-refresh@^0.4.12

Globals: globals@^15.9.0

PostCSS: postcss@^8.4.47

Tailwind CSS: tailwindcss@^3.4.13

TypeScript ESLint: typescript-eslint@^8.7.0

Vite Plugin React: @vitejs/plugin-react@^4.3.2

Types React: @types/react@^18.3.10

Types React DOM: @types/react-dom@^18.3.0

Types React Slick: @types/react-slick@^0.23.13

🚀 Installation & Setup
To get this project up and running locally, follow these steps:

Clone the repository:

https://github.com/popomil/build-fullstack--ecommerce-app.git
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
