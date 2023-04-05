<div align="center">
  <a href="#">
    <img src="https://underpharm.vercel.app/pharm.svg" alt="Pharma" width="120" height="120">
  </a>
  <h3 align="center">
  <a href="https://otemae.vercel.app/" target="_black">Pharma</a>
  </h3>

  <p align="center">
E-commerce of products  </p>
</div>

### Deployments

| App                                                                         | Storybook                                                                  | Api                                                                            |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| <a  href="https://underpharm.vercel.app/">https://underpharm.vercel.app</a> | <a href="https://storypharm.vercel.app/">https://storypharm.vercel.app</a> | <a href="https://epharmanzy.onrender.com/">https://epharmanzy.onrender.com</a> |

### Modules

| Name              | Description                                                            |
| ----------------- | ---------------------------------------------------------------------- |
| `@phar/web`       | Main application in Next.js.                                           |
| `@phar/err`       | Library for managing error codes for applications.                     |
| `@phar/core`      | React component library for `@phar/web`.                               |
| `@phar/themes`    | Theme library for the `@phar/web` application.                         |
| `@phar/i18n`      | Library to manage different languages for the `@phar/web` application. |
| `@phar/api`       | Backend server for use by @phar/web.                                   |
| `@phar/storybook` | Storybook application, where `@phar/core` components are documented.   |

### Required technologies

```
1. Node.js v16.16.0 (LTS)
3. Git
5. Yarn
```

### Setup

Download the repository using the following command in your terminal

```
git clone https://github.com/nathan2slime/pharma.git
```

Enter the directory and install the dependencies with yarn

```
cd pharma
```

```
yarn install
```

Create an `.env` file in the root path, and add the environment variables. You can also copy the `.env.example` file, which is in that same directory and rename it to `.env`.

```
### API environments

PORT=8080 ## Here is the port on which the application will run
DATABASE_URL=mongodb://localhost:27017 ## Here goes the URL of the database
SECURITY_KEY= ## Here goes your hash for generating authentication tokens
NEXT_PUBLIC_LANGUAGE_STORAGE_KEY=lang
NEXT_PUBLIC_TOKEN_STORAGE_KEY=token
NEXT_PUBLIC_API_URL=http://localhost:8080 ## Here goes the url of the api
```

### Launching applications locally

Run the command below

```
yarn dev
```
