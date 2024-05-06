# Contract Manager

Contract Manager is an application for managing client contract of an insurance agency.

It was build on top of:

-   **Laravel** as backend
-   **Inertia** using **React** as stack, as frontend

Some implemented features:

-   User management
-   Agency management
-   Insurance management
-   Client management

> This docs is open to modification if you found some missing stuff or things to improve, sentences to correct or typo.

## Installation

### Requirements

-   PHP: ^8.1
-   Node: ^20
-   Composer
-   Node package manager: pnpm(recommended) / yarn / npm
-   [Laravel requirements](https://laravel.com/docs/10.x/deployment#server-requirements)
-   Database: PostgreSQL(recommended) / MySQL / MariaDB
-   Docker with docker-compose

When your environment is ok you can simply run:

```bash
composer install
```

For installing laravel dependencies. And

```bash
pnpm install
```

For react dependencies.

Or if you preferred working on a docker environment, just run:

```bash
docker compose up
```

## Usage

If all the above instructions was successful, you can run the project as follow.

First run the backend

```bash
pnpm back:dev
```

Then, run the frontend

```bash
pnpm front:dev
```

> In addition, the app to work properly, you have to ensure that it has been connected to your database by copying the content of `.env.example` into a `.env` and run all existing migrations with `pnpm db:migrate`

You can now visit `http://127.0.0.1:8000` to see if it work.

> All these steps are not necessary if you work withing docker environment

## Contributing

To contribute to this project, you have just to follow a few rukes.

-   Ensure that the frontend build properly in your local
-   Write commit message like explain in [Conventional commit](https://www.conventionalcommits.org/en/v1.0.0/)
-   Make a pull request with an explicit title
-   Having fun ;)
