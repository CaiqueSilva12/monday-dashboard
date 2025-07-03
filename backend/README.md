<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

# Monday Dashboard Backend

This is the backend for the Monday Dashboard application, built with Laravel and MySQL. It supports Monday.com OAuth login and JWT authentication.

## Prerequisites
- PHP 8.1+
- Composer
- Docker & Docker Compose
- Node.js & npm (for frontend, if needed)
- [ngrok](https://ngrok.com/) (for local OAuth testing)

---

## 1. Clone the Repository
```sh
git clone <your-repo-url>
cd monday-dashboard/backend
```

---

## 2. Install PHP Dependencies
```sh
composer install
```

---

## 3. Copy and Configure Environment Variables
```sh
cp .env.example .env
```
- Edit `.env` and set your database credentials, JWT secret, and Monday.com OAuth credentials:
  - `MONDAY_CLIENT_ID` and `MONDAY_CLIENT_SECRET` from your Monday.com developer app
  - `MONDAY_REDIRECT_URI` (see ngrok section below)

---

## 4. Generate Laravel App Key
```sh
php artisan key:generate
```

---

## 5. Run Docker (MySQL Database)
```sh
docker-compose up -d
```
- This will start a MySQL database on the default port (check `docker-compose.yml` for details).

---

## 6. Run Database Migrations
```sh
php artisan migrate
```

---

## 7. Install and Configure JWT Auth
```sh
composer require tymon/jwt-auth
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret
```

---

## 8. Start the Laravel Backend
```sh
php artisan serve
```
- By default, this runs at `http://localhost:8000`

---

## 9. Expose Your Backend with ngrok (for Monday.com OAuth)
Monday.com must be able to reach your backend for OAuth. Use ngrok to expose your local server:

```sh
ngrok http 8000
```
- Copy the HTTPS forwarding URL from ngrok (e.g., `https://abcd1234.ngrok.io`).

---

## 10. Set MONDAY_REDIRECT_URI in .env
- In your `.env`, set:
  ```
  MONDAY_REDIRECT_URI=https://<your-ngrok-subdomain>.ngrok.io/auth/monday/callback
  ```
- This must match the Redirect URL in your Monday.com app settings.
- **Why?** Monday.com needs a public URL to send the OAuth callback to your backend. ngrok provides this while developing locally.

---

## 11. Add Redirect URL to Monday.com App
- In the Monday.com Developer Center, add the same ngrok URL to your app's Redirect URLs.

---

## 12. Test the Application
- Go to your frontend login page and click "Login with Monday.com".
- Complete the OAuth flow.
- You should be redirected to your dashboard and authenticated.

---

## Troubleshooting
- If you change your ngrok URL, update both `.env` and your Monday.com app settings.
- If you see database errors, ensure Docker is running and migrations are up to date.
- For SSL/cURL errors, make sure your PHP installation trusts CA certificates (see Laravel docs for Windows setup).

---

## Useful Commands
- Restart Docker: `docker-compose restart`
- Stop Docker: `docker-compose down`
- View Laravel logs: `tail -f storage/logs/laravel.log`

---

## Security Note
- Never commit your `.env` file or secrets to version control.
- Use strong secrets for JWT and your Monday.com app.
