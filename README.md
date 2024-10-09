<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="./frontend/public/Gifty-logo-light.svg" alt="Project logo"></a>
</p>

<h3 align="center">Christmas Gifts Planner</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Christmas gift planner is a collaborative platform designed to facilitate the sharing of gift ideas among family members or groups of friends while maintaining the element of surprise.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Running the tests](#tests)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

Our project, Christmas Gifts Planner, is a collaborative effort by a team of 4 individuals undergoing training as web developer designers. The project aims to facilitate members of a family or group of friends to discuss gift ideas without seeing what others are preparing for them. A dedicated discussion thread would be allocated to each member, enabling other members to exchange individual or collective gift ideas.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

Before you begin, ensure you have met the following requirements:

```
Docker installed
Node.js installed
PostgreSQL installed
```

### Installing

1. Clone the repository:

```
git clone https://github.com/WildCodeSchool/2023-11-wns-bleu-g2.git
```

2. Navigate to the project directory:

```
cd backend
```

3. Create a .env file in the root directory and fill it with necessary environment variables:

```
# Example .env file
DATABASE_URL=postgres://username:password@localhost:5432/database_name
```

4. Start the development server with Docker Compose:

```
docker-compose up --build
```

5. Open your browser and navigate to http://localhost:3000 to view the application.

## 🔧 Running the tests <a name = "tests"></a>

### Backend Tests

To run the backend tests, navigate to the `backend` directory and execute:

```
cd backend
npm run test
```

This command runs the Jest test suite for the backend. It checks functionality like user profiles and user creation, ensuring all tests pass successfully.

### Frontend Tests

To run the frontend tests, navigate to the `frontend` directory and execute:

```
cd frontend
npm run test
```

This command runs the Jest test suite for the frontend, ensuring that components render correctly.

### E2E Tests

To run the end-to-end (E2E) tests, follow these steps:

1. Navigate to the `e2e-tests` directory:

```
cd e2e-tests
```

2. Install the required Playwright browsers

```
npx playwright install:
```

3. Start the application using Docker:

```
npm run app:start
```

4. Run the tests:

```
npm run test
```

5. To view the test report:

```
npx playwright show-report
```

### And coding style tests

The `npm run lint` command runs the `next lint` script, which checks the code for potential errors and enforces coding standards using ESLint. This helps maintain code quality and consistency across the project.

To run the linting tests, use the following commands:

```
cd frontend
npm run lint
```

## ⛏️ Built Using <a name = "built_using"></a>

- [GraphQL](https://graphql.org/) - Query Language
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - GraphQL Server
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [PostgreSQL](https://www.postgresql.org/) - Database
- [TypeORM](https://typeorm.io/) - ORM for TypeScript
- [Next.js](https://nextjs.org/) - React Framework & contributor
- [React](https://vuejs.org/) - JavaScript Library
- [Apollo Client](https://www.apollographql.com/docs/react/) - GraphQL Client
- [Docker](https://www.docker.com/) - Containerization Platform

## ✍️ Authors <a name = "authors"></a>

This project was developed by the following contributors:

- [@AlexandreRichert](https://github.com/AlexandreRichert) - Idea, Initial work & contributor
- [@alon-bendavid](https://github.com/alon-bendavid) - Idea, Initial work & contributor
- [@Fangornito](https://github.com/Fangornito) - Idea, Initial work & contributor
- [@Jasminegrz](https://github.com/Jasminegrz) - Idea, Initial work & contributor

For more details on each contributor’s activity, visit the [contributors page](https://github.com/WildCodeSchool/2023-11-wns-bleu-g2-christmas-gifts-planner/graphs/contributors)

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- A big thank you to **Wild Code School** for their support and guidance throughout our training. Their trainers and community helped us acquire the skills needed to successfully complete this project.
