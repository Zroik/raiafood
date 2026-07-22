# RaiaFood - E-Commerce Platform

RaiaFood is a modern e-commerce platform built using Laravel 11, React (Inertia.js), and Tailwind CSS. It is integrated with Midtrans for payments, RajaOngkir for shipping calculations, and Google OAuth for registration and login.

## Features

- **Frontend**: Single Page Application (SPA) powered by React & Inertia.js.
- **Authentication**: Standard Auth & Google OAuth Login.
- **Payment Gateway**: Seamless integration with Midtrans Snap.
- **Shipping Calculator**: Real-time shipping rates using the RajaOngkir API.
- **Admin Panel**: Dashboard for managing products, categories, orders, promos, banners, certificates, and inbox messages.
- **WhatsApp Integration**: Settings for direct customer support.

---

## Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Make sure you have the following installed:
- PHP >= 8.2
- Composer
- Node.js & npm
- MySQL or SQLite database

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd raiafood
   ```

2. **Install PHP Dependencies**
   ```bash
   composer install
   ```

3. **Install JavaScript Dependencies**
   ```bash
   npm install
   ```

4. **Setup Environment Variables**
   Copy the example environment file and configure your credentials:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and set up your:
   - Database credentials (`DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, etc.)
   - Midtrans keys (`MIDTRANS_SERVER_KEY`, `MIDTRANS_CLIENT_KEY`)
   - Google Client OAuth keys (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`)
   - RajaOngkir API Key (`RAJAONGKIR_API_KEY`)

5. **Generate Application Key**
   ```bash
   php artisan key:generate
   ```

6. **Create a Symbolic Link for Storage**
   To display product images, banners, and certificates, link the storage directory:
   ```bash
   php artisan storage:link
   ```

7. **Run Database Migrations & Seeders**
   Create the database schema and populate it with initial data (Admin user, categories, products, banners, settings):
   ```bash
   php artisan migrate --seed
   ```
   *Note: The default administrator login will be created via `AdminSeeder`.*

8. **Start the Development Servers**

   Run the Vite development server for asset compilation:
   ```bash
   npm run dev
   ```

   Run the PHP local development server (in another terminal):
   ```bash
   php artisan serve
   ```

   Go to `http://localhost:8000` to access the application.

---

## Deployment & GitHub Preparation

To ensure that the project compiles and runs perfectly when pushed to GitHub:
- Avoid committing the `.env` file (already ignored by `.gitignore`).
- Ensure all packages in `composer.json` and `package.json` are installed correctly.
- Use `php artisan storage:link` on the hosting server/staging environment.
- Run `npm run build` to compile production-ready assets before deploying to hosting.
