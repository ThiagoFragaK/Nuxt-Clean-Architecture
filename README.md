# Clean Architecture E-Commerce Project Documentation

## Overview

This project is a simple e-commerce application developed to demonstrate a clean architecture in the Frontend. It consumes data from a public API called [FakerAPI](https://fakerapi.it/) to generate fictitious information about products, users, and orders. The main goal is to provide a scalable, modular, and easy-to-maintain structure.

## Technologies Used

- **Frontend Framework:** Nuxt3
- **UI Library:** Bootstrap 5
- **Routing:** Nuxt Router
- **HTTP Requests:** Axios
- **Code Standardization:** ESLint + Prettier
- **Notifications:** SweetAlert 3

## Project Structure

```sh
/src
├── components       # Reusable components
├── layouts          # Default layouts
├── pages            # Project pages
├── services         # API call services
├── store            # State management
├── utils            # Utility functions
├── assets           # Styles, icons, and images
└── app.vue          # Application entry point
```

## Setup and Execution

### 1. Clone the repository:

```sh
git clone [<REPOSITORY_URL>](https://github.com/ThiagoFragaK/Nuxt-Clean-Architecture)
cd nuxt-clean-architecture
```

### 2. Install dependencies:

```sh
yarn install
# or
npm install
```

### 3. Run the project in development mode:

```sh
yarn dev
# or
npm run dev
```

### 4. Generate a production build:

```sh
yarn build
# or
npm run build
```

## API Consumption (FakerAPI)

The API used generates fictitious data for products and users. Example request:

```js
import axios from 'axios';
const url = "https://fakestoreapi.com";

export const getAllProducts = async () => {
  return axios.get(`${url}/products?limit=15`)
      .then((response) => {
          return response.data;
      })
      .catch(() => {
          return {
              error: "There's an error fetching the products list."
          }
      });
};
```

## Key Features

- Product listing
- Product details
- Cart addition simulation

## Contribution

If you want to contribute:

1. Fork the repository.
2. Create a branch for your feature (`git checkout -b my-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the repository (`git push origin my-feature`).
5. Open a Pull Request.

