
![sitemark](https://github.com/user-attachments/assets/d0a7617a-5f95-4e6b-b047-720c2305f3c8)

# Movie and Series Link Management System

This is a link management system for movies and series available on various streaming platforms like Netflix, Paramount, and others. The system allows users to add, list, edit, and delete movie and series links, with a front-end built using React.js and a back-end using Laravel and PHP.

## 📋 Features

- User Registration and Login: Allows users to register and log in to the system.
- Link Management: Users can add, edit, and remove movie and series links.
- Streaming Categories: Links are organized by categories, such as Netflix, Paramount, etc.
- User Interface: Front-end built with React.js, consuming an API developed with Laravel.

## 🛠 Technologies Used

- Laravel (PHP): Backend to manage the system, user authentication, and business logic.
- React.js: Frontend for user interaction.
- SQLite: Database used to store data locally.
- Tailwind CSS: CSS framework for styling.
- Inertia.js: Framework for integration between Laravel backend and React frontend.

## 🔧 How to Run the Project

### Prerequisites
Before running the project, you need to have the following dependencies installed:

- PHP (version 8.0 or higher)
- Composer (for managing PHP dependencies)
- Node.js (for running React)
- NPM (package manager for Node.js)

### Steps to Run the Project

> Clone the repository:

```bash
git clone https://github.com/maricastroc/sitemark
```

> Install PHP dependencies:

```bash
composer install
```

> Configure environment variables:

```bash
cp .env.example .env
```

> Configure the environment variables in the .env file, especially the ones related to the database (SQLite):

```bash
DB_CONNECTION=sqlite
DB_DATABASE=/path/to/your/database/database.sqlite
```

> Generate the Laravel application key:

```bash
php artisan key:generate
```

> Install Node.js dependencies:

```bash
npm install
```

> Build the front-end files:

```bash
npm run build
```

> Start the server for the Laravel backend::

```bash
php artisan serve
```

> Start the server for the React front-end:
```bash
npm run dev
```

> ⏩ The React server will be available at [http://localhost:3000](http://localhost:3000).
> ⏩ The Laravel server will be available at [http://localhost:8000](http://localhost:8000).

## 📈 Feature Roadmap
- Implement integration with more streaming platforms.
- Add support for comments and ratings of movie and series links.
- Implement a favorites system.
