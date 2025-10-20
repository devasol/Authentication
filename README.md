# 🚀 Full-Stack Authentication System with 2FA 🚀

![Authentication System Banner](./Client/public/github-readme-image/Screenshot%20from%202025-10-20%2017-17-11.png)

## ✨ Overview

This project delivers a robust and modern full-stack authentication system, meticulously crafted to provide secure user management with an emphasis on Two-Factor Authentication (2FA). Built with cutting-edge technologies, it offers a seamless and protected experience for user registration, login, session management, and 2FA setup/verification/reset.

Whether you're building a new application or integrating secure authentication into an existing one, this system provides a solid, extensible foundation.

## 🌟 Features

- **User Registration:** Secure creation of new user accounts.
- **User Login:** Authenticate users with username and password.
- **Session Management:** Persistent user sessions using `express-session`.
- **Password Hashing:** Industry-standard password security with `bcrypt`.
- **Two-Factor Authentication (2FA):**
  - **Setup:** Users can easily enable 2FA via QR code scanning or manual key entry.
  - **Verification:** Secure login with TOTP (Time-based One-Time Password).
  - **Reset:** Option to reset 2FA setup if access is lost.
- **Protected Routes:** Frontend routes secured based on authentication status.
- **CORS Configuration:** Properly configured for seamless frontend-backend communication.
- **Responsive UI:** Modern and attractive user interface built with React and Tailwind CSS.

## 🛠️ Technologies Used

### Frontend

- **React.js:** A declarative, efficient, and flexible JavaScript library for building user interfaces.
- **React Router DOM:** For declarative routing in React applications.
- **Axios:** Promise-based HTTP client for making API requests.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
- **Vite:** A fast build tool that provides an extremely fast development experience.

### Backend

- **Node.js:** JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose:** MongoDB object modeling for Node.js.
- **MongoDB:** A NoSQL, document-oriented database.
- **Bcrypt:** Library for hashing passwords.
- **JSON Web Token (JWT):** For secure information exchange between parties.
- **Speakeasy:** For generating and verifying time-based one-time passwords (TOTP).
- **QRcode:** For generating QR codes for 2FA setup.
- **Express-Session:** Simple session middleware for Express.
- **Passport.js:** Authentication middleware for Node.js.
- **CORS:** Node.js CORS middleware.
- **Dotenv:** Loads environment variables from a `.env` file.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (LTS version recommended)
- **npm** (Node Package Manager) or **Yarn**
- **MongoDB** (Community Edition or a cloud-hosted solution like MongoDB Atlas)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Backend Setup:**

    ```bash
    cd Backend
    npm install
    # or yarn install
    ```

    Create a `.env` file in the `Backend` directory with the following content:

    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    SESSION_SECRET=a_very_secret_string_for_sessions
    JWT_SECRET=a_very_secret_string_for_jwt
    ```

3.  **Frontend Setup:**

    ```bash
    cd ../Client
    npm install
    # or yarn install
    ```

### Running the Project

1.  **Start the Backend Server:**

    ```bash
    cd Backend
    npm run dev
    # The backend server will start on http://localhost:5000 (or your specified PORT)
    ```

2.  **Start the Frontend Development Server:**

    ```bash
    cd Client
    npm run dev
    # The frontend will open in your browser, usually at http://localhost:3002
    ```

## 🌐 API Endpoints

All API endpoints are prefixed with `/api/auth`.

| Method | Endpoint      | Description                                   |
| :----- | :------------ | :-------------------------------------------- |
| `POST` | `/register`   | Register a new user.                          |
| `POST` | `/login`      | Authenticate user and establish session.      |
| `GET`  | `/status`     | Check current authentication status.          |
| `POST` | `/logout`     | Log out the current user and destroy session. |
| `POST` | `/2fa/setup`  | Initiate 2FA setup (returns QR code data).    |
| `POST` | `/2fa/verify` | Verify 2FA TOTP.                              |
| `POST` | `/2fa/reset`  | Reset 2FA for the current user.               |

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the ISC License. See `LICENSE` for more information.

## 📞 Contact

Your Name - [Your Email](mailto:your.email@example.com)
Project Link: [https://github.com/your-username/your-repo-name](https://github.com/your-username/your-repo-name)
